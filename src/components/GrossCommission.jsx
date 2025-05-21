import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useDashboardData from "../hook/useDashboardData";
import { filterDataByDate, filterKeyData, MONTHS } from "../helper/filters";
import getYearGroups from "../helper/graphelper";

const GrossCommission = () => {
  const { mtd, globalDate } = useDashboardData();
  const [categories, setCategories] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [yearsPerCategory, setYearsPerCategory] = useState([]);

  useEffect(() => {
    if (!mtd || mtd.length === 0) return;

    const filteredData = filterDataByDate(mtd, globalDate);
    const grossCommissionsData = filterKeyData(
      filteredData,
      "grossCommissions"
    );
    const netRevenueData = filterKeyData(filteredData, "netRevenue");

    const cat = [];
    const yearLabels = [];
    const grossValues = [];
    const netValues = [];

    grossCommissionsData.forEach((entry) => {
      const year = entry.year;
      MONTHS.forEach((month) => {
        const grossVal = entry.data?.[month];
        const netVal = netRevenueData.find((d) => d.year === year)?.data?.[
          month
        ];

        if (
          (grossVal != null && grossVal !== 0) ||
          (netVal != null && netVal !== 0)
        ) {
          cat.push(month); // only month names shown on top row
          yearLabels.push(year); // separate array to track years per index
          grossValues.push(grossVal ?? 0);
          netValues.push(netVal ?? 0);
        }
      });
    });

    setCategories(cat);
    setYearsPerCategory(yearLabels);
    console.log("jabiin::::::", getYearGroups(categories, yearsPerCategory));
    setSeriesData([
      {
        name: "Gross Commissions",
        data: grossValues,
        color: "#023e8a",
      },
      {
        name: "Net Revenue",
        data: netValues,
        color: "#0874e1",
      },
    ]);
  }, [mtd, globalDate]);

  const options = {
    chart: { type: "column" },
    title: { text: "Gross Commissions and Net Revenue" },
    xAxis: [
      {
        categories: categories,
        labels: {
          rotation: 0,
          style: { fontSize: "12px" },
        },
        lineWidth: 1,
        tickLength: 0,
      },
      {
        categories: getYearGroups(categories, yearsPerCategory),
        linkedTo: 0,
        labels: {
          y: 30,
          style: { fontWeight: "bold", fontSize: "13px" },
        },
        lineWidth: 0,
        tickLength: 0,
        offset: 20,
      },
    ],

    yAxis: {
      labels: { enabled: false },
      title: { text: null },
    },
    tooltip: {
      shared: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.1,
        groupPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: seriesData,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default GrossCommission;
