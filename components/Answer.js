import { useContext, useEffect } from "react";
import { QuizContext } from "../contexts/quiz";

const Answer = ({ answer, index }) => {
  const [quizState, dispatch] = useContext(QuizContext);

  const isCorrectAnswer =
    quizState.currentAnswer &&
    answer ===
      quizState.questions[quizState.currentQuestionIndex].correct_answer;
  const isWrongAnswer =
    quizState.currentAnswer === answer &&
    answer !==
      quizState.questions[quizState.currentQuestionIndex].correct_answer;
  const correctAnswerClass = isCorrectAnswer ? "bg-green-500" : "";
  const wrongAnswerClass = isWrongAnswer ? "bg-red-500" : "";
  const disabledClass = quizState.currentAnswer ? "cursor-not-allowed" : "";
  const disabled = quizState.currentAnswer ? "disabled" : "";
  return (
    <div>
      <button
        className={`p-2 text-center block w-full`}
        onClick={() => dispatch({ type: "SELECT_ANSWER", payload: answer })}
        disabled={disabled}
      >
        <div
          className={`border border-black rounded-md w-full flex p-2 hover:cursor-pointer ${correctAnswerClass} 
                    ${disabledClass}
                    ${wrongAnswerClass}`}
        >
          <div className="border border-black rounded-md px-4 py-2 self-center">
            {index + 1}
          </div>
          <div className="border-black rounded-md p-2 w-full">
            <span className="">{decodeURIComponent(answer)}</span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Answer;
