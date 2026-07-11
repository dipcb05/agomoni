import { NextResponse } from 'next/server'
import {
  deleteNotificationToken,
  getNotificationTokens,
  sendFcmNotification,
} from '@/lib/firebase-server'
import { getDailyNotification } from '@/lib/notification-schedule'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const isUnauthorized = (request: Request) => {
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret) {
    return false
  }

  return request.headers.get('authorization') !== `Bearer ${cronSecret}`
}

export async function GET(request: Request) {
  if (isUnauthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const notification = getDailyNotification()

  if (!notification) {
    return NextResponse.json({ ok: true, skipped: true, reason: 'Not the 10th or 16th in Bangladesh time' })
  }

  const tokens = await getNotificationTokens()
  const results = await Promise.allSettled(
    tokens.map((token) =>
      sendFcmNotification({
        token,
        title: notification.title,
        body: notification.body,
      })
    )
  )

  const failedTokens = results
    .map((result, index) => ({ result, token: tokens[index] }))
    .filter(({ result }) => result.status === 'rejected')
    .map(({ token }) => token)

  await Promise.allSettled(failedTokens.map((token) => deleteNotificationToken(token)))

  return NextResponse.json({
    ok: true,
    attempted: tokens.length,
    sent: results.filter((result) => result.status === 'fulfilled').length,
    failed: failedTokens.length,
    notification,
  })
}
