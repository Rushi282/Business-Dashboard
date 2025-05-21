import { setMTD, setYTD, setSTD, setMarketShare } from "../store/dataSlice";

const KEY_MAPPINGS = {
  MTD: {
    "Business Date": "businessDate",
    "Fees and Comm MTD Electronic EMEA": "grossCommissions",
    "Formal MTD Balance Electronic EMEA": "netRevenue",
    "COI Electronic EMEA": "costOfIncome",
    "COI/Rev EMEA(%)": "percentageCOI",
  },
  YTD: {
    "Business Date": "businessDate",
    "Fees and Comm YTD Electronic EMEA": "grossCommissions",
    "Formal YTD Balance Electronic EMEA": "netRevenue",
    "COI Electronic EMEA": "costOfIncome",
    "COI/Rev (%)": "percentageCOI",
  },
  MARKETSHARE: {
    "Business Date": "businessDate",
    DeskID: "deskID",
    MarketShareMTD: "marketShareMTD",
    MarketShareYTD: "marketShareYTD",
    AverageClientMTD: "averageClientMTD",
    AverageClientYTD: "averageClientYTD",
  },
};

// Constants for filtering
const MIN_VALID_YEAR = 2024;
const TARGET_DESK_ID = "Electronic EMEA";

const transformRow = (row, mapping) =>
  Object.entries(mapping).reduce((acc, [sourceKey, targetKey]) => {
    let value = row[sourceKey];

    if (value === undefined) {
      console.warn(`Missing key: "${sourceKey}"`);
      acc[targetKey] = null;
      return acc;
    }

    if (typeof value === "string" && value.includes("%")) {
      value = parseFloat(value.replace("%", "")) || 0;
    }

    acc[targetKey] = value;
    return acc;
  }, {});

//STD Processing Logic
const processSTD = (rawData) => {
  return rawData
    .filter((row) => row.C1 === "Electronic EMEA")
    .map((row) => ({
      metric: row.C3,
      monthly: Object.entries(row)
        .filter(([key]) => /^[A-Z][a-z]{2}\n?$|^FY$/.test(key))
        .reduce((months, [monthKey, val]) => {
          const cleanKey = monthKey.replace(/\n/g, "");
          const parsed = parseFloat(val);
          months[cleanKey] = isNaN(parsed) ? 0 : parseFloat(parsed.toFixed(2));
          return months;
        }, {}),
    }));
};

// Main Dispatcher
const processData = (type, rawData, dispatch) => {
  if (!Array.isArray(rawData) || rawData.length === 0) {
    console.warn(`${type} data is empty or invalid.`);
    return;
  }

  if (type === "STD") {
    const stdData = processSTD(rawData);
    dispatch(setSTD(stdData));
    return;
  }

  const mapping = KEY_MAPPINGS[type];
  if (!mapping) {
    console.warn(`Unsupported data type: ${type}`);
    return;
  }

  const filteredData = rawData
    .filter((row) => {
      const date = new Date(row["Business Date"]);
      const isValidDate = !isNaN(date) && date.getFullYear() >= MIN_VALID_YEAR;

      const deskCheck = !("DeskID" in row) || row.DeskID === TARGET_DESK_ID;

      return isValidDate && deskCheck;
    })
    .map((row) => transformRow(row, mapping));

  if (filteredData.length === 0) {
    console.warn(`No valid ${type} entries with Business Date >= 2024`);
    return;
  }

  const actionMap = {
    MTD: setMTD,
    YTD: setYTD,
    MARKETSHARE: setMarketShare,
  };

  dispatch(actionMap[type](filteredData));
};

export default processData;
