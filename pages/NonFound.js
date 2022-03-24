import React from "react";
import Nav from "../components/Nav";
import { useContext, useEffect } from "react";
import { QuizContext } from "../contexts/quiz";
import { useRouter } from "next/router";

function NonFound() {
  const [quizState, dispatch] = useContext(QuizContext);
  const router = useRouter();

  async function handleRestart() {
    router.push("/");
    dispatch({ type: "RESTART" });
  }
  return (
    <div>
      <Nav />
      <p className="container mx-auto text-3xl text-center font-roboto mt-56">
        We couldn&apos;t find any questions matching that criteria. Please
        reduce the number of questions!
          <button
            className="text-center p-4 rounded-md mt-8 bg-orange-500"
            onClick={handleRestart}
          >
            RESTART
          </button>
      </p>
    </div>
  );
}

export default NonFound;
