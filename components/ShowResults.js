import { useContext, useEffect } from "react";
import { QuizContext } from "../contexts/quiz";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";


const ShowResults = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      console.log(session)
      fetch(`${process.env.NEXT_PUBLIC_API}/receiveScore?score=${quizState.correctAnswerCount}&email=${session.user.email}`, {
        method: 'POST',
        body: JSON.stringify(quizState)
      })
    }
  }, []);

  async function handleRestart() {
    router.push("/")
    dispatch({type: 'RESTART'})
  }  
  return (
    <div className="grid grid-cols-1 justify-items-center py-20 text-3xl text-center content-center">
      <div>Results</div>
      <div>
        You Scored {quizState.correctAnswerCount} out of{" "}
        {quizState.questions.length} questions!
        {quizState.correctAnswerCount < quizState.questions.length ? (
        <div>
            <div className="text-center">You suck!!</div>
            <div className="text-center p-4 rounded-md mt-8 bg-red-900"><button onClick={handleRestart}>Start a new Quiz</button></div>
        </div>

        ) : (
        <div className="text-center">
          That was a good one!
          <div className="text-center p-4 rounded-md mt-8 bg-red-900"><button onClick={handleRestart}>Start a new Quiz</button></div>

        </div>)
        }
      </div>
    </div>
  );
};

export default ShowResults;
