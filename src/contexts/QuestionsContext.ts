import { createContext } from "react";
const QuestionsContext = createContext<null | QuestionsContextTypes>(null);

type QuestionsContextTypes = {
  addToList: (value: string, index: number) => void;
  removeFromList: (listInd: number, index: number) => void;
  addPlaceholder: (value: string, index: number) => void;
  addLimit: (value: number, index: number) => void;
};

export default QuestionsContext;
