import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useState, useContext } from "react";
import { prettyQnType } from "../func/prettyQnType";
import { Question } from "../types/Survey";
import { Checkbox } from "../components/Elements";
import CreatorContext from "../contexts/CreatorContext";

interface QuestionWrapperProps {
  children: React.ReactNode;
  i: number;
}

const QuestionWrapper = ({ children, i }: QuestionWrapperProps) => {
  const [toggled, setToggled] = useState(true);

  const creator = useContext(CreatorContext);
  if (!creator) return <></>;
  const { qns, setQns } = creator;

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
