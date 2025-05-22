export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const filterDataByDate = (data, customDate = new Date()) => {
  if (!(customDate instanceof Date)) {
    customDate = new Date(customDate);
  }
  const targetDateStr = customDate.toDateString();
  const targetYear = customDate.getFullYear();
  const targetMonth = customDate.getMonth();

  // Group entries by year and month
  const groupedByYearMonth = new Map();

  for (const entry of data) {
    const date = new Date(entry.businessDate);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    if (!groupedByYearMonth.has(key)) {
      groupedByYearMonth.set(key, []);
    }
    groupedByYearMonth.get(key).push(entry);
  }

  // Sort each group by ascending date (once)
  for (const entries of groupedByYearMonth.values()) {
    entries.sort((a, b) => new Date(a.businessDate).getTime() - new Date(b.businessDate).getTime());
  }

  // Get working-day index for the selected customDate
  const currentMonthKey = `${targetYear}-${targetMonth}`;
  const currentMonthEntries = groupedByYearMonth.get(currentMonthKey) || [];

  const workingDayIndex = currentMonthEntries.findIndex(
    (entry) => new Date(entry.businessDate).toDateString() === targetDateStr
  );

  const fallbackIndex = workingDayIndex >= 0 ? workingDayIndex : Math.max(
    currentMonthEntries.findIndex(e => new Date(e.businessDate) > customDate) - 1,
    0
  );

  const selectedIndex = fallbackIndex >= 0 ? fallbackIndex : 0;

  // Organize result by year and month
  const allYears = Array.from(new Set(data.map((e) => new Date(e.businessDate).getFullYear()))).sort((a, b) => b - a);
  const result = [];

  for (const year of allYears) {
    const monthlyResult = {};
    let hasValidData = false;

    for (let monthIndex = 0; monthIndex < MONTHS.length; monthIndex++) {
      const key = `${year}-${monthIndex}`;
      const entries = groupedByYearMonth.get(key) || [];

      let entry = null;
      for (let i = selectedIndex; i >= 0; i--) {
        if (entries[i]) {
          entry = entries[i];
          break;
        }
      }

      monthlyResult[MONTHS[monthIndex]] = entry ?? null;
      if (entry) hasValidData = true;
    }

    if (hasValidData) {
      result.push({ year, data: monthlyResult });
    }
  }

  return result;
};


export const filterKeyData = (filteredData, dataKey) =>
  filteredData
    .map(({ year, data }) => ({
      year,
      data: Object.fromEntries(
        MONTHS.map((month) => [month, data[month]?.[dataKey] ?? null])
      ),
    }))
    .sort((a, b) => a.year - b.year);


