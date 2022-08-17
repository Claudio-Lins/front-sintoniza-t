import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'credentials',
      type: 'credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'email',
          placeholder: 'email address',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: (credentials) => {
        // database look up
        if (
          credentials.username === 'sintoniza-t@gmail.com' &&
          credentials.password === '123456'
        ) {
          return {
            id: 2,
            name: 'Claudio Lins',
            email: 'sintoniza-t@gmail.com',
            image:
              'https://avatars.githubusercontent.com/u/69011104?s=400&u=15bc2ea0632da6b2b4ee636d522e6e5265a0238a&v=4',
          }
        }

        // login failed
        return null
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id
      }

      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
      }

      return session
    },
  },
  secret: 'test',
  jwt: {
    secret: 'test',
    encryption: true,
  },
  // pages: {
  //   signIn: "/login",
  // },
})
