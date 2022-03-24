import { useContext, useEffect } from "react";
import { QuizContext } from "../contexts/quiz";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const ShowResults = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const router = useRouter();
  const { data: session, status } = useSession();
  const { width, height } = useWindowSize();
  useEffect(() => {
    if (session) {
      console.log(session);
      fetch(
        `${process.env.NEXT_PUBLIC_API}/receiveScore?score=${quizState.correctAnswerCount}&email=${session.user.email}`,
        {
          method: "POST",
          body: JSON.stringify(quizState),
        }
      );
    }
    if (quizState.correctAnswerCount < quizState.questions.length / 2) {
      // const audio = new Audio(
      //   "https://freesound.org/people/SoundsForHim/sounds/399637/download/399637__soundsforhim__game-over-you-failed.mp3"
      // );
      // audio.play();
    } else {
      const audio = new Audio(
        "https://freesound.org/people/jobro/sounds/60443/download/60443__jobro__tada1.wav"
      );
      audio.play();
    }
  }, []);

  async function handleRestart() {
    router.push("/");
    dispatch({ type: "RESTART" });
  }
  return (
    <div className="grid grid-cols-1 justify-items-center py-20 text-3xl text-center content-center">
      <div>Results</div>
      <div>
        You Scored {quizState.correctAnswerCount} out of{" "}
        {quizState.questions.length} questions!
        {quizState.correctAnswerCount < quizState.questions.length / 2 ? (
          <div>
            <div className="text-center">You suck!!</div>
          </div>
        ) : (
          <div className="text-center">
            That was a good one!
            <Confetti
              width={900}
              height={300}
              recycle={false}
              // colors={ ['#f44336','#fff','black'] }
            />
          </div>
        )}
        <button
          className="text-center p-4 rounded-md mt-8 bg-red-900"
          onClick={handleRestart}
        >
          Start a new Quiz
        </button>
      </div>
    </div>
  );
};

export default ShowResults;
