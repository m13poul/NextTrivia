import { useContext, useEffect } from "react";
import { QuizContext } from "../contexts/quiz";
import Question from "./Question";
import ShowResults from "./ShowResults";
const { v4: uuidv4 } = require("uuid");

const QuestionCard = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div>
      <div className="container mx-auto bg-orange-500 rounded-md p-4 w-full md:w-4/6 lg:w-3/6 relative font-roboto">
        {quizState.showResults ? <ShowResults /> : <Question />}

        {/* <div className=" absolute bottom-0 h-10 right-14"><button className="bg-red-900 rounded-md p-2">Next Question</button></div> */}
      </div>
    </div>
  );
};

export default QuestionCard;
