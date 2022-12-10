import React, { useContext } from "react";
import { Question, Answer } from "../../../types/Survey";
import AnswersContext from "../../../contexts/AnswersContext";
import { Checkbox } from "../../../components/Elements";

const YesNo = ({ question, index, answer }: AnswerProps) => {
  const context = useContext(AnswersContext);
  if (!context) return <></>;
  const { toggleYesNo } = context;

  return (
    <div className="flex flex-wrap gap-2">
      <button
        className={`btn btn-outlined btn-long ${answer.list.includes("yes") ? "selected" : ""}`}
        onClick={() => toggleYesNo("yes", index)}>
        Tak
      </button>
      <button
        className={`btn btn-outlined btn-long ${answer.list.includes("no") ? "selected" : ""}`}
        onClick={() => toggleYesNo("no", index)}>
        Nie
      </button>
    </div>
  );
};

export default YesNo;

type AnswerProps = {
  question: Question;
  answer: Answer;
  index: number;
};
