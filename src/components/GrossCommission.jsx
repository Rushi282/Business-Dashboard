import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const GrossCommission = () => {
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Gross Commissions & Net Revenue",
    },
    xAxis: {
      categories: [
        "USA",
        "China",
        "Brazil",
        "EU",
        "Argentina",
        "India",
        "Australia",
      ],
      crosshair: true,
      accessibility: {
        description: "Countries",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "1000 metric tons (MT)",
      },
    },
    tooltip: {
      valueSuffix: " (1000 MT)",
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Corn",
        data: [387749, 280000, 129000, 64300, 54000, 34300, 200000],
      },
      {
        name: "Wheat",
        data: [45321, 140000, 10000, 140500, 19500, 113500, 100000],
      },
    ],
  };
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default GrossCommission;
