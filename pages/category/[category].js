import { getCategories } from "../../helpers";
import { useContext, useEffect } from "react";
import { QuizContext } from "../../contexts/quiz";
import QuestionCard from "../../components/QuestionCard";
import Nav from "../../components/Nav";
const { v4: uuidv4 } = require('uuid');

export const getStaticPaths = async () => {
  const trivia_categories = await getCategories();
  console.log(trivia_categories)
  let id = [];
  {
    trivia_categories.map((category) => {
      id.push(category.id.toString());
    });
  }
  const paths = trivia_categories.map((category, index) => {
    return {
      params: {
        category: JSON.stringify(category.name)
          .replace(/[^a-z0-9]/gim, " ")
          .replace(/\s+/g, " ")
          .replace(/\ /g, "-")
          .substring(1)
          .slice(0, -1)
          // .concat(id[index]),
        // id: category.id.toString(),
      },
    };
  });
  console.log(paths)
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.category.replace(/\D+/g, "");
  console.log(id)
  const res = await fetch(
    `https://opentdb.com/api.php?amount=10&category=${id}&difficulty=easy&type=multiple`
  );
  const data = await res.json();
  console.log(data);
  return {
    props: {

    },
  };
};

export default function Category(){
  const [quizState, dispatch] = useContext(QuizContext);

  return(
    <div>
      <Nav />
      <QuestionCard />

    </div>
  )
}