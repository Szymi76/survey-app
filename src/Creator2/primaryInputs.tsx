import { PencilIcon } from "@heroicons/react/24/solid";
import React, { useContext } from "react";
import CreatorContext from "../contexts/CreatorContext";

const PrimaryInputs = () => {
  const context = useContext(CreatorContext);
  if (!context) return <></>;
  const { survey, setSurvey } = context;

  // ZMIANA TYTUŁU
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setSurvey(survey => {
      // @ts-ignore
      survey[name] = name == "title" ? value : +new Date(value);
    });
  };

  return (
    <div id="primary-inputs">
      <div className="input-with-icon">
        <input
          type={"text"}
          value={survey.title}
          name="title"
          onChange={handleOnChange}
        />
        <PencilIcon className="h-6" />
      </div>
      <div id="date-inputs-row">
        <div className="input-with-row">
          <label>Początek</label>
          <input type={"date"} name="active_from" onChange={handleOnChange} />
        </div>
        <div className="input-with-row">
          <label>Koniec</label>
          <input type={"date"} name="active_until" onChange={handleOnChange} />
        </div>
      </div>
    </div>
  );
};

export default PrimaryInputs;
