import React from "react";
import GenericChart from "./GenericChart";
import useDashboardData from "../hook/useDashboardData";

const GrossCommCOIChart = () => {
  const { mtd, globalDate } = useDashboardData();

  // Pass mtd as the only data source in an array
  return (
    <GenericChart
      title="Gross Commissions & Cost of Income"
      dataSources={[mtd]} // always an array of data arrays
      globalDate={globalDate}
      seriesConfigs={[
        {
          label: "Gross Commissions",
          key: "grossCommissions",
          color: "#023e8a",
          type: "column",
          yAxis: 1,
        },
        {
          label: "Cost of Income",
          key: "costOfIncome",
          color: "#00b4d8",
          type: "column",
          yAxis: 1,
        },
        {
          label: "COI % of Gross Commission",
          key: "percentageCOI",
          color: "#0077b6",
          type: "spline",
          yAxis: 0,
          tooltipSuffix: " %",
          dataLabels: {
            enabled: true,
            format: "{point.y}%",
            y: -10,
          },
        },
      ]}
    />
  );
};

export default GrossCommCOIChart;
