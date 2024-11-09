import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const HorizontalBarChart = ({
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
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadiusApplication: "end",
          horizontal: true,
        },
      },
      xaxis: {
        categories: xaxis ?? [],
      },
      stroke: {
        curve: "smooth", // Smooth lines
        width: 4, // Line width
        lineCap: "round", // Rounded edges
      },
      yaxis: {},
      // Remove legends
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
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
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-bold">{title ?? ""}</h1>
          <p className="text-muted text-sm pt-1">{description ?? ""}</p>
        </div>
        <div>
          <select
            onChange={(e) => {
              setYear(e.target.value);
            }}
            className="py-1 border-transparent text-sm bg-background rounded focus:border-primary focus:ring-primary"
          >
            {[
              new Date().getFullYear(),
              new Date().getFullYear() - 1,
              new Date().getFullYear() - 2,
              new Date().getFullYear() - 3,
              new Date().getFullYear() - 4,
              new Date().getFullYear() - 5,
              new Date().getFullYear() - 6,
            ].map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <Chart type="bar" options={config.options} series={config.series} />
    </div>
  );
};

export default HorizontalBarChart;
