import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import MongoClientPromise from '../../../lib/mongodb'

const THIRTY_DAYS = 30 * 24 * 60 * 60
const THIRTY_MINUTES = 30 * 60

// We define two Providers. GitHub Provider and EmailProvider. Email provider will not work if your app is behind a proxy. This would require a workaround. There is relevant documentation on the NextAuth website.
export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: THIRTY_DAYS,
        updateAge: THIRTY_MINUTES
      },
    adapter: MongoDBAdapter(MongoClientPromise),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
    // ...add more providers here
  ],
  debug: true,

},

)