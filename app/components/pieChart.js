import Chart from "react-apexcharts";

const PieChart = ({ title, description, labels, values }) => {
  const config = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      legend: {
        show: true, // Show legends for pie chart
      },
      colors: ["#3783c8", "#F7467F", "#00E396", "#775DD0", "#FEB019"], // Add more colors as needed
      labels: labels ?? [], // Labels for pie chart
    },
    series: values ?? [], // Data for pie chart
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 h-full">
      <h1 className="text-xl font-bold">{title ?? ""}</h1>
      <p className="text-muted text-sm pt-1 mb-3">{description ?? ""}</p>
      <Chart type="donut" options={config.options} series={config.series} />
    </div>
  );
};

export default PieChart;
