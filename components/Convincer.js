import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { SiGithub } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { IconContext } from "react-icons";

const Convincer = () => {
  const { data: session, status } = useSession();

  return (
    <div className="text-2xl">
      <div className=" ">
        Setup the settings and playing immediately! <br />
        You can also Login via your GitHub <br /> or Google account to enjoy more features like:
        <ul>
          <li>Save all your past games and your best score</li>
          <li>The time and date you played each game</li>
          <li>Export your games to PDF</li>
          <li>Download your data in JSON</li>
        </ul>
      </div>
      {session ? (
        <Link href="/profile" passHref>
          <button className="text-lg mt-8 bg-orange-500 p-2 rounded-md">
            My Profile
          </button>
        </Link>
      ) : (
        <div>
          <button
            className="text-lg mt-8 bg-orange-500 p-2 rounded-md flex items-center gap-x-1"
            onClick={() => signIn("github")}
          >
                        <IconContext.Provider value={{ style: { fontSize: "30px" } }}>
              <SiGithub />
            </IconContext.Provider>
            <p>
              Sign In with <span className="text-gray-700">GitHub</span>!
            </p>
          </button>
          <br />
          <button
            className="text-lg mt-8 bg-[#4285F4] p-2 rounded-md flex items-center gap-x-1"
            onClick={() => signIn("google")}
          >
            <IconContext.Provider value={{ style: { fontSize: "30px" } }}>
              <FcGoogle />
            </IconContext.Provider>
            <p>
              Sign In with <span className="">Google</span>!
            </p>
          </button>
        </div>
      )}
    </div>
  );
};

export default Convincer;
