import { FC, MouseEvent } from "react";
import { UserAnswer } from "../types/UserAnswer";
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

interface IProps {
  totalQuestions: number;
  question: string;
  questionNumber: number;
  answers: string[];
  userAnswer: UserAnswer | null;
  callback: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const QuestionCard: FC<IProps> = ({
  totalQuestions,
  question,
  questionNumber,
  answers,
  userAnswer,
  callback
}) => (
  <Wrapper>
    <p className="number">
      Question: {questionNumber} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        <ButtonWrapper
          key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
        >
          <button
            disabled={userAnswer !== null}
            value={answer}
            onClick={callback}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
);
