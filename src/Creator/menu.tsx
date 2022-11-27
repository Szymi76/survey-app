import React, { useEffect, useContext } from "react";
import CreatorContext from "../contexts/CreatorContext";
import {
  DEFAULT_LONG_QN,
  DEFAULT_MULTI_QN,
  DEFAULT_SHORT_QN,
  DEFAULT_SINGLE_QN,
  DEFAULT_YES_NO_QN,
} from "../data/defaultQns";
import { Question } from "../types/Survey";

interface QuestionsMenuProps {
  toggled: boolean;
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionsMenu = ({ toggled, setToggled }: QuestionsMenuProps) => {
  const creator = useContext(CreatorContext);
  if (!creator) return <></>;
  const { setQns } = creator;

  // TOGLOWANIE MENU W MOMENCIE GDY UŻYTKOWNIK KLIKNIE POZA ELEMENT
  useEffect(() => {
    const handleClick = (e: any) => {
      if (e.target.classList.contains("qns-prev")) return;
      setToggled(false);
    };

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  // DODAWANIE PYTANIA
  const addQn = (qn: Question) => {
    setQns(qns => [...qns, qn]);
    setToggled(false);
  };

  return (
    <ul
      id="qns-menu"
      className={`qns-prev ${toggled ? "qns-menu-toggled" : "qns-menu-hidden"}`}
    >
      <h2 className="qns-prev">Rodzaj nowego pytania</h2>
      <li onClick={() => addQn(DEFAULT_YES_NO_QN)}>Pytanie tak lub nie</li>
      <li onClick={() => addQn(DEFAULT_SINGLE_QN)}>Pytanie pojedyńczej odpowiedzi</li>
      <li onClick={() => addQn(DEFAULT_MULTI_QN)}>Pytanie wielokrotnej odpowiedzi</li>
      <li onClick={() => addQn(DEFAULT_SHORT_QN)}>Krótka odpowiedź</li>
      <li onClick={() => addQn(DEFAULT_LONG_QN)}>Długa odpowiedź</li>
    </ul>
  );
};

export default QuestionsMenu;
