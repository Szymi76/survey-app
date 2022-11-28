import { createContext } from "react";
import { Survey } from "../types/Survey";
import { Updater } from "use-immer";
const CreatorContext = createContext<null | CreatorContextTypes>(null);

type CreatorContextTypes = {
  survey: Survey;
  setSurvey: Updater<Survey>;
};

export default CreatorContext;
