import { NextResponse } from 'next/server'
import { saveNotificationToken } from '@/lib/firebase-server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const { token } = (await request.json()) as { token?: string }

  if (!token || typeof token !== 'string') {
    return NextResponse.json({ error: 'Missing FCM token' }, { status: 400 })
  }

  await saveNotificationToken({
    token,
    createdAt: new Date().toISOString(),
    userAgent: request.headers.get('user-agent') || undefined,
  })

  return NextResponse.json({ ok: true })
}
