import "../styles/globals.css";
import { QuizProvider } from "../contexts/quiz";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <QuizProvider>
        <Component {...pageProps} />
      </QuizProvider>
    </SessionProvider>
  );
}

export default MyApp;
