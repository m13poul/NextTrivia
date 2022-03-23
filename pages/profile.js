/* eslint-disable @next/next/no-img-element */
import Nav from "../components/Nav";
import { getSession, useSession, signOut } from "next-auth/react";
import MongoClientPromise from "../lib/mongodb";
import { Table } from "../components/table/Table";
import { exportPDF } from "../helpers";
import { exportData } from "../helpers";
import Footer from '../components/Footer'
import Effects from "../components/Effects";

const Profile = ({ response }) => {
  const { data: session, status } = useSession();
  console.log(JSON.parse(response));
  const games = JSON.parse(response);

  return (
    <div className="container mx-auto text-center font-roboto">
      <Nav />
      <div className="md:grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6  gap-2 mt-8 auto-cols-max">
        <div className="w-full overflow">
          <img
            src={session.user.image}
            alt="pic"
            width={90}
            height={90}
            className="mx-auto py-4"
          />
          <p className="py-4">
            You are Logged In as <br /> {session.user.email}
          </p>
          <button
            className="p-2 mb-2 bg-orange-500"
            onClick={() => exportPDF(games)}
          >
            Download as PDF
          </button>{" "}
          <br />
          <button
            className="p-2 mb-2 bg-orange-500"
            onClick={() => exportData(games)}
          >
            Export Data
          </button>
          <button
            className=" bg-orange-500 p-2 md:w-full lg:mr-4"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
        <div className="md:col-span-3 lg:col-span-5">
          <h2 className=" text-3xl  font-title text-orange-500 mb-4">My Games</h2>
          <Table games={games} />
        </div>
      </div>
      {/* <Effects /> */}
      {/* <Footer /> */}
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

  return {
    props: {
      response: JSON.stringify(response.games),
      session,
    },
  };
}
