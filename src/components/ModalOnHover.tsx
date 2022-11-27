import React from "react";
import { prettyQnType } from "../func/prettyQnType";
import { Question } from "../types/Survey";

interface ModalOnHover {
  qn: Question;
}

const ModalOnHover = ({ qn }: ModalOnHover) => {
  return (
    <div className="qn-details">
      <h4>{qn.required ? "Wymagane *" : "Nie wymagane"}</h4>
      <p>{prettyQnType(qn.type)}</p>
    </div>
  );
};

export default ModalOnHover;
