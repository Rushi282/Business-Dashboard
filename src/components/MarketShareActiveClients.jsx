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
      },
      yAxis: [
        {
          type: "value",
          name: "Active Clients",
          position: "left",
        },
        {
          type: "value",
          name: "Market Share",
          position: "right",
          axisLabel: { formatter: "{value} %" },
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

  return <ReactECharts option={option} style={{ height: 400 }} />;
};

export default MarketShareActiveClients;
