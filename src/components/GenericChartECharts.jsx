import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { MONTHS, filterDataByDate, filterKeyData } from "../helper/filters";
import getYearGroups from "../helper/graphelper";

const GenericChartECharts = ({
  title,
  dataSources = [],
  globalDate,
  seriesConfigs = [],
}) => {
  const [categories, setCategories] = useState([]);
  const [yearsPerCategory, setYearsPerCategory] = useState([]);
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    if (!dataSources.length) return;

    const allFilteredData = dataSources
      .filter(Array.isArray)
      .flatMap((data) => filterDataByDate(data, globalDate));

    if (!allFilteredData.length) return;

    const dataMap = {};
    for (const { key } of seriesConfigs) {
      dataMap[key] = filterKeyData(allFilteredData, key).reduce(
        (acc, entry) => {
          acc[entry.year] = entry;
          return acc;
        },
        {}
      );
    }

    const monthLabels = [];
    const yearLabels = [];
    const seriesValues = {};
    seriesConfigs.forEach(({ key }) => {
      seriesValues[key] = [];
    });

    const years = Array.from(new Set(allFilteredData.map((d) => d.year))).sort(
      (a, b) => a - b
    );

    years.forEach((year) => {
      MONTHS.forEach((month) => {
        const hasData = seriesConfigs.some(({ key }) => {
          const entry = dataMap[key][year];
          const val = entry?.data?.[month];
          return val != null && val !== 0;
        });

        if (hasData) {
          monthLabels.push(month);
          yearLabels.push(year);
          seriesConfigs.forEach(({ key }) => {
            const val = dataMap[key][year]?.data?.[month];
            seriesValues[key].push(val != null ? Math.abs(val) : 0);
          });
        }
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
      }) => {
        const baseSeries = {
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
            rotate: type === "bar" ? 90 : 90,
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
                    params.data + tooltipSuffix
                  )
              : undefined,
          },
        };
        return baseSeries;
      }
    );

    setSeriesData(builtSeries);
  }, [dataSources, globalDate, seriesConfigs]);

  const yearGroup = getYearGroups(categories, yearsPerCategory);

  // Configure multiple yAxes if required by any series
  const hasMultipleYAxes = seriesConfigs.some((s) => s.yAxis === 1);

  const yAxisConfig = hasMultipleYAxes
    ? [
        {
          type: "value",
          // name: "Percentage (%)",
          position: "left",
          axisLabel: {
            // formatter: "{value}%",
            show: false,
          },
          splitLine: { show: false },
        },
        {
          type: "value",
          // name: "Amount",
          position: "right",
          axisLabel: {
            // formatter: (val) => val.toLocaleString(),
            show: false,
          },
          splitLine: { show: false },
        },
      ]
    : [
        {
          type: "value",
          name: "",
          axisLabel: {
            formatter: (val) => val.toLocaleString(),
            // show: false,
          },
          splitLine: { show: true },
        },
      ];

  const option = {
    title: {
      text: title,
      left: "center",
      top: 20,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params) => {
        if (!params.length) return "";
        let tooltipText = params[0].axisValue + "<br/>";
        params.forEach((item) => {
          const suffix =
            seriesConfigs.find((s) => s.label === item.seriesName)
              ?.tooltipSuffix || "";
          tooltipText +=
            `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${item.color};"></span>` +
            `${item.seriesName}: ${item.data}${suffix}<br/>`;
        });
        return tooltipText;
      },
    },
    legend: {
      bottom: 20,
      data: seriesConfigs.map((s) => s.label),
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
        axisLabel: {
          fontSize: 11,
        },
      },
      {
        type: "category",
        data: yearGroup,
        position: "bottom",
        axisLabel: {
          fontWeight: "bold",
          fontSize: 13,
          margin: 30,
        },
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
