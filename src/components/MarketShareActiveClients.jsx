import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import useDashboardData from "../hook/useDashboardData";
import { filterDataByDate, filterKeyData, MONTHS } from "../helper/filters";

const getMonthlyArray = (data, year) =>
  MONTHS.map((month) => {
    const value = data?.find((d) => d.year === year)?.data?.[month];
    return value != null ? parseFloat(value) : null;
  });

const MarketShareActiveClients = () => {
  const { marketShare, globalDate } = useDashboardData();

  const chartData = useMemo(() => {
    if (!marketShare?.length) return null;

    const filtered = filterDataByDate(marketShare, globalDate);
    const avgClient = filterKeyData(filtered, "averageClientMTD");
    const mShare = filterKeyData(filtered, "marketShareMTD");

    const years = [...new Set([...avgClient, ...mShare].map((d) => d.year))];

    const result = {};
    years.forEach((year) => {
      result[`avg${year}`] = getMonthlyArray(avgClient, year);
      result[`share${year}`] = getMonthlyArray(mShare, year);
    });

    return { years, data: result };
  }, [marketShare, globalDate]);

  const option = useMemo(() => {
    if (!chartData) return {};

    const { years, data } = chartData;

    const allActive = years.flatMap((year) =>
      data[`avg${year}`].filter((v) => v != null)
    );
    const minActive = Math.min(...allActive) * 0.9 || 0;
    const maxActive = Math.max(...allActive) * 1.1 || 100;

    const allShare = years.flatMap((year) =>
      data[`share${year}`].filter((v) => v != null)
    );
    const minShare = Math.min(...allShare) * 0.9 || 0;
    const maxShare = Math.max(...allShare) * 1.1 || 100;

    const series = [];
    const legendData = [];

    years.forEach((year) => {
      series.push(
        {
          name: `Active Client (${year})`,
          type: "bar",
          data: data[`avg${year}`],
          yAxisIndex: 0,
        },
        {
          name: `Market Share (${year})`,
          type: "line",
          data: data[`share${year}`],
          yAxisIndex: 1,
          smooth: true,
          showSymbol: false,
        }
      );
      legendData.push(`Active Client (${year})`, `Market Share (${year})`);
    });

    return {
      title: {
        text: "Market Share & Average Active Clients",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "cross" },
      },
      legend: {
        bottom: 10,
        data: legendData,
      },
      xAxis: {
        type: "category",
        data: MONTHS,
        axisTick: { show: false },
      },
      yAxis: [
        {
          type: "value",
          position: "left",
          min: minActive,
          max: maxActive,
          scale: true,
          splitLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false }, // optionally hide ticks
        },
        {
          type: "value",
          // Removed name to not show label on y-axis
          position: "right",
          min: minShare,
          max: maxShare,
          scale: true,
          splitLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false }, // optionally hide ticks
        },
      ],
      series,
      color: ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#f45b5b", "#8085e9"],
      grid: {
        top: 60,
        bottom: 80,
        left: 60,
        right: 60,
      },
    };
  }, [chartData]);

  return (
    <ReactECharts option={option} style={{ height: 400, width: "100%" }} />
  );
};

export default MarketShareActiveClients;
