import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ArcElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { GroupedAnswers, qnTypes } from "../../types/Survey";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

type ChartProps = {
  type: "pie" | "bar";
  answer: GroupedAnswers;
};

const Chart = ({ type, answer }: ChartProps) => {
  const data = answer.list.map(item => item.count);
  let labels = answer.list.map(item => item.label);

  if (answer.type == qnTypes.YES_NO)
    labels = labels.map(label => (label == "yes" ? "Tak" : "Nie"));

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: answer.label,
        data: data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-[500px] mx-auto my-5">
      {type == "bar" ? (
        <Bar style={{ width: 300 }} data={chartData} />
      ) : (
        <Pie data={chartData} />
      )}
    </div>
  );
};

export default Chart;
