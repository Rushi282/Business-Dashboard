import React from "react";
import GenericChartECharts from "./GenericChartECharts";
import useDashboardData from "../hook/useDashboardData";

const GrossNetChartECharts = () => {
  const { mtd, globalDate } = useDashboardData();

  return (
    <GenericChartECharts
      title="Gross Commissions and Net Revenue"
      dataSources={[mtd]}
      globalDate={globalDate}
      seriesConfigs={[
        {
          label: "Gross Commissions",
          key: "grossCommissions",
          color: "#023e8a",
          type: "bar", // ECharts equivalent of Highcharts "column"
          yAxis: 1,
        },
        {
          label: "Net Revenue",
          key: "netRevenue",
          color: "#0874e1",
          type: "bar",
          yAxis: 1,
        },
      ]}
    />
  );
};

export default GrossNetChartECharts;
