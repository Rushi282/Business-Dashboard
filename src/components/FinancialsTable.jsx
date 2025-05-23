import React, { useEffect, useState } from "react";
import "../css/FinancialTable.css";
import useDashboardData from "../hook/useDashboardData";
import { filterDataByDate, filterKeyData, MONTHS } from "../helper/filters";
import FormattedCell from "./FormattedCell";

const metricConfig = [
  { key: "grossCommissions", label: "Gross Commissions" },
  { key: "netRevenue", label: "Net Revenues" },
  { key: "costOfIncome", label: "COI" },
  { key: "percentageCOI", label: "%COI", isPercentage: true },
];

const calculateYOY = function (current, previous) {
  current = Number(current);
  previous = Number(previous);

  if (!previous || previous === 0) return "N/A";

  return (Math.abs((current - previous) / previous) * 100).toFixed(2);
};

const extractMetricValues = (data, key, yearIndex, month) =>
  data?.[yearIndex]?.data?.[month] ?? 0;

const prepareMetricData = (
  mtd,
  ytd,
  stp,
  key,
  label,
  month,
  isPercentage = false
) => {
  const mtdData = filterKeyData(mtd, key);
  const ytdData = filterKeyData(ytd, key);

  const mtdVal2024 = extractMetricValues(mtdData, key, 0, month);
  const mtdVal2025 = extractMetricValues(mtdData, key, 1, month);
  const ytdVal2024 = extractMetricValues(ytdData, key, 0, month);
  const ytdVal2025 = extractMetricValues(ytdData, key, 1, month);

  const stpMetric = stp.find((m) => m.metric === label);
  const monthlyTarget = stpMetric?.monthly?.[month] ?? 0;

  return {
    key,
    label,
    mtd: {
      val24: mtdVal2024,
      val25: mtdVal2025,
      yoy: isPercentage
        ? Math.abs(Number(mtdVal2025) - Number(mtdVal2024)).toFixed(2)
        : calculateYOY(mtdVal2025, mtdVal2024),
      stp: isPercentage ? "" : monthlyTarget,
    },
    ytd: {
      val24: ytdVal2024,
      val25: ytdVal2025,
      yoy: isPercentage
        ? Math.abs(Number(ytdVal2025) - Number(ytdVal2024)).toFixed(2)
        : calculateYOY(ytdVal2025, ytdVal2024),
      stp: isPercentage ? "" : monthlyTarget,
    },
  };
};

const FinancialsTable = () => {
  const { mtd, ytd, stp, globalDate, marketShare } = useDashboardData();
  const [financials, setFinancials] = useState([]);
  const [fy2024Values, setFy2024Values] = useState({});
  const [stp2025Values, setStp2025Values] = useState({});
  const [marketShareData, setMarketShareData] = useState({});

  useEffect(() => {
    if (mtd?.length && stp) {
      const month = MONTHS[new Date(globalDate).getMonth()];
      const filteredMTD = filterDataByDate(mtd, globalDate);
      const filteredYTD = filterDataByDate(ytd, globalDate);
      const filteredMarketShare = filterDataByDate(marketShare, globalDate);

      const fyValues = {};
      const stpValues = {};

      metricConfig.forEach(({ key, label }) => {
        fyValues[key] = mtd[mtd.length - 1]?.[key] || 0;

        const stpMetric = stp.find((m) => m.metric === label);
        const stpValue = stpMetric?.monthly?.FY ?? 0;

        stpValues[key] =
          key === "percentageCOI"
            ? (stpValues["costOfIncome"] || 0) /
              (stpValues["grossCommissions"] || 1)
            : stpValue;
      });

      const metrics = metricConfig.map((metric) =>
        prepareMetricData(
          filteredMTD,
          filteredYTD,
          stp,
          metric.key,
          metric.label,
          month,
          metric.isPercentage
        )
      );

      // Adjust %COI (index 3) using COI/grossCommissions
      const gross = metrics[0];
      const coi = metrics[2];

      if (gross && coi) {
        metrics[3].mtd.stp = (coi.mtd.stp / gross.mtd.stp).toFixed(2);
        metrics[3].ytd.stp = (coi.ytd.stp / gross.ytd.stp).toFixed(2);
        stpValues["percentageCOI"] = (coi.ytd.stp / gross.ytd.stp) * 100;
      }
      const getMSVal = (yearIdx, prop) =>
        filteredMarketShare?.[yearIdx]?.data?.[month]?.[prop] ?? 0;

      const current = marketShare?.[marketShare.length - 1] ?? {};
      setMarketShareData({
        fy: {
          marketShare: current.marketShareMTD ?? "-",
          avgClient: current.averageClientMTD ?? "-",
        },
        mtd24: {
          marketShare: getMSVal(1, "marketShareMTD"),
          avgClient: getMSVal(1, "averageClientMTD"),
        },
        mtd25: {
          marketShare: getMSVal(0, "marketShareMTD"),
          avgClient: getMSVal(0, "averageClientMTD"),
        },
        ytd24: {
          marketShare: getMSVal(1, "marketShareYTD"),
          avgClient: getMSVal(1, "averageClientYTD"),
        },
        ytd25: {
          marketShare: getMSVal(0, "marketShareYTD"),
          avgClient: getMSVal(0, "averageClientYTD"),
        },
        yoy: {
          marketShareMTD: Math.abs(
            getMSVal(0, "marketShareMTD") - getMSVal(1, "marketShareMTD")
          ),
          marketShareYTD: Math.abs(
            getMSVal(0, "marketShareYTD") - getMSVal(1, "marketShareYTD")
          ),
          avgClientMTD: Math.abs(
            getMSVal(0, "averageClientMTD") - getMSVal(1, "averageClientMTD")
          ),
          avgClientYTD: Math.abs(
            getMSVal(0, "averageClientYTD") - getMSVal(1, "averageClientYTD")
          ),
        },
      });

      setFinancials(metrics);
      setFy2024Values(fyValues);
      setStp2025Values(stpValues);
    }
  }, [mtd, ytd, stp, globalDate, marketShare]);

  return (
    <table className="text-center f-table">
      <thead>
        <tr className="t-head">
          <th rowSpan={2} className="align-middle cross">
            Cash Electronic - EMEA
          </th>
          <th colSpan={2}>FINANCIALS</th>
          <th colSpan={4}>MTD</th>
          <th colSpan={4}>YTD</th>
        </tr>
        <tr className="sub-col">
          <th>FY 2024</th>
          <th>STP 25</th>
          <th>MTD 24</th>
          <th>MTD 25</th>
          <th>YoY</th>
          <th>v/s STP</th>
          <th>YTD 24</th>
          <th>YTD 25</th>
          <th>YoY</th>
          <th>v/s STP</th>
        </tr>
      </thead>
      <tbody>
        {financials.map(({ key, label, mtd, ytd }) => (
          <tr key={key}>
            <td>{label}</td>
            <FormattedCell value={fy2024Values[key]} />
            <FormattedCell value={stp2025Values[key]?.toFixed?.(2)} />
            <FormattedCell value={mtd.val24} />
            <FormattedCell value={mtd.val25} />
            <FormattedCell value={mtd.yoy} />
            <FormattedCell value={mtd.stp} />
            <FormattedCell value={ytd.val24} />
            <FormattedCell value={ytd.val25} />
            <FormattedCell value={ytd.yoy} />
            <FormattedCell value={ytd.stp} />
          </tr>
        ))}
        <tr>
          <td>%Market Share</td>
          <FormattedCell value={marketShareData.fy?.marketShare} />
          <FormattedCell disable />
          <FormattedCell value={marketShareData.mtd24?.marketShare} />
          <FormattedCell value={marketShareData.mtd25?.marketShare} />
          <FormattedCell
            value={marketShareData.yoy?.marketShareMTD?.toFixed?.(2)}
          />
          <FormattedCell disable />
          <FormattedCell value={marketShareData.ytd24?.marketShare} />
          <FormattedCell value={marketShareData.ytd25?.marketShare} />
          <FormattedCell
            value={marketShareData.yoy?.marketShareYTD?.toFixed?.(2)}
          />
          <FormattedCell disable />
        </tr>

        <tr>
          <td>#Avg. Daily Clients</td>
          <FormattedCell value={marketShareData.fy?.avgClient} />
          <FormattedCell disable />
          <FormattedCell value={marketShareData.mtd24?.avgClient} />
          <FormattedCell value={marketShareData.mtd25?.avgClient} />
          <FormattedCell
            value={marketShareData.yoy?.avgClientMTD?.toFixed?.(2)}
          />
          <FormattedCell disable />
          <FormattedCell value={marketShareData.ytd24?.avgClient} />
          <FormattedCell value={marketShareData.ytd25?.avgClient} />
          <FormattedCell
            value={marketShareData.yoy?.avgClientYTD?.toFixed?.(2)}
          />
          <FormattedCell disable />
        </tr>
      </tbody>
    </table>
  );
};

export default FinancialsTable;
