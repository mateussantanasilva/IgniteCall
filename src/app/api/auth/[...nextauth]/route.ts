import NextAuth, { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@/lib/auth/prisma-adapter'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope:
            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
        },
      },
      profile: (profile: GoogleProfile) => {
        // maps NextAuth fields to profile returned by Google
        return {
          // user account data that will be accessed
          id: profile.sub,
          name: profile.name,
          username: '', // no problem, the username already exists and doesn't update
          email: profile.email,
          avatar_url: profile.picture,
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ account }) {
      if (
        !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
      ) {
        return '/register/connect-calendar?error=permissions'
      }

      return true
    },

    async session({ session, user }) {
      return {
        ...session,
        user, // all informations of created user
      }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
