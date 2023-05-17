import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Chart() {
  const topCompaniesData = useSelector(({ roi }) => roi.topCompaniesData);
  const mode = useSelector(({ mode }) => mode.mode);

  const labels = topCompaniesData.map(
    (company) => `${company.display_name} - ${company.country}`
  );

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return mode === 0 ? `${value}K` : `${value}%`;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const chartData = {
    labels,
    datasets: [
      {
        data:
          mode === 0
            ? topCompaniesData.map((company) => company.installs)
            : topCompaniesData.map((company) => company.revenue / company.cost),
        backgroundColor: [
          "rgb(51, 51, 255)",
          "rgb(0, 153, 153)",
          "rgb(255, 153, 0)",
          "rgb(255, 77, 77)",
          "rgb(153, 0, 204)",
        ],
      },
    ],
  };
  return <Bar options={options} data={chartData} />;
}
