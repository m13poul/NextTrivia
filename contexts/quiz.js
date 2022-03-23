import { createContext, useReducer } from "react";
// import { questions } from '../questions'
// import { shuffleAnswers } from '../helpers'
import { shuffleAnswers } from "../helpers";


// This is our inital state. We also need to return this, each time the user hits the "Restart" button
const initialState =  {
    questions: '',
    currentQuestionIndex: 0,
    showResults: false,
    correctAnswerCount: 0,
    answers: null,
    currentAnswer: '',
    category: 'General-Knowledge',
    difficulty: 'easy',
    numberOfQuestions: 10,
    timer: true,
    showQuestions: false
}

// This is the reducer function.
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_CATEGORY" : {
            // console.log(state.category)
            return {
                ...state,
                // category: parseInt(action.payload)
                category: action.payload
            }
        }
        case "SET_DIFFICULTY" : {
            // console.log(state.category)
            return {
                ...state,
                difficulty: action.payload
            }
        }
        case "SET_NUMBER_OF_QUESTIONS" : {
            // console.log(state.category)
            return {
                ...state,
                numberOfQuestions: parseInt(action.payload)
            }
        }
        case "SET_QUESTIONS" : {
            return {
                ...state,
                questions: action.payload
            }
        }
        case "SET_ANSWERS" : {
            return {
                ...state,
                answers: action.payload,
                showQuestions: true
            }
        }
        case "SELECT_ANSWER": {
            const correctAnswerCount =
            action.payload ===
            state.questions[state.currentQuestionIndex].correct_answer
              ? state.correctAnswerCount + 1
              : state.correctAnswerCount;           
               return {
                ...state,
                currentAnswer: action.payload,
                correctAnswerCount,
            }
        }
        case "SET_NEXT_QUESTION": {
            const showResults = state.currentQuestionIndex === state.questions.length -1;
            const currentQuestionIndex = showResults ? state.currentQuestionIndex : state.currentQuestionIndex + 1;
            const answers = showResults ? [] : shuffleAnswers(state.questions[currentQuestionIndex])
            return {
                ...state,
                currentQuestionIndex,
                showResults,
                answers,
                currentAnswer: '',
            };
        }
        case "RESTART":
            return initialState;
        default: 
        return state
    }
}

// Here we create a Context. It's a  global object which we can access in every component.
export const QuizContext = createContext();
// We also need a Provider. See https://reactjs.org/docs/context.html .
export const QuizProvider = ({children}) => {

    const value = useReducer(reducer, initialState)

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}