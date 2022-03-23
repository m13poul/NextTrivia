import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect } from "react";
import { QuizContext } from "../contexts/quiz";
import { getQuestions, shuffleAnswers } from "../helpers";
import { useRouter } from "next/router";

const Initializer = ({ categories }) => {
  const [quizState, dispatch] = useContext(QuizContext);

  const router = useRouter();
  console.log(quizState.questions);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(id)
    if (
      !quizState.category ||
      !quizState.numberOfQuestions ||
      !quizState.difficulty
    ) {
      console.log("Something went wrong");
    } else {
      const questions = await getQuestions(
        quizState.category,
        quizState.numberOfQuestions,
        quizState.difficulty
      );
      dispatch({ type: "SET_QUESTIONS", payload: questions });
      // console.log(questions)
      const answers = shuffleAnswers(questions[0]);
      dispatch({ type: "SET_ANSWERS", payload: answers });
      // dispatch({type: 'SET_TIMER', payload: questions.length})
      // console.log(answers)
      const url = quizState.category.replace(/[^a-z0-9]/gim, " ").replace(/\s+/g, " ").replace(/\ /g, "-").replace(/[0-9]/g, "");
      console.log(url);
      // console.log(quizState);
      console.log(answers);

      // router.push(`/category/${url}`)
      router.push(`/?amount=${quizState.numberOfQuestions}&categogy=${url.toLowerCase()}&difficulty=${quizState.difficulty}`, undefined, { shallow: true })

    }
  };
  return (
    <div>
      <h2 className="text-2xl font-bold ">Let&apos;s initialize the settings</h2>
      <div className=" w-full">
        <div className="grid grid-cols-1 gap-6">
          <label className="block">
            <span className="text-gray-700">Full name or nickname</span>
            <input
              type="text"
              className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Select Category</span>
            <select
              className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
              // value={category}
              // onChange={(e) => setCategory(e.target.value)}
              // onChange={(e) => handleSubmit(e.target.value)}
              onChange={(e) =>
                dispatch({ type: "SET_CATEGORY", payload: e.target.value })
              }
              value={quizState.category}
            >
              {categories.map((category) => (
                <option
                  key={uuidv4()}
                  // onChange={() => setCategory(category)}
                  value={category.name.concat(category.id)}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-gray-700">Select Difficulty</span>
            <select
              className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
              onChange={(e) =>
                dispatch({ type: "SET_DIFFICULTY", payload: e.target.value })
              }
              value={quizState.level}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label className="block">
            <span className="text-gray-700">Number of Questions</span>
            <input
              type="number"
              className="block w-full focus:ring-0 focus:border-black border-0 border-b-2 border-gray-200 "
              value={quizState.numberOfQuestions}
              onChange={(e) =>
                dispatch({
                  type: "SET_NUMBER_OF_QUESTIONS",
                  payload: e.target.value,
                })
              }
            />
          </label>
          <button
            className="text-lg bg-orange-500 rounded-md p-2 w-full justify-self-center"
            onClick={handleSubmit}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Initializer;
