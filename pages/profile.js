/* eslint-disable @next/next/no-img-element */
import Nav from "../components/Nav";
import { getSession, useSession, signOut } from "next-auth/react";
import MongoClientPromise from "../lib/mongodb";
import { Table } from "../components/table/Table";
import Footer from "../components/Footer";
import Effects from "../components/Effects";
import ProfileCard from "../components/ProfileCard";
import NoGamesFound from "../components/NoGamesFound";
const { Temporal, Intl, toTemporalInstant } = require('@js-temporal/polyfill');
const Profile = ({ response }) => {
  const { data: session, status } = useSession();
  // console.log(JSON.parse(response), session);
  const games = JSON.parse(response);
  // console.log(games);
  console.log(Temporal.Now.zonedDateTimeISO().toLocaleString())

  return (
    <div className="container mx-auto text-center font-roboto">
      <Nav />
      <div className="md:grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6  gap-2 mt-8 auto-cols-max">
        <ProfileCard games={games} />
        {games !== 0 ? <Table games={games} /> : <NoGamesFound />}
      </div>
      <div className="mt-8">
        <Effects />
        <Footer />
      </div>
    </div>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  // Here we need to check whether the user is logged in. Since this is server side, we use the getSession from NextAuth. If the user is not logged in redirect to homepage
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  const client = await MongoClientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const [response] = await db
    .collection(process.env.MONGODB_COLLECTION)
    .find({ email: session.user.email })
    .toArray();
  // console.log(response.games.length === 0)
  if (!response.games) {
    return {
      props: {
        response: 0,
        session,
      },
    };
  }
  return {
    props: {
      response: JSON.stringify(response.games),
      session,
    },
  };
}
