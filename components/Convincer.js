import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Convincer = () => {
  const { data: session, status } = useSession();

  return (
    <div className="text-2xl">
      <div className=" ">
        Setup the settings on the right and playing immediately! <br />
        You can also Login via your GitHub account to enjoy more features like:
        <ul>
          <li>Save all your past games and your best score</li>
          <li>The time and date you played each game</li>
          <li>Export your games to PDF</li>
        </ul>
      </div>
      {session ? (
        <Link href="/profile" passHref>
          <button
            className="text-lg mt-8 bg-orange-500 p-2 rounded-md"
          >
            My Profile
          </button>
        </Link>
      ) : (
        <button
          className="text-lg mt-8 bg-orange-500 p-2 rounded-md"
          onClick={() => signIn("github")}
        >
          Sign In with <span className="text-gray-700">GitHub</span>!
        </button>
      )}
    </div>
  );
};

export default Convincer;
