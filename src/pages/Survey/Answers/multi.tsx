import React, { useContext } from "react";
import { Question, Answer } from "../../../types/Survey";
import AnswersContext from "../../../contexts/AnswersContext";
import { Checkbox } from "../../../components/Elements";

const Multi = ({ question, index, answer }: AnswerProps) => {
  const context = useContext(AnswersContext);
  if (!context) return <></>;
  const { toggleListItem } = context;

  return (
    <ul>
      {question.list.map((l, ind) => (
        <li key={"ans" + ind} className="mb-3">
          <Checkbox
            checked={answer.list.includes(l)}
            label={l}
            onClick={() => toggleListItem(l, "multi", index)}
          />
        </li>
      ))}
    </ul>
  );
};

export default Multi;

type AnswerProps = {
  question: Question;
  answer: Answer;
  index: number;
};
