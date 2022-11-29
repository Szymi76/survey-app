import React, { useContext } from "react";
import { Question, Answer } from "../../types/Survey";
import AnswersContext from "../../contexts/AnswersContext";
import { Checkbox } from "../../components/Elements";

const Single = ({ question, index, answer }: AnswerProps) => {
  const context = useContext(AnswersContext);
  if (!context) return <></>;
  const { setInput } = context;

  return (
    <input
      type={"text"}
      placeholder={question.placeholder}
      className="input border-indigo-700"
      maxLength={question.limit}
      onChange={e => setInput(e, index)}
    />
  );
};

export default Single;

type AnswerProps = {
  question: Question;
  answer: Answer;
  index: number;
};
