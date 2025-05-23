import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useDashboardData from "../hook/useDashboardData"; // same hook
import { filterDataByDate, filterKeyData, MONTHS } from "../helper/filters";
import getYearGroups from "../helper/graphelper";

const GrossCommCOI = () => {
  const { mtd, globalDate } = useDashboardData();
  const [categories, setCategories] = useState([]);
  const [yearsPerCategory, setYearsPerCategory] = useState([]);
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    if (!mtd || mtd.length === 0) return;

    const filteredData = filterDataByDate(mtd, globalDate);

    // Get each data set filtered by key
    const grossCommissionsData = filterKeyData(
      filteredData,
      "grossCommissions"
    );
    const costOfIncomeData = filterKeyData(filteredData, "costOfIncome");
    const percentageCOIData = filterKeyData(filteredData, "percentageCOI");
    const cat = [];
    const yearLabels = [];
    const grossValues = [];
    const costValues = [];
    const percentageValues = [];

    grossCommissionsData.forEach((entry) => {
      const year = entry.year;
      MONTHS.forEach((month) => {
        const grossValRaw = entry.data?.[month];
        const costValRaw = costOfIncomeData.find((d) => d.year === year)
          ?.data?.[month];
        const percValRaw = percentageCOIData.find((d) => d.year === year)
          ?.data?.[month];

        const grossVal = grossValRaw != null ? Math.abs(grossValRaw) : 0;
        const costVal = costValRaw != null ? Math.abs(costValRaw) : 0;
        const percVal = percValRaw != null ? Math.abs(percValRaw) : 0;

        if (grossVal !== 0 || costVal !== 0 || percVal !== 0) {
          cat.push(month);
          yearLabels.push(year);
          grossValues.push(grossVal);
          costValues.push(costVal);
          percentageValues.push(percVal);
        }
      });
    });

    setCategories(cat);
    setYearsPerCategory(yearLabels);

    setSeriesData([
      {
        name: "Gross Commissions",
        type: "column",
        yAxis: 1,
        data: grossValues,
        color: "#023e8a",
        tooltip: { valueSuffix: "" },
        dataLabels: {
          enabled: true,
          format: "{point.y:f}",
          rotation: -90,
          align: "right",
          x: 5, // Fine-tune X position
          y: 4,
        },
      },
      {
        name: "Cost of Income",
        type: "column",
        yAxis: 1,
        data: costValues,
        color: "#00b4d8",
        tooltip: { valueSuffix: "" },
        dataLabels: {
          enabled: true,
          format: "{point.y:f}",
          rotation: -90,
          align: "right",
          x: 5, // Fine-tune X position
          y: 4,
        },
      },
      {
        name: "COI % of Gross Commission",
        type: "spline",
        data: percentageValues,
        color: "#0077b6",
        tooltip: { valueSuffix: " %" },
        dataLabels: {
          enabled: true,
          format: "{point.y}%",
          y: -10, // Adjust label position if needed
        },
      },
    ]);
  }, [mtd, globalDate]);

  const options = {
    chart: { zooming: { type: "xy" } },
    title: { text: "Gross Commissions & Cost of Income", align: "center" },
    xAxis: [
      {
        categories,
        crosshair: true,
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
    yAxis: [
      {
        labels: { enabled: false },
        title: { text: null },
      },
      {
        labels: { enabled: false },
        title: { text: null },
        opposite: true,
        min: 0,
      },
    ],
    tooltip: { shared: true },
    legend: {
      align: "center",
      verticalAlign: "bottom",
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor ||
        "rgba(255,255,255,0.25)",
    },
    plotOptions: {
      column: {
        pointPadding: 0.1,
        groupPadding: 0.2,
        borderWidth: 0,
      },
      series: {},
    },
    series: seriesData,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default GrossCommCOI;
