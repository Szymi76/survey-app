import React, { useState } from "react";
import { Answers, GroupedAnswers, Question } from "../../types/Survey";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { prettyQnType } from "../../func/prettyQnType";

type StatWrapperProps = {
  children: React.ReactNode;
  index: number;
  answer: GroupedAnswers;
};

const StatWrapper = ({ children, answer, index }: StatWrapperProps) => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className="container">
      <div className="stats-header">
        <h1 className="text-xl">
          <span className="font-semibold mr-2">#{index + 1}</span> {answer.label}
        </h1>
        <span onClick={() => setToggled(!toggled)}>
          {toggled ? (
            <ChevronUpIcon className="h-9 cursor-pointer hover:text-indigo-700" />
          ) : (
            <ChevronDownIcon className="h-9 cursor-pointer hover:text-indigo-700" />
          )}
        </span>
      </div>
      {toggled && (
        <>
          <div>{children}</div>
          <div className="float-right text-sm text-gray-400 font-light">
            <p>{prettyQnType(answer.type)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default StatWrapper;
