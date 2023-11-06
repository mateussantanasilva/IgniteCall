import { google } from 'googleapis'
import { prisma } from './prisma'
import dayjs from 'dayjs'

export async function getGoogleOAuthToken(userId: string) {
  const account = await prisma.account.findFirstOrThrow({
    where: {
      provider: 'google',
      user_id: userId,
    },
  })

  const expirationDateInMilliseconds = account.expires_at
    ? account.expires_at * 1000
    : null

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  )

  auth.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    expiry_date: expirationDateInMilliseconds,
  })

  if (expirationDateInMilliseconds) return auth

  const isTokenExpired = dayjs(expirationDateInMilliseconds).isBefore(
    new Date(),
  )

  if (isTokenExpired) {
    const { credentials } = await auth.refreshAccessToken()
    const {
      access_token,
      expiry_date,
      id_token,
      refresh_token,
      scope,
      token_type,
    } = credentials

    const expirationDateInSeconds = expiry_date
      ? Math.floor(expiry_date / 1000)
      : null

    await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        access_token,
        expires_at: expirationDateInSeconds,
        id_token,
        refresh_token,
        scope,
        token_type,
      },
    })

    auth.setCredentials({
      access_token,
      refresh_token,
      expiry_date,
    })
  }

  return auth
}
