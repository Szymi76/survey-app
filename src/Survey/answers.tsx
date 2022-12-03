import React, { useContext } from "react";
import { Answer, qnTypes, Question } from "../types/Survey";
import YesNo from "./Answers/yesNo";
import Single from "./Answers/single";
import Multi from "./Answers/multi";
import Short from "./Answers/short";
import Long from "./Answers/long";
import SurveyContext from "../contexts/SurveyContext";
import AnswersContext from "../contexts/AnswersContext";
import AnswerWrapper from "./answersWrapper";

const Answers = () => {
  const context = useContext(SurveyContext);
  if (!context) return <></>;
  const { answers, setAnswers, survey } = context;
  if (!survey) return <></>;

  // TOGLOWANIE TAK I NIE
  const toggleYesNo = (to: "yes" | "no", index: number) => {
    const ans = answers[index];
    const curr = ans.list[0];
    let res = "";

    if (to != curr) res = to;

    setAnswers(answers => {
      answers[index].list = [res];
    });
  };

  // TOGLOWANIE ELEMENU Z LISTY
  const toggleListItem = (item: string, type: "single" | "multi", index: number) => {
    const ans = answers[index];
    let list = ans.list;

    if (list.includes(item)) list = list.filter(l => l != item);
    else list = type == "multi" ? [...list, item] : [item];

    setAnswers(answers => {
      answers[index].list = list;
    });
  };

  // AKTUALIZACJA WARTOŚCI W INPUTCIE I TEXTAREA
  const setInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const value = e.target.value;
    setAnswers(answers => {
      answers[index].list = [value];
    });
  };

  return (
    <AnswersContext.Provider value={{ toggleYesNo, toggleListItem, setInput }}>
      {survey.questions.map((question, i) => {
        return (
          <AnswerWrapper key={"q" + i} index={i}>
            <Switch index={i} question={question} answer={answers[i]} />
          </AnswerWrapper>
        );
      })}
    </AnswersContext.Provider>
  );
};

// SWITCH DLA KAŻDEGO Z RODZAJI PYTAŃ
const Switch = ({
  index,
  question,
  answer,
}: {
  index: number;
  question: Question;
  answer: Answer;
}) => {
  switch (question.type) {
    case qnTypes.YES_NO: {
      return <YesNo index={index} question={question} answer={answer} />;
    }
    case qnTypes.SINGLE: {
      return <Single index={index} question={question} answer={answer} />;
    }
    case qnTypes.MULTI: {
      return <Multi index={index} question={question} answer={answer} />;
    }
    case qnTypes.SHORT: {
      return <Short index={index} question={question} answer={answer} />;
    }
    case qnTypes.LONG: {
      return <Long index={index} question={question} answer={answer} />;
    }
  }
};

export default Answers;
