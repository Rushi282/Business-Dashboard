import React from "react";
import GenericChart from "./GenericChart";
import useDashboardData from "../hook/useDashboardData";

const GrossNetChart = () => {
  const { mtd, globalDate } = useDashboardData();
  return (
    <GenericChart
      title="Gross Commissions and Net Revenue"
      dataSources={[mtd]} // or use combinedData if you want both mtd and ytd together
      globalDate={globalDate}
      seriesConfigs={[
        {
          label: "Gross Commissions",
          key: "grossCommissions",
          color: "#023e8a",
          type: "column", // bar chart
        },
        {
          label: "Net Revenue",
          key: "netRevenue",
          color: "#0874e1",
          type: "column", // line chart for variation
        },
      ]}
    />
  );
};

export default GrossNetChart;
