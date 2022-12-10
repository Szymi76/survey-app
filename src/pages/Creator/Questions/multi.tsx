import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useContext, useRef } from "react";
import QuestionsContext from "../../../contexts/QuestionsContext";
import { Question } from "../../../types/Survey";

const Multi = ({ index, question }: QuestionProps) => {
  const context = useContext(QuestionsContext);
  if (!context) return <></>;
  const { addToList, removeFromList } = context;

  const listInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="input-with-button">
        <input type={"text"} placeholder="Element" ref={listInputRef} />
        {/* @ts-ignore */}
        <button onClick={() => addToList(listInputRef.current?.value, index)}>Dodaj</button>
      </div>
      <div className="qn-tags-wrapper">
        {question.list.map((l, i) => (
          <p key={"tag" + i}>
            {l}
            <XMarkIcon
              className="h-5 text-black cursor-pointer hover:text-red-500"
              onClick={() => removeFromList(i, index)}
            />
          </p>
        ))}
      </div>
    </>
  );
};

export default Multi;

type QuestionProps = {
  index: number;
  question: Question;
};
