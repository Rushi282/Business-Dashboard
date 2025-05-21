import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import processData from "./helper/processData";

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mtdRes, ytdRes, stdRes, marketshareRes] = await Promise.all([
          axios.get("/mock/mtd.json"),
          axios.get("/mock/ytd.json"),
          axios.get("/mock/std.json"),
          axios.get("/mock/marketshare.json"),
        ]);

        processData("MTD", mtdRes.data, dispatch);
        processData("YTD", ytdRes.data, dispatch);
        processData("STD", stdRes.data, dispatch);
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
