import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import api from '../../../../lib/api'
import { AuthUser } from '../../../../types/AuthUser'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },
      authorize: async (credentials, req) => {
        if (credentials && credentials.email && credentials.password) {
          const user = await api.getUserByEmail(credentials?.email)
          if (user) {
            return user
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user
      }
      return token
    },
    session: async ({ session, token }) => {
      session.user = token.user as AuthUser
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
  },
}

export default NextAuth(authOptions)
