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
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      crosshair: true,
      accessibility: {
        description: "",
      },
    },
    yAxis: {
      labels: {
        enabled: false, // disables the y-axis values
      },
      title: {
        text: null, // hides the y-axis title if any
      },
    },
    tooltip: {
      valueSuffix: "",
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Gross Commissions",
        data: [
          387749, 280000, 129000, 64300, 54000, 34300, 200000, 387749, 280000,
          129000, 64300, 54000,
        ],
        color: "#023e8a",
      },
      {
        name: "Net Revenue",
        data: [
          45321, 140000, 10000, 140500, 19500, 113500, 100000, 45321, 140000,
          10000, 140500, 19500,
        ],
        color: "#0874e1",
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
