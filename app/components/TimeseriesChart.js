import Chart from "react-apexcharts";

const TimeseriesChart = ({
  title,
  description,
  xaxis,
  yaxis,
  ylabel,
  setYear,
  xlabel,
}) => {
  const config = {
    options: {
      chart: {
        height: 100,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      xaxis: {
        categories: xaxis ?? [],
        type: "datetime",
      },
      stroke: {
        curve: "smooth", // Smooth lines
        width: 4, // Line width
        lineCap: "round", // Rounded edges
      },
      yaxis: {},
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      // Remove legends
      legend: {
        show: false,
      },
      // Set line color
      colors: ["#3783c8"], // Use any hex color code
      // Add gradient background below the line
    },
    series: [
      {
        name: ylabel ?? "",
        data: yaxis ?? [],
      },
    ],
  };

  return (
    <div className="bg-white  ">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-bold">{title ?? ""}</h1>
          <p className="text-muted text-sm pt-1">{description ?? ""}</p>
        </div>
      </div>
      <Chart
        type="area"
        height={400}
        options={config.options}
        series={config.series}
      />
    </div>
  );
};

export default TimeseriesChart;
