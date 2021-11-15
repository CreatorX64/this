import { FC, MouseEvent, useState, Fragment } from "react";
import { QuestionCard } from "./components/QuestionCard";
import { fetchQuizQuestions } from "./api";
import { UserAnswer } from "./types/UserAnswer";
import { Question } from "./types/Question";
import { Difficulty } from "./types/Difficulty";
import { GlobalStyle, Wrapper } from "./App.styles";

const TOTAL_QUESTIONS = 10;

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(true);

  const startTrivia = async (): Promise<void> => {
    setIsLoading(true);
    setIsGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setIsLoading(false);
  };

  const checkAnswer = (e: MouseEvent<HTMLButtonElement>): void => {
    if (!isGameOver) {
      const answer = e.currentTarget.value;
      const isAnswerCorrect =
        questions[currentQuestionIndex].correct_answer === answer;

      if (isAnswerCorrect) {
        setScore((prevState) => prevState + 1);
      }

      const userAnswer = {
        question: questions[currentQuestionIndex].question,
        answer,
        correct: isAnswerCorrect,
        correctAnswer: questions[currentQuestionIndex].correct_answer
      };

      setUserAnswers((prevState) => [...prevState, userAnswer]);
    }
  };

  const nextQuestion = (): void => {
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex === TOTAL_QUESTIONS) {
      setIsGameOver(true);
    } else {
      setCurrentQuestionIndex(nextQuestionIndex);
    }
  };

  return (
    <Fragment>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>

        {(isGameOver || userAnswers.length === TOTAL_QUESTIONS) && (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        )}

        {!isGameOver && <p className="score">Score: {score}</p>}

        {isLoading && <p>Loading questions...</p>}

        {!isLoading && !isGameOver && (
          <QuestionCard
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[currentQuestionIndex].question}
            answers={questions[currentQuestionIndex].answers}
            userAnswer={userAnswers?.[currentQuestionIndex] ?? null}
            callback={checkAnswer}
          />
        )}

        {!isGameOver &&
          !isLoading &&
          userAnswers.length === currentQuestionIndex + 1 &&
          currentQuestionIndex !== TOTAL_QUESTIONS - 1 && (
            <button className="next" onClick={nextQuestion}>
              Next question
            </button>
          )}
      </Wrapper>
    </Fragment>
  );
};
