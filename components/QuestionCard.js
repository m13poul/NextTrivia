import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../contexts/quiz";
import Question from "./Question";
import ShowResults from "./ShowResults";
const { v4: uuidv4 } = require("uuid");
import { lazy, Suspense} from "react";


const ShowResultsOpt = lazy(() => import('./ShowResults'))

const QuestionCard = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div>
      <div className="container mx-auto bg-orange-500 rounded-md p-4 w-full md:w-4/6 lg:w-3/6 relative font-roboto">
        {quizState.showResults ? (
        
          <ShowResults />
        
        ) : <Question />}

      </div>
    </div>
  );
};

export default QuestionCard;
