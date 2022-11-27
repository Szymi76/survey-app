import { createContext } from "react";
import { Question, Survey } from "../types/Survey";
import { Updater } from "use-immer";
const CreatorContext = createContext<null | CreatorContextTypes>(null);

type CreatorContextTypes = {
  survey: Survey | null;
  qns: Question[];
  setQns: Updater<Question[]>;
};

export default CreatorContext;
