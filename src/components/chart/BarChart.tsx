import React from "react";
import moment from "moment";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

type TChart = {
  stepNumber: number;
  createdAt: string;
};

interface IBarChart {
  charts: TChart[];
}

const BarChart: React.FC<IBarChart> = ({ charts }) => {
  ChartJS.register(...registerables);

  const labels = charts
    .map(({ createdAt }) => moment(createdAt).format("DD/MM/YYYY"))
    .slice(-6);

  const data = {
    labels,
    datasets: [
      {
        label: "Liczba kroków",
        data: charts.map(({ stepNumber }) => stepNumber).slice(-6),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
