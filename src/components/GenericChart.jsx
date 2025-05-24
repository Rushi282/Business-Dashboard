import React, { useEffect, useState, useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { MONTHS, filterDataByDate, filterKeyData } from "../helper/filters";
import getYearGroups from "../helper/graphelper";

const defaultDataLabels = (type) => ({
  enabled: true,
  format: type === "spline" ? "{point.y}%" : "{point.y:f}",
  rotation: type === "column" ? -90 : 0,
  align: type === "column" ? "right" : "center",
  verticalAlign: type === "column" ? undefined : "bottom",
  x: type === "column" ? 5 : 0,
  y: type === "column" ? 4 : 0,
  allowOverlap: false,
  zIndex: type === "spline" ? 10 : undefined,
  style: {
    fontSize: "10px",
    fontWeight: type === "spline" ? "bold" : "normal",
    textOutline: "none",
    color: "#000",
  },
});

const GenericChart = ({
  title,
  dataSources = [],
  globalDate,
  seriesConfigs = [],
  customOptions = {},
}) => {
  const [categories, setCategories] = useState([]);
  const [yearsPerCategory, setYearsPerCategory] = useState([]);
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    if (!dataSources.length) return;

    // Filter all data sources by date and flatten
    const allFilteredData = dataSources
      .filter(Array.isArray)
      .flatMap((data) => filterDataByDate(data, globalDate));

    if (!allFilteredData.length) return;

    // Prebuild map: { key -> { year -> dataEntry } }
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

    // Sort all years ascending
    const years = Array.from(new Set(allFilteredData.map((d) => d.year))).sort(
      (a, b) => a - b
    );

    years.forEach((year) => {
      MONTHS.forEach((month) => {
        // Check if any series has non-zero value for this year/month
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

    // Build series for Highcharts
    setSeriesData(
      seriesConfigs.map(
        ({
          label,
          key,
          color,
          type = "column",
          yAxis = 0,
          dataLabels,
          tooltipSuffix,
          ...rest
        }) => ({
          name: label,
          data: seriesValues[key],
          color,
          type,
          yAxis,
          dataLabels: dataLabels ?? defaultDataLabels(type),
          tooltip: tooltipSuffix ? { valueSuffix: tooltipSuffix } : undefined,
          ...rest,
        })
      )
    );
  }, [dataSources, globalDate, seriesConfigs]);

  const hasSecondYAxis = useMemo(
    () => seriesData.some((s) => s.yAxis === 1),
    [seriesData]
  );

  const baseOptions = useMemo(
    () => ({
      chart: { zooming: { type: "xy" } },
      title: { text: title, align: "center" },
      xAxis: [
        {
          categories,
          crosshair: true,
        },
        {
          categories: getYearGroups(categories, yearsPerCategory),
          linkedTo: 0,
          labels: { y: 30, style: { fontWeight: "bold", fontSize: "13px" } },
          lineWidth: 0,
          tickLength: 0,
          offset: 20,
        },
      ],
      yAxis: hasSecondYAxis
        ? [
            { labels: { enabled: false }, title: { text: null } },
            {
              labels: { enabled: false },
              title: { text: null },
              opposite: true,
              min: 0,
            },
          ]
        : [{ labels: { enabled: false }, title: { text: null } }],
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
          dataLabels: defaultDataLabels("column"),
        },
        bar: { dataLabels: defaultDataLabels("bar") },
        line: { dataLabels: defaultDataLabels("line") },
        spline: { dataLabels: defaultDataLabels("spline") },
      },
      series: seriesData,
    }),
    [title, categories, yearsPerCategory, hasSecondYAxis, seriesData]
  );

  const options = { ...baseOptions, ...customOptions };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default GenericChart;
