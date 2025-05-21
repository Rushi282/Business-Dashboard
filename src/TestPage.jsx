import React, { useEffect, useState } from "react";
import useDashboardData from "./hook/useDashboardData";
import { filterKeyData, filterDataByDate } from "./helper/filters";

export default function TestPage() {
  const { mtd, ytd, std, marketshare } = useDashboardData();
  const [monthlyData, setMonthlyData] = useState(null);

  useEffect(() => {
    if (mtd && mtd.length > 0) {
      const filteredData = filterDataByDate(mtd, new Date("2025-04-01")); // Assuming mtd is your raw data
      const grossCommissionsData = filterKeyData(
        filteredData,
        "grossCommissions"
      );
      const netRevenueData = filterKeyData(filteredData, "netRevenue");
      const percentageCOIData = filterKeyData(filteredData, "percentageCOI");

      console.log("grossCommissionsData:", grossCommissionsData);
      console.log("netRevenueData", netRevenueData);
      console.log("percentageCOIData", percentageCOIData);
      setMonthlyData(grossCommissionsData);
    }
  }, [mtd]);

  console.log("MTD:", mtd);
  console.log("YTD:", ytd);
  console.log("STD:", std);
  console.log("MARKETSHARE:", marketshare);

  return (
    <div>
      <h1>Dashboard Data</h1>
      <pre>{JSON.stringify({ mtd, ytd, std, marketshare }, null, 2)}</pre>

      <h2>Monthly Data (Gross Commissions)</h2>
      <pre>{JSON.stringify(monthlyData, null, 2)}</pre>
    </div>
  );
}
