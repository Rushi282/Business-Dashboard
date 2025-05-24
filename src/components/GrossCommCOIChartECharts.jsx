import React from "react";
import GenericChartECharts from "./GenericChartECharts";
import useDashboardData from "../hook/useDashboardData";

const GrossCommCOIChartECharts = () => {
  const { mtd, globalDate } = useDashboardData();

  return (
    <GenericChartECharts
      title="Gross Commissions & Cost of Income"
      dataSources={[mtd]}
      globalDate={globalDate}
      seriesConfigs={[
        {
          label: "Gross Commissions",
          key: "grossCommissions",
          color: "#023e8a",
          type: "bar", // Equivalent of Highcharts column
          yAxis: 1,
        },
        {
          label: "Cost of Income",
          key: "costOfIncome",
          color: "#00b4d8",
          type: "bar",
          yAxis: 1,
        },
        {
          label: "COI % of Gross Commission",
          key: "percentageCOI",
          color: "#0077b6",
          type: "line", // ECharts equivalent of spline
          yAxis: 0,
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
