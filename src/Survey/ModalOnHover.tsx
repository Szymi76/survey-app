import React from "react";
import { prettyQnType } from "../func/prettyQnType";
import { Question } from "../types/Survey";

interface ModalOnHover {
  question: Question;
}

const ModalOnHover = ({ question }: ModalOnHover) => {
  return (
    <div className="qn-details">
      <h4>{question.required ? "Wymagane *" : "Nie wymagane"}</h4>
      <p>{prettyQnType(question.type)}</p>
    </div>
  );
};

export default ModalOnHover;
