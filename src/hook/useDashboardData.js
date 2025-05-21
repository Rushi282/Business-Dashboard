// src/hooks/useDashboardData.js
import { useSelector, shallowEqual } from "react-redux";

const useDashboardData = () => {
  return useSelector(
    (state) => ({
      mtd: state.data.mtd,
      ytd: state.data.ytd,
      std: state.data.std,
      marketshare: state.data.marketshare,
      globalDate: state.data.globalDate,
    }),
    shallowEqual
  );    
};

export default useDashboardData;
