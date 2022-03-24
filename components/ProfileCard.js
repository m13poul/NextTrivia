/* eslint-disable @next/next/no-img-element */
import { exportPDF, exportData } from "../helpers";
import { useSession, signOut } from "next-auth/react";
import { MdDownload } from "react-icons/md";
import { IconContext } from "react-icons";

import { motion } from "framer-motion"

function ProfileCard({ games }) {
  const { data: session, status } = useSession();

  return (
    <div>
      <div className="w-full overflow text-gray-700">
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
            <motion.div className="flex gap-2 items-center justify-center"
            whileHover={{ scale: 1.1 }}
            onClick={() => exportPDF(games)}
            >
              <button
                className="p-2 bg-orange-500 rounded-md"
              >
                Download as PDF
              </button>{" "}
              <button>
                <MdDownload  />
              </button>
            </motion.div>
            <br />
            <motion.div className="flex gap-2 items-center justify-center"
            whileHover={{ scale: 1.1 }}
            onClick={() => exportData(games)}
            >
              <button
                className="p-2 mb-2 bg-orange-500 rounded-md"
              >
                Export Data
              </button>
              <button>
                <MdDownload />
              </button>
            </motion.div>
          </>
        ) : null}

        <motion.button
          className=" bg-orange-500 p-2 md:w-full lg:mr-4 rounded-md"
          onClick={() => signOut()}
          whileHover={{ scale: 1.1 }}
        >
          Sign Out
        </motion.button>
      </div>
    </div>
  );
}

export default ProfileCard;
