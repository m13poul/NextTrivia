import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../contexts/quiz";
import { PureComponent } from "react/cjs/react.development";

const Timer = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    const [timer, setTimer] = useState(quizState.questions.length*30)
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prev => prev - 1)
            // if (timer === 0) {
            //     dispatch({type: 'TIME_OUT'})
            // }
        }, 1000);
    }, []);
    function timerFormater(num){
        const min = Math.floor(num / 60)
        const sec = num % 60
        return min + ':' + sec
    }
    const minutes = Math.floor(quizState.questions.length*30 / 60)
    const seconds = quizState.questions.length % 60
    console.log(minutes,':', seconds)
    return ( 
        <div>{timer}</div>
     );
}

export default Timer;