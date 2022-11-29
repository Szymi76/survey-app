import { createContext } from "react";
const AnswersContext = createContext<null | AnswersContextTypes>(null);

type AnswersContextTypes = {
  toggleYesNo: (to: "yes" | "no", index: number) => void;
  toggleListItem: (item: string, type: "single" | "multi", index: number) => void;
  setInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => void;
};

export default AnswersContext;
