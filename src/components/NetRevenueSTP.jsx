import React from "react";
import GenericChartECharts from "./GenericChart";
import useDashboardData from "../hook/useDashboardData";

const NetRevenueSTP = () => {
  return (
    <GenericChartECharts
      title="Net Revenue vs STP"
      seriesConfigs={[
        {
          label: "Net Revenue",
          key: "netRevenue",
          color: "#0874e1",
          type: "bar",
          yAxis: 1,
          source: "mtd",
        },
        {
          label: "STP",
          key: "netRevenuestp",
          color: "#37366d",
          type: "line",
          yAxis: 1,
          source: "stp",
          stpFilterKey: "Net Revenues",
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

export default NetRevenueSTP;
