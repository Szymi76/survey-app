import React from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import AnswerWrapper from "./AnswerWrapper";
import { Checkbox } from "./Elements";
import { Answer, qnTypes, Question } from "../types/Survey";

interface AnswerElementProps {
  ans: Answer;
  setAns: React.Dispatch<React.SetStateAction<Answer[]>>;
  qn: Question;
  i: number;
}

const AnswerElement = ({ ans, setAns, qn, i }: AnswerElementProps) => {
  // toglowanie tak lub nie
  const toggleYesNo = (cli: "yes" | "no") => {
    setAns(ans =>
      ans.map((an, ind) =>
        i == ind
          ? {
              ...an,
              list: [
                cli == "yes"
                  ? an.list.includes("yes")
                    ? ""
                    : "yes"
                  : an.list.includes("no")
                  ? ""
                  : "no",
              ],
            }
          : an
      )
    );
  };

  // toggle list items
  const toggleListItem = (item: string, type: "single" | "multi") => {
    setAns(ans =>
      ans.map((an, ind) =>
        i == ind
          ? an.list.includes(item)
            ? { ...an, list: an.list.filter(a => a != item) }
            : { ...an, list: type == "multi" ? [...an.list, item] : [item] }
          : an
      )
    );
  };

  // aktualizacja wartości w inpucie i textare
  const setInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    setAns(ans => ans.map((an, ind) => (i == ind ? { ...an, list: [val] } : an)));
  };

  switch (qn.type) {
    // pytanie tak lub nie
    case qnTypes.YES_NO: {
      return (
        <AnswerWrapper qn={qn} ans={ans} i={i}>
          <div className="flex flex-wrap gap-2">
            <button
              className={`btn btn-outlined btn-long ${
                ans?.list.includes("yes") ? "selected" : ""
              }`}
              onClick={() => toggleYesNo("yes")}
            >
              Tak
            </button>
            <button
              className={`btn btn-outlined btn-long ${
                ans?.list.includes("no") ? "selected" : ""
              }`}
              onClick={() => toggleYesNo("no")}
            >
              Nie
            </button>
          </div>
        </AnswerWrapper>
      );
    }
    // pytanie pojedyńczej odpowiedzi
    case qnTypes.SINGLE: {
      return (
        <AnswerWrapper qn={qn} ans={ans} i={i}>
          <ul>
            {qn.list.map((l, ind) => (
              <li key={"ans" + ind} className="mb-3">
                <Checkbox
                  checked={ans?.list.includes(l)}
                  label={l}
                  onClick={() => toggleListItem(l, "single")}
                />
              </li>
            ))}
          </ul>
        </AnswerWrapper>
      );
    }
    case qnTypes.MULTI: {
      return (
        <AnswerWrapper qn={qn} ans={ans} i={i}>
          <ul>
            {qn.list.map((l, ind) => (
              <li key={"ans" + ind} className="mb-3">
                <Checkbox
                  checked={ans?.list.includes(l)}
                  label={l}
                  onClick={() => toggleListItem(l, "multi")}
                />
              </li>
            ))}
          </ul>
        </AnswerWrapper>
      );
    }
    case qnTypes.SHORT: {
      return (
        <AnswerWrapper qn={qn} ans={ans} i={i}>
          <input
            type={"text"}
            placeholder={qn.placeholder}
            className="input border-indigo-700"
            maxLength={qn.limit}
            onChange={e => setInput(e)}
          />
        </AnswerWrapper>
      );
    }
    case qnTypes.LONG: {
      return (
        <AnswerWrapper qn={qn} ans={ans} i={i}>
          <textarea
            className="textarea border-indigo-700 w-full"
            placeholder={qn.placeholder}
            maxLength={qn.limit}
            onChange={e => setInput(e)}
          />
        </AnswerWrapper>
      );
    }
    default:
      return <></>;
  }
};

export default AnswerElement;
