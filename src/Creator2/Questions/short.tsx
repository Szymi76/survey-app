import React, { useContext, useRef } from "react";
import QuestionsContext from "../../contexts/QuestionsContext";
import { Question } from "../../types/Survey";

const Short = ({ index, question }: QuestionProps) => {
  const context = useContext(QuestionsContext);
  if (!context) return <></>;
  const { addPlaceholder, addLimit } = context;

  return (
    <div className="flex flex-col gap-1">
      <div className="input-with-row w-min">
        <label>Placeholder</label>
        <input
          type={"text"}
          value={question.placeholder}
          onChange={e => addPlaceholder(e.target.value, index)}
        />
      </div>
      <div className="input-with-row w-min">
        <label>Max. liczba znaków</label>
        <input
          type={"number"}
          min={0}
          value={question.limit}
          onChange={e => addLimit(+e.target.value, index)}
        />
      </div>
    </div>
  );
};

export default Short;

type QuestionProps = {
  index: number;
  question: Question;
};
