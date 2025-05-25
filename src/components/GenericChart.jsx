import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { MONTHS, filterDataByDate, filterKeyData } from "../helper/filters";
import getYearGroups from "../helper/graphelper";
import useDashboardData from "../hook/useDashboardData";

const GenericChartECharts = ({ title, seriesConfigs = [] }) => {
  const [categories, setCategories] = useState([]);
  const [yearsPerCategory, setYearsPerCategory] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const { mtd, stp, globalDate } = useDashboardData();

  useEffect(() => {
    if (!mtd?.length) return;

    const filteredMTDData = filterDataByDate(mtd, globalDate);
    const dataMap = {};

    // Map keys to their data sources
    seriesConfigs.forEach(({ key, source, stpFilterKey }) => {
      if (source === "mtd") {
        dataMap[key] = filterKeyData(filteredMTDData, key).reduce(
          (acc, entry) => {
            acc[entry.year] = entry;
            return acc;
          },
          {}
        );
      } else if (source === "stp") {
        const stpEntry = stp.find((s) => s.metric === stpFilterKey);
        dataMap[key] = stpEntry?.monthly || {};
      }
    });

    const seriesValues = Object.fromEntries(
      seriesConfigs.map(({ key }) => [key, []])
    );

    const monthLabels = [];
    const yearLabels = [];
    const years = [...new Set(filteredMTDData.map((d) => d.year))].sort();

    years.forEach((year) => {
      MONTHS.forEach((month) => {
        const hasData = seriesConfigs.some(({ key, source }) => {
          const val =
            source === "mtd"
              ? dataMap[key]?.[year]?.data?.[month]
              : dataMap[key]?.[month];
          return val != null && val !== 0;
        });

        if (!hasData) return;

        monthLabels.push(month);
        yearLabels.push(year);

        seriesConfigs.forEach(({ key, source }) => {
          let val = 0;
          if (source === "mtd") {
            val = dataMap[key]?.[year]?.data?.[month];
          } else if (source === "stp") {
            val = year === 2024 ? null : dataMap[key]?.[month];
          }
          seriesValues[key].push(val != null ? Math.abs(val) : null);
        });
      });
    });

    setCategories(monthLabels);
    setYearsPerCategory(yearLabels);

    const builtSeries = seriesConfigs.map(
      ({
        label,
        key,
        color,
        type = "bar",
        yAxis = 0,
        tooltipSuffix = "",
        dataLabels,
      }) => ({
        name: label,
        type,
        yAxisIndex: yAxis,
        data: seriesValues[key],
        itemStyle: { color },
        ...(type === "bar" && { barWidth: 12 }),
        smooth: type === "line",
        label: {
          show: true,
          position: type === "bar" ? "top" : "left",
          rotate: 90,
          offset: type === "bar" ? [8, 0] : [10, 20],
          fontSize: type === "bar" ? 10 : 12,
          fontWeight: type === "bar" ? "600" : "500",
          color: "#000",
          align: "center",
          verticalAlign: "middle",
          formatter: dataLabels?.formatter
            ? (params) =>
                dataLabels.formatter.replace(
                  "{c}",
                  `${params.data}${tooltipSuffix}`
                )
            : undefined,
        },
      })
    );

    setSeriesData(builtSeries);
  }, [mtd, stp, globalDate, seriesConfigs]);

  const yearGroup = getYearGroups(categories, yearsPerCategory);
  const hasMultipleYAxes = seriesConfigs.some(({ yAxis }) => yAxis === 1);

  const yAxisConfig = hasMultipleYAxes
    ? [
        {
          type: "value",
          position: "left",
          axisLabel: { show: false },
          splitLine: { show: false },
        },
        {
          type: "value",
          position: "right",
          axisLabel: { show: false },
          splitLine: { show: false },
        },
      ]
    : [
        {
          type: "value",
          axisLabel: { formatter: (val) => val.toLocaleString() },
          splitLine: { show: true },
        },
      ];

  const option = {
    title: { text: title, left: "center", top: 20 },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params) =>
        params.length
          ? `${params[0].axisValue}<br/>` +
            params
              .map((item) => {
                const suffix =
                  seriesConfigs.find((s) => s.label === item.seriesName)
                    ?.tooltipSuffix || "";
                return `
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${item.color};"></span>
                ${item.seriesName}: ${item.data}${suffix}<br/>`;
              })
              .join("")
          : "",
    },
    legend: {
      bottom: 20,
      data: seriesConfigs.map(({ label }) => label),
      itemGap: 15,
    },
    grid: {
      top: 60,
      left: "2%",
      right: "2%",
      bottom: 40,
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: categories,
        axisTick: { show: false },
        axisLabel: { fontSize: 11 },
      },
      {
        type: "category",
        data: yearGroup,
        position: "bottom",
        axisLabel: { fontWeight: "bold", fontSize: 13, margin: 30 },
        axisLine: { show: false },
        axisTick: { show: false },
      },
    ],
    yAxis: yAxisConfig,
    series: seriesData,
  };

  return (
    <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
  );
};

export default GenericChartECharts;
