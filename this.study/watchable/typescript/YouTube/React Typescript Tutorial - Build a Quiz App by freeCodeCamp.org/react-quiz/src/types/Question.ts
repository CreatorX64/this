import { QuestionResponse } from "./QuestionResponse";

export interface Question extends QuestionResponse {
  answers: string[];
}
