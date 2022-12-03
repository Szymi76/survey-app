import React from "react";
import Chart from "./Elements/chart";
import { Answers, GroupedAnswers, qnTypes, Survey } from "../types/Survey";
import List from "./Elements/list";
import StatWrapper from "./StatWrapper";

type SwitchProps = {
  index: number;
  answer: GroupedAnswers;
};

// SWITCH DLA TYPÓW KOMPONENTÓW ZWRACAJĄCY ODPOWIEDZI WYKRESY CZY TABELE
const Switch = ({ index, answer }: SwitchProps) => {
  switch (answer.type) {
    case qnTypes.YES_NO: {
      return <Chart type="bar" answer={answer} />;
    }
    case qnTypes.SINGLE: {
      return <Chart type="pie" answer={answer} />;
    }
    case qnTypes.MULTI: {
      return <Chart type="pie" answer={answer} />;
    }
    case qnTypes.SHORT: {
      return <List answer={answer} />;
    }
    case qnTypes.LONG: {
      return <List answer={answer} />;
    }
  }
};

// KOMP. ZAWIERAJĄCY WSZYSTKIE ODPOWIEDZI DO ANKIETY
const AnswersStats = ({ answers }: { answers: GroupedAnswers[] }) => {
  return (
    <div id="stats-answers-wrapper">
      {answers.map((answer, index) => (
        <StatWrapper key={`answer_stats-${index}`} answer={answer} index={index}>
          <Switch answer={answer} index={index} />
        </StatWrapper>
      ))}
    </div>
  );
};

export default AnswersStats;
