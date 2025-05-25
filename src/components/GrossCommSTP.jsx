import React from "react";
import GenericChartECharts from "./GenericChart";
import useDashboardData from "../hook/useDashboardData";

const GrossCommSTP = () => {
  return (
    <GenericChartECharts
      title="Gross Commissions vs STP"
      seriesConfigs={[
        {
          label: "Gross Commissions",
          key: "grossCommissions",
          color: "#023e8a",
          type: "bar", // Equivalent of Highcharts column
          yAxis: 1,
          source: "mtd",
        },
        {
          label: "STP",
          key: "grossCommissionsstp",
          color: "#37366d",
          type: "line",
          yAxis: 1,
          source: "stp",
          stpFilterKey: "Gross Commissions",
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

export default GrossCommSTP;
