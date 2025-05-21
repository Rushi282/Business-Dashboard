import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const GrossCommCOI = () => {
  const options = {
    chart: {
      zooming: {
        type: "xy",
      },
    },
    title: {
      text: "Gross Commissions & Cost of Income",
      align: "center",
    },

    xAxis: [
      {
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
      },
    ],
    yAxis: [
      {
        // Primary yAxis
        labels: {
          enabled: false,
        },
        title: {
          text: null,
        },
      },
      {
        // Secondary yAxis
        labels: {
          enabled: false,
        },
        title: {
          text: null,
        },
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      align: "center",
      verticalAlign: "bottom",
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || // theme
        "rgba(255,255,255,0.25)",
    },
    series: [
      {
        name: "Gross Commissions",
        type: "column",
        yAxis: 1,
        data: [
          45.7, 37.0, 28.9, 17.1, 39.2, 18.9, 90.2, 78.5, 74.6, 18.7, 17.1,
          16.0,
        ],
        tooltip: {
          valueSuffix: "",
        },
        color: "#023e8a",
      },
      {
        name: "Cost of Income",
        type: "column",
        yAxis: 1,
        data: [
          40.7, 45.0, 30.9, 27.1, 30.2, 22.9, 75.2, 53.5, 65.6, 22.7, 36.1,
          33.0,
        ],
        tooltip: {
          valueSuffix: "",
        },
        color: "#00b4d8",
      },
      {
        name: "COI % of Gross Commission",
        type: "spline",
        data: [
          -11.4, -9.5, -14.2, 0.2, 7.0, 12.1, 13.5, 13.6, 8.2, -2.8, -12.0,
          -15.5,
        ],
        tooltip: {
          valueSuffix: " %",
        },
        color: "#00b4d8",
      },
    ],
  };
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default GrossCommCOI;
