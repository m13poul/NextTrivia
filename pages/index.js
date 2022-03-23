import Initializer from "../components/initializer";
import { getCategories } from "../helpers";
import { useContext, useEffect } from "react";
import { QuizContext } from "../contexts/quiz";
import Nav from "../components/Nav";
import Convincer from "../components/Convincer";
import Effects from "../components/Effects";
import Footer from "../components/Footer";
import QuestionCard from "../components/QuestionCard";

export default function Home({ trivia_categories }) {
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div className=" max-h-full overflow-hidden">
      <Nav />

      {!quizState.showQuestions ? (
        <div className="container mx-auto md:grid grid-cols-2 gap-2 xl:gap-0 bg-slate-400  py-14 font-garamond bg-transparent">
          <div className="self-center hidden md:block">
            <Convincer />
          </div>
          <div className="px-4 md:p-0 lg:w-2/3 mx-auto xl:m-0">
            <Initializer categories={trivia_categories} />
          </div>
        </div>
      ) : (
        <div 
        className=" mt-20 mb-24"
        >
          <QuestionCard />
        </div>
      )}
        <div className="">
          <div className="container mx-auto">
            <div className="">
              <Effects />
              <div className="">
                <Footer />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container mx-auto bg-slate-600 py-4">
        <Footer />
      </div> */}
    </div>
  );
}

export async function getStaticProps(context) {
  const categories = await getCategories();
  // console.log(categories);
  return {
    props: {
      trivia_categories: categories,
    },
  };
}
