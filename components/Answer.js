import { useContext, useEffect, useRef } from "react";
import { QuizContext } from "../contexts/quiz";

const Answer = ({ answer, index }) => {
  const [quizState, dispatch] = useContext(QuizContext);
  const handleSubmitAnswer = () => {
    dispatch({ type: "SELECT_ANSWER", payload: answer });
    if (
      answer ===
      quizState.questions[quizState.currentQuestionIndex].correct_answer
    ) {
      const audio = new Audio(
        "https://freesound.org/people/MLaudio/sounds/511484/download/511484__mlaudio__success-bell.wav"
      );
      audio.play();
    } else {
      const audio = new Audio(
        "https://freesound.org/people/Raclure/sounds/483598/download/483598__raclure__wrong.mp3"
      );
      audio.play();
    }
  };
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
        className="p-2 text-center block w-full"
        // onClick={() => dispatch({ type: "SELECT_ANSWER", payload: answer })}
        onClick={() => handleSubmitAnswer()}
        disabled={disabled}
      >
        <div
          className={`border border-black rounded-md w-full flex p-2 hover:cursor-pointer ${correctAnswerClass} ${disabledClass} ${wrongAnswerClass}`}
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
