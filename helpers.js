import jsPDF from "jspdf";
import "jspdf-autotable";

export async function getCategories() {
  const res = await fetch("https://opentdb.com/api_category.php");
  const { trivia_categories } = await res.json();
  return trivia_categories;
}

export async function getQuestions(id, numberOfQuestions, difficulty) {
  const category = id.replace(/\D+/g, "");
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple&&encode=url3986`
  );
  const results = await response.json();

// https://stackoverflow.com/questions/54907549/keep-only-selected-keys-in-every-object-from-array
  const keys_to_keep = ['question', 'correct_answer', 'incorrect_answers']
  const redux = array => array.map(o => keys_to_keep.reduce((acc, curr) => {
    acc[curr] = o[curr];
    return acc;
  }, {}));
  const questions = redux(results.results)
//   console.table(questions)
  return questions
}

export const shuffleAnswers = (question) => {
  if (!question) {
    return [];
  }
  const unshuffledAnswers = [
    question.correct_answer,
    ...question.incorrect_answers,
  ];
  return unshuffledAnswers
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};



  // https://stackoverflow.com/questions/56752113/export-to-pdf-in-react-table
export  const exportPDF = (games) => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 210;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(25);
    const title = "My Past Games";
    const headers = [["Category", "Difficulty", "Correct Answers", "Completed at"]];
    const data = games.map(elt=> [elt.category, elt.difficulty,elt.correctAnswerCount, elt.timestamp]);
    let content = {
      startY: 50,
      head: headers,
      body: data
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
}

export const exportData = (games) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(games)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = "MyGames.json";
  link.click();
};