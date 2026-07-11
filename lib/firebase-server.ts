import crypto from 'node:crypto'

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const FCM_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging'
const DATABASE_SCOPE = 'https://www.googleapis.com/auth/firebase.database'
const FIREBASE_SCOPES = `${FCM_SCOPE} ${DATABASE_SCOPE}`

export interface NotificationTokenRecord {
  token: string
  createdAt: string
  userAgent?: string
}

interface GoogleAccessTokenResponse {
  access_token?: string
  expires_in?: number
  token_type?: string
  error?: string
  error_description?: string
}

const base64Url = (input: string | Buffer) =>
  Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

const getFirebasePrivateKey = () =>
  process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

export const getFirebaseProjectId = () =>
  process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

const createServiceAccountJwt = () => {
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = getFirebasePrivateKey()

  if (!clientEmail || !privateKey) {
    throw new Error('Missing FIREBASE_CLIENT_EMAIL or FIREBASE_PRIVATE_KEY')
  }

  const now = Math.floor(Date.now() / 1000)
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claimSet = base64Url(
    JSON.stringify({
      iss: clientEmail,
      scope: FIREBASE_SCOPES,
      aud: GOOGLE_TOKEN_URL,
      exp: now + 3600,
      iat: now,
    })
  )
  const unsignedToken = `${header}.${claimSet}`
  const signature = crypto
    .createSign('RSA-SHA256')
    .update(unsignedToken)
    .sign(privateKey)

  return `${unsignedToken}.${base64Url(signature)}`
}

export const getGoogleAccessToken = async () => {
  const assertion = createServiceAccountJwt()
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  })

  const data = (await response.json()) as GoogleAccessTokenResponse

  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || 'Unable to get Google access token')
  }

  return data.access_token
}

const getDatabaseUrl = () => {
  const databaseUrl = process.env.FIREBASE_DATABASE_URL?.replace(/\/$/, '')

  if (!databaseUrl) {
    throw new Error('Missing FIREBASE_DATABASE_URL')
  }

  return databaseUrl
}

const tokenKey = (token: string) =>
  crypto.createHash('sha256').update(token).digest('hex')

export const saveNotificationToken = async (record: NotificationTokenRecord) => {
  const accessToken = await getGoogleAccessToken()
  const databaseUrl = getDatabaseUrl()
  const key = tokenKey(record.token)
  const response = await fetch(`${databaseUrl}/notificationTokens/${key}.json`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(record),
  })

  if (!response.ok) {
    throw new Error(`Unable to save notification token: ${response.status}`)
  }
}

export const getNotificationTokens = async () => {
  const accessToken = await getGoogleAccessToken()
  const databaseUrl = getDatabaseUrl()
  const response = await fetch(`${databaseUrl}/notificationTokens.json`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!response.ok) {
    throw new Error(`Unable to read notification tokens: ${response.status}`)
  }

  const records = (await response.json()) as Record<string, NotificationTokenRecord> | null

  return Object.values(records || {})
    .map((record) => record.token)
    .filter(Boolean)
}

export const deleteNotificationToken = async (token: string) => {
  const accessToken = await getGoogleAccessToken()
  const databaseUrl = getDatabaseUrl()
  const key = tokenKey(token)

  await fetch(`${databaseUrl}/notificationTokens/${key}.json`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  })
}

export const sendFcmNotification = async ({
  token,
  title,
  body,
}: {
  token: string
  title: string
  body: string
}) => {
  const projectId = getFirebaseProjectId()

  if (!projectId) {
    throw new Error('Missing FIREBASE_PROJECT_ID or NEXT_PUBLIC_FIREBASE_PROJECT_ID')
  }

  const accessToken = await getGoogleAccessToken()
  const response = await fetch(
    `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: {
          token,
          notification: { title, body },
          webpush: {
            fcmOptions: { link: 'https://agomoni.vercel.app/' },
            notification: {
              icon: '/icon.png',
              badge: '/icon.png',
              requireInteraction: true,
            },
          },
        },
      }),
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`FCM send failed: ${response.status} ${errorText}`)
  }
}
