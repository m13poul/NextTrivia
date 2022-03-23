/* eslint-disable @next/next/no-img-element */
import { exportPDF, exportData } from "../helpers";
import { useSession, signOut } from "next-auth/react";

function ProfileCard({ games }) {
  const { data: session, status } = useSession();

  return (
    <div>
      <div className="w-full overflow">
        <img
          src={session.user.image}
          alt="pic"
          width={90}
          height={90}
          className="mx-auto py-4"
        />
        <p className="py-4">
          You are Logged In as <br /> {session.user.name}
        </p>
        {games !== 0 ? (
          <>
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
          </>
        ) : null}

        <button
          className=" bg-orange-500 p-2 md:w-full lg:mr-4"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
