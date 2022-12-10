import React, { useEffect, useContext } from "react";
import {
  DEFAULT_LONG_QN,
  DEFAULT_MULTI_QN,
  DEFAULT_SHORT_QN,
  DEFAULT_SINGLE_QN,
  DEFAULT_YES_NO_QN,
} from "../../data/defaultQns";
import { Question } from "../../types/Survey";
import CreatorContext from "../../contexts/CreatorContext";

type QuestionTypesMenuProps = {
  toggled: boolean;
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
};

const QuestionTypesMenu = ({ toggled, setToggled }: QuestionTypesMenuProps) => {
  // CONTEXT
  const context = useContext(CreatorContext);
  if (!context) return <></>;
  const { setSurvey } = context;

  // FUNKCIONALNOŚĆ W MOMENCIE KLIKNIĘCIA PO ZA MENU
  useEffect(() => {
    const handleClick = (e: any) => {
      if (e.target.classList.contains("qns-prev")) return;
      setToggled(false);
    };

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  const addQn = (qn: Question) => {
    setSurvey((survey) => {
      survey.questions.push(qn);
    });
    setToggled(false);
  };

  return (
    <ul id="qns-menu" className={`qns-prev ${toggled ? "qns-menu-toggled" : "qns-menu-hidden"}`}>
      <h2 className="qns-prev">Rodzaj nowego pytania</h2>
      <li onClick={() => addQn(DEFAULT_YES_NO_QN)}>Pytanie tak lub nie</li>
      <li onClick={() => addQn(DEFAULT_SINGLE_QN)}>Pytanie pojedyńczej odpowiedzi</li>
      <li onClick={() => addQn(DEFAULT_MULTI_QN)}>Pytanie wielokrotnej odpowiedzi</li>
      <li onClick={() => addQn(DEFAULT_SHORT_QN)}>Krótka odpowiedź</li>
      <li onClick={() => addQn(DEFAULT_LONG_QN)}>Długa odpowiedź</li>
    </ul>
  );
};

export default QuestionTypesMenu;
