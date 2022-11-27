import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import useHover from "../hooks/useHover";
import { Answer, Question } from "../types/Survey";

import ModalOnHover from "./ModalOnHover";

interface AnswerWrapperProps {
  qn: Question;
  ans: Answer;
  i: number;
  children: React.ReactNode;
}

const AnswerWrapper = ({ qn, ans, i, children }: AnswerWrapperProps) => {
  const { hover } = useHover(`qn-${i}`);

  return (
    <div className="ans-wrapper">
      <div
        className={`hr-line duration-150 ${
          ans?.list.length > 0 && !ans?.list.includes("")
            ? "bg-indigo-700"
            : "bg-gray-300"
        }`}
      ></div>
      <div className="hr-line-ball ball-top"></div>
      <div className="hr-line-ball ball-bottom"></div>
      <div className="container ans">
        <div className="ans-row">
          <div className="flex gap-2">
            <h1>{qn.label}</h1>
            {qn.required && (
              <span className="text-indigo-700 font-semibold text-xl">*</span>
            )}
          </div>
          <QuestionMarkCircleIcon id={`qn-${i}`} className="h-6 text-gray-300" />
          {hover && <ModalOnHover qn={qn} />}
        </div>
        {children}
      </div>
    </div>
  );
};

export default AnswerWrapper;
