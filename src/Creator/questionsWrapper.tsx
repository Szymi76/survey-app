import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { prettyQnType } from "../func/prettyQnType";
import { Checkbox } from "../components/Elements";
import CreatorContext from "../contexts/CreatorContext";

interface QuestionWrapperProps {
  children: React.ReactNode;
  index: number;
}

const QuestionWrapper = ({ children, index }: QuestionWrapperProps) => {
  const [toggled, setToggled] = useState(true);

  const context = useContext(CreatorContext);
  if (!context) return <></>;
  const { survey, setSurvey } = context;

  // ustawieanie tytyłu
  const setLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurvey(survey => {
      survey.questions[index].label = e.target.value;
    });
  };

  // przełącznie wymagania
  const toggleRequired = () => {
    // setSurvey(survey => qns.map((q, ind) => (i == ind ? { ...q, required: !q.required } : q)));
    setSurvey(survey => {
      survey.questions[index].required = !survey.questions[index].required;
    });
  };

  // usuwa pytanie
  const removeQn = () => {
    setSurvey(survey => {
      survey.questions.splice(index, 1);
    });
  };

  return (
    <div className="container qn">
      <div className="qn-row">
        <div className="input-with-icon">
          <input
            type={"text"}
            value={survey.questions[index].label}
            onChange={setLabel}
          />
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
              checked={survey.questions[index].required}
              label={"Wymagane"}
              onClick={toggleRequired}
            />
          </div>
          <p className="qn-type">{prettyQnType(survey.questions[index].type)}</p>
        </>
      )}
    </div>
  );
};

export default QuestionWrapper;
