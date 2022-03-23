import { useContext, useEffect } from "react";
import { QuizContext } from "../contexts/quiz";
const { v4: uuidv4 } = require("uuid");
import Loading from "./Loading";
import Answer from "./Answer";
import Timer from "./Timer";

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  useEffect(() => {
      
  }, []);  
  const currentQuestion = quizState.questions
    ? decodeURIComponent(
        quizState.questions[quizState.currentQuestionIndex].question
      )
    : null;
  // console.log(quizState);

  const hiddenClass = quizState.currentAnswer ? '' : 'hidden';
  return (
    <>

      <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto lg:h-96 " >
        <div className="p-2">
          <div className="mb-4">
            <span className="text-2xl">
            Question{" "}{quizState.questions  && quizState.currentQuestionIndex + 1}
            </span>
            /{quizState.questions && quizState.questions.length}
          </div>

          <div className="">

            {!quizState.questions ? (
              <div className=" col-span-2 text-center justify-self-center"><Loading />We &apos;re restarting the app. Wait a second!</div>
            ) : (
              <div>{currentQuestion}</div>
            )}
          </div>
        </div>
        <div>
          <div>
          <div className="p-2 mr-auto text-right">
              {/* <Countdown date={Date.now() + 30000*quizState.questions.length} renderer={renderer} /> */}
              <Timer />
          </div>
            {quizState.answers
              ? quizState.answers.map((answer, index) => (
                <Answer key={uuidv4()} answer={answer} index={index}
                />
                ))
              : null}
          </div>
          {/* {quizState.currentAnswer ? ( */}
            <div className="mx-auto col-start-2 p-2 text-center">
                <button
                  onClick={() => dispatch({ type: "SET_NEXT_QUESTION" })
                }
                className={`bg-red-900 rounded-md p-2 ${hiddenClass} text-center w-full`}
                >
                  Next Question
                </button>
            </div>
          {/* ) : null} */}
                </div>
        </div>
    </>
  );
};

export default Question;