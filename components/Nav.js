import Link from "next/link";
import { useState, useEffect } from "react";
import { QuizContext } from "../contexts/quiz";
import { useContext } from "react";
import { useRouter } from "next/router";
import Effects from "./Effects";

const Nav = () => {
    const [quizState, dispatch] = useContext(QuizContext);

    return ( 
        <div className="">
            <div className="">
                {/* <Effects /> */}
            </div>
            <div className="text-center text-5xl text-orange-500 font-title tracking-widest py-8 bg-[#420039] container mx-auto rounded-md">
                <Link href="/" passHref><button onClick={() => dispatch({type: 'RESTART'})} className="">NextTrivia</button></Link>
            </div>
        </div>
     );
}
 
export default Nav;