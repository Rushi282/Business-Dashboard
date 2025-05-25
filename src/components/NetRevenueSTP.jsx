import React from "react";
import GenericChartECharts from "./GenericChart";

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
          dataLabels: {
            show: false,
          }
        },
        {
          label: "STP",
          key: "netRevenuestp",
          color: "#37366d",
          type: "line",
          source: "stp",
          stpFilterKey: "Net Revenues",
          yAxis: 0,
          tooltipSuffix: "",
          dataLabels: {
            show: false ,
            formatter: "{c}%",
            position: "top",
          },
        },
      ]}
    />
  );
};

export default NetRevenueSTP;
