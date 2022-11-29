import { createContext } from "react";
import { Answer, Survey } from "../types/Survey";
import { Updater } from "use-immer";
const SurveyContext = createContext<null | SurveyContextTypes>(null);

type SurveyContextTypes = {
  answers: Answer[];
  setAnswers: Updater<Answer[]>;
  survey: Survey | null;
};

export default SurveyContext;
