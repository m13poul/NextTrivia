// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import MongoClientPromise from "../../lib/mongodb";
const { Temporal, Intl, toTemporalInstant } = require('@js-temporal/polyfill');

import { getSession } from "next-auth/react"


export default async function handler(req, res) {
  const session = await getSession({ req })
  if (req.method === 'POST' && session.user.email === req.query.email) {
    // console.log('receiving data...',req.query, JSON.parse(req.body), req.body)
    let data = (({ questions, category, difficulty, correctAnswerCount }) => ({ questions, category, difficulty, correctAnswerCount }))(JSON.parse(req.body));
    console.log(data)
    const client = await MongoClientPromise;
    const db = client.db(process.env.MONGODB_DB);
    db.collection(process.env.MONGODB_COLLECTION).updateOne({
      email: session.user.email
    },{
      $push:{
        games: {...data, timestamp: Temporal.Now.zonedDateTimeISO().toLocaleString()}
      }
    },{
      upsert: true
    })
    const [response] = await db.collection(process.env.MONGODB_COLLECTION).find({email : session.user.email}).toArray();
    console.log(response)

  }
  res.status(200).json({ name: 'John Doe' })
}
