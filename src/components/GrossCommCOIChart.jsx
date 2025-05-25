import React from "react";
import GenericChartECharts from "./GenericChart";

const GrossCommCOIChartECharts = () => {
  return (
    <GenericChartECharts
      title="Gross Commissions & Cost of Income"
      seriesConfigs={[
        {
          label: "Gross Commissions",
          key: "grossCommissions",
          color: "#023e8a",
          type: "bar", // Equivalent of Highcharts column
          yAxis: 1,
          source: "mtd",
          dataLabels: {
            show: true,
          },
        },
        {
          label: "Cost of Income",
          key: "costOfIncome",
          color: "#00b4d8",
          type: "bar",
          yAxis: 1,
          source: "mtd",
          dataLabels: {
            show: true,
          },
        },
        {
          label: "COI % of Gross Commission",
          key: "percentageCOI",
          color: "#0077b6",
          type: "line", // ECharts equivalent of spline
          yAxis: 0,
          source: "mtd",
          tooltipSuffix: "",
          dataLabels: {
            show: true,
            formatter: "{c}%",
            position: "top",
          },
        },
      ]}
    />
  );
};

export default GrossCommCOIChartECharts;
