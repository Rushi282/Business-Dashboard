import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import processData from "./helper/processData";

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mtdRes, ytdRes, stpRes, marketshareRes] = await Promise.all([
          axios.get("/mock/mtd.json"),
          axios.get("/mock/ytd.json"),
          axios.get("/mock/stp.json"),
          axios.get("/mock/marketshare.json"),
          // axios.get("http://127.0.0.1:8080/calculate_mtd_emea"),
          // axios.get("http://127.0.0.1:8080/calculate_ytd_emea"),
          // axios.get("http://127.0.0.1:8080/stp"),
          // axios.get("http://127.0.0.1:8080/marketshare"),
        ]);

        processData("MTD", mtdRes.data, dispatch);
        processData("YTD", ytdRes.data, dispatch);
        processData("STP", stpRes.data, dispatch);
        processData("MARKETSHARE", marketshareRes.data, dispatch);
      } catch (error) {
        console.error("Failed to fetch API data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return <div>Loading...</div>;
};

export default MainPage;
