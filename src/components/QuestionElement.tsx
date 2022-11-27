import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useRef } from "react";
import { qnTypes, Question } from "../types/Survey";
import QuestionWrapper from "./QuestionWrapper";

// propsy komp. pytanie
interface QuestionElementProps {
  qns: Question[];
  setQns: React.Dispatch<React.SetStateAction<Question[]>>;
  i: number;
}

// komponent pytania
const QuestionElement = ({ qns, setQns, i }: QuestionElementProps) => {
  // dodawanie elementu do listy
  const addToList = (value: string) => {
    setQns(qns =>
      qns.map((q, ind) => (i == ind ? { ...q, list: [...q.list, value] } : q))
    );
  };

  // usuwanie elementu z listy
  const removeFromList = (index: number) => {
    setQns(qns =>
      qns.map((q, ind) =>
        i == ind ? { ...q, list: q.list.filter((l, j) => j != index) } : q
      )
    );
  };

  // dodawanie placeholdera
  const addPlaceholder = (value: string) => {
    setQns(qns => qns.map((q, ind) => (i == ind ? { ...q, placeholder: value } : q)));
  };

  // dodawanie limitu
  const addLimit = (value: number) => {
    setQns(qns => qns.map((q, ind) => (i == ind ? { ...q, limit: value } : q)));
  };

  ///// switch z komponentami /////
  switch (qns[i].type) {
    // pytanie tak lub nie
    case qnTypes.YES_NO: {
      return (
        <QuestionWrapper i={i} qns={qns} setQns={setQns}>
          {" "}
        </QuestionWrapper>
      );
    }
    // pytanie pojedyńczej odpowiedzi
    case qnTypes.SINGLE: {
      const qnInputRef = useRef<HTMLInputElement>(null);

      return (
        <QuestionWrapper i={i} qns={qns} setQns={setQns}>
          <div className="input-with-button">
            <input type={"text"} placeholder="Element" ref={qnInputRef} />
            <button
              onClick={() =>
                qnInputRef.current !== null && addToList(qnInputRef.current.value)
              }
            >
              Dodaj
            </button>
          </div>
          <div className="qn-tags-wrapper">
            {qns[i].list.map((l, ind) => (
              <p key={"tag" + ind}>
                {l}
                <XMarkIcon
                  className="h-5 text-black cursor-pointer hover:text-red-500"
                  onClick={() => removeFromList(ind)}
                />
              </p>
            ))}
          </div>
        </QuestionWrapper>
      );
    }
    // pytanie wielokrotnej odpowiedzi
    case qnTypes.MULTI: {
      const qnInputRef = useRef<HTMLInputElement>(null);

      return (
        <QuestionWrapper i={i} qns={qns} setQns={setQns}>
          <div className="input-with-button">
            <input type={"text"} placeholder="Element" ref={qnInputRef} />
            <button
              onClick={() =>
                qnInputRef.current !== null && addToList(qnInputRef.current.value)
              }
            >
              Dodaj
            </button>
          </div>
          <div className="qn-tags-wrapper">
            {qns[i].list.map((l, ind) => (
              <p key={"tag" + ind}>
                {l}
                <XMarkIcon
                  className="h-5 text-black cursor-pointer hover:text-red-500"
                  onClick={() => removeFromList(ind)}
                />
              </p>
            ))}
          </div>
        </QuestionWrapper>
      );
    }
    // pytanie któtkiej odpowiedzi
    case qnTypes.SHORT: {
      return (
        <QuestionWrapper i={i} qns={qns} setQns={setQns}>
          <div className="flex flex-col gap-1">
            <div className="input-with-row w-min">
              <label>Placeholder</label>
              <input
                type={"text"}
                value={qns[i].placeholder}
                onChange={e => addPlaceholder(e.target.value)}
              />
            </div>
            <div className="input-with-row w-min">
              <label>Max. liczba znaków</label>
              <input
                type={"number"}
                min={0}
                value={qns[i].limit}
                onChange={e => addLimit(+e.target.value)}
              />
            </div>
          </div>
        </QuestionWrapper>
      );
    }
    // pytanie długiej odpowiedzi
    case qnTypes.LONG: {
      return (
        <QuestionWrapper i={i} qns={qns} setQns={setQns}>
          <div className="flex flex-col gap-1">
            <div className="input-with-row w-min">
              <label>Placeholder</label>
              <input
                type={"text"}
                value={qns[i].placeholder}
                onChange={e => addPlaceholder(e.target.value)}
              />
            </div>
            <div className="input-with-row w-min">
              <label>Max. liczba znaków</label>
              <input
                type={"number"}
                min={0}
                value={qns[i].limit}
                onChange={e => addLimit(+e.target.value)}
              />
            </div>
          </div>
        </QuestionWrapper>
      );
    }
    default:
      return <></>;
  }
};

export default QuestionElement;
