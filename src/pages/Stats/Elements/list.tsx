import React from "react";
import { GroupedAnswers } from "../../../types/Survey";

type ListProps = {
  answer: GroupedAnswers;
};

const List = ({ answer }: ListProps) => {
  return (
    <table className="stats-table">
      <tr>
        <th>Liczba odpowiedzi</th>
        <th>Odpowiedź</th>
      </tr>
      {answer.list.map((item, index) => {
        return (
          <tr key={answer.label + index}>
            <td>{item.count}</td>
            <td>{item.label}</td>
          </tr>
        );
      })}
    </table>
  );
};

export default List;
