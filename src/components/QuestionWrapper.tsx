import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { prettyQnType } from "../func/prettyQnType";
import { Question } from "../types/Survey";
import { Checkbox } from "./Elements";

interface QuestionWrapperProps {
  children: React.ReactNode;
  qns: Question[];
  setQns: React.Dispatch<React.SetStateAction<Question[]>>;
  i: number;
}

const QuestionWrapper = ({ children, qns, setQns, i }: QuestionWrapperProps) => {
  const [toggled, setToggled] = useState(true);

  // ustawieanie tytyłu
  const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQns(qns => qns.map((q, ind) => (i == ind ? { ...q, label: e.target.value } : q)));
  };

  // przełącznie wymagania
  const toggleRequired = () => {
    setQns(qns => qns.map((q, ind) => (i == ind ? { ...q, required: !q.required } : q)));
  };

  // usuwa pytanie
  const removeQn = () => {
    setQns(qns => qns.filter((q, ind) => i != ind));
  };

  return (
    <div className="container qn">
      <div className="qn-row">
        <div className="input-with-icon">
          <input type={"text"} value={qns[i].label} onChange={setTitle} />
          <PencilIcon className="h-6" />
        </div>
        <div className="flex">
          <span>
            {toggled ? (
              <ChevronUpIcon
                className="h-8 cursor-pointer"
                onClick={() => setToggled(!toggled)}
              />
            ) : (
              <ChevronDownIcon
                className="h-8 cursor-pointer"
                onClick={() => setToggled(!toggled)}
              />
            )}
          </span>
          <XMarkIcon
            className="h-8 cursor-pointer hover:text-red-500"
            onClick={removeQn}
          />
        </div>
      </div>
      {toggled && (
        <>
          <div className="mt-2">{children}</div>
          <div className="mt-7">
            <Checkbox
              checked={qns[i].required}
              label={"Wymagane"}
              onClick={toggleRequired}
            />
          </div>
          <p className="qn-type">{prettyQnType(qns[i].type)}</p>
        </>
      )}
    </div>
  );
};

export default QuestionWrapper;
