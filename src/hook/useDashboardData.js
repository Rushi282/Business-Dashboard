// src/hooks/useDashboardData.js
import { useSelector, shallowEqual } from "react-redux";

const useDashboardData = () => {
  return useSelector(
    (state) => ({
      mtd: state.data.mtd,
      ytd: state.data.ytd,
      stp: state.data.stp,
      marketShare: state.data.marketShare,
      globalDate: state.data.globalDate,
    }),
    shallowEqual
  );    
};

export default useDashboardData;
