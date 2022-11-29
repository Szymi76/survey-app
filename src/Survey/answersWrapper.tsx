import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useContext } from "react";
import useHover from "../hooks/useHover";
import { Answer, Question } from "../types/Survey";
import SurveyContext from "../contexts/SurveyContext";
import ModalOnHover from "./ModalOnHover";

interface AnswerWrapperProps {
  children: React.ReactNode;
  index: number;
}

const AnswerWrapper = ({ children, index }: AnswerWrapperProps) => {
  const { hover } = useHover(`qn-${index}`);

  const context = useContext(SurveyContext);
  if (!context) return <></>;
  const { answers, survey } = context;
  if (!survey) return <></>;

  const question = survey.questions[index];

  return (
    <div className="ans-wrapper">
      <div
        className={`hr-line duration-150 ${
          answers[index].list.length > 0 && !answers[index].list.includes("")
            ? "bg-indigo-700"
            : "bg-gray-300"
        }`}
      ></div>
      <div className="hr-line-ball ball-top"></div>
      <div className="hr-line-ball ball-bottom"></div>
      <div className="container ans">
        <div className="ans-row">
          <div className="flex gap-2">
            <h1>{question.label}</h1>
            {question.required && (
              <span className="text-indigo-700 font-semibold text-xl">*</span>
            )}
          </div>
          <QuestionMarkCircleIcon id={`qn-${index}`} className="h-6 text-gray-300" />
          {hover && <ModalOnHover question={question} />}
        </div>
        {children}
      </div>
    </div>
  );
};

export default AnswerWrapper;
