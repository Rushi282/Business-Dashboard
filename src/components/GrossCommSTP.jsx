import React from "react";
import GenericChartECharts from "./GenericChart";

const GrossCommSTP = () => {
  return (
    <GenericChartECharts
      title="Gross Commissions vs STP"
      seriesConfigs={[
        {
          label: "Gross Commissions",
          key: "grossCommissions",
          color: "#023e8a",
          type: "bar",
          yAxis: 1,
          source: "mtd",
          dataLabels: {
            show: false,
          }
        },
        {
          label: "STP",
          key: "grossCommissionsstp",
          color: "#37366d",
          type: "line",
          yAxis: 0,
          source: "stp",
          stpFilterKey: "Gross Commissions",
          yAxis: 0,
          tooltipSuffix: "",
          dataLabels: {
            show: false,
            formatter: "{c}%",
            position: "top",
            fontSize: 1,
          },
        },
      ]}
    />
  );
};

export default GrossCommSTP;
