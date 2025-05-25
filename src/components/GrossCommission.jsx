import React from "react";
import GenericChartECharts from "./GenericChart";

const GrossNetChartECharts = () => {
  return (
    <GenericChartECharts
      title="Gross Commissions and Net Revenue"
      seriesConfigs={[
        {
          label: "Gross Commissions",
          key: "grossCommissions",
          color: "#023e8a",
          type: "bar", // ECharts equivalent of Highcharts "column"
          yAxis: 1,
          source: "mtd",
        },
        {
          label: "Net Revenue",
          key: "netRevenue",
          color: "#0874e1",
          type: "bar",
          yAxis: 1,
          source: "mtd",
        },
      ]}
    />
  );
};

export default GrossNetChartECharts;
