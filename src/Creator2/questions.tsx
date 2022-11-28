import React, { useContext } from "react";
import CreatorContext from "../contexts/CreatorContext";
import { qnTypes } from "../types/Survey";
import QuestionWrapper from "./questionsWrapper";
import QuestionsContext from "../contexts/QuestionsContext";

import YesNo from "./Questions/yesNo";
import Single from "./Questions/single";
import Multi from "./Questions/multi";
import Short from "./Questions/short";
import Long from "./Questions/long";

const Questions = () => {
  const context = useContext(CreatorContext);
  if (!context) return <></>;
  const { survey, setSurvey } = context;

  // DODAWANIE ELEMENTU DO LISTY
  const addToList = (value: string, index: number) => {
    setSurvey(survey => {
      survey.questions[index].list.push(value);
    });
  };

  // USUWANIE ELEMENU Z LISTY
  const removeFromList = (listInd: number, index: number) => {
    setSurvey(survey => {
      survey.questions[index].list.splice(listInd, 1);
    });
  };

  // DODAWANIE PLACEHOLDERA
  const addPlaceholder = (value: string, index: number) => {
    setSurvey(survey => {
      survey.questions[index].placeholder = value;
    });
  };

  // DODAWANIE LIMITU
  const addLimit = (value: number, index: number) => {
    setSurvey(survey => {
      survey.questions[index].limit = value;
    });
  };

  // SWITCH DO RENDERU WŁAŚCIWEGO KOMP.
  const Switch = ({ index }: { index: number }) => {
    const question = survey.questions[index];

    switch (survey.questions[index].type) {
      case qnTypes.YES_NO: {
        return <YesNo />;
      }
      case qnTypes.SINGLE: {
        return <Single index={index} question={question} />;
      }
      case qnTypes.MULTI: {
        return <Multi index={index} question={question} />;
      }
      case qnTypes.SHORT: {
        return <Short index={index} question={question} />;
      }
      case qnTypes.LONG: {
        return <Long index={index} question={question} />;
      }
    }
  };

  return (
    <QuestionsContext.Provider
      value={{ addToList, removeFromList, addPlaceholder, addLimit }}
    >
      {survey.questions.map((qn, i) => {
        return (
          <QuestionWrapper key={"q" + i} index={i}>
            <Switch index={i} />
          </QuestionWrapper>
        );
      })}
    </QuestionsContext.Provider>
  );
};

export default Questions;
