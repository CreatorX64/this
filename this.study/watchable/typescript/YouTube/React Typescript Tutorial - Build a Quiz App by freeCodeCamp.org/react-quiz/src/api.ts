import { shuffleArray } from "./utils";
import { Question } from "./types/Question";
import { QuestionResponse } from "./types/QuestionResponse";
import { Difficulty } from "./types/Difficulty";

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();

  return data.results.map(
    (question: QuestionResponse): Question => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer
      ])
    })
  );
};
