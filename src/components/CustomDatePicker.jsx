import React, { useState, useCallback, useMemo } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { setGlobalDate } from "../store/dataSlice";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());

  const MIN_DATE = useMemo(() => new Date("2024-01-01"), []);
  const MAX_DATE = useMemo(() => new Date(), []);

  const isWeekDay = useCallback((date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  }, []);

  const handleDateSubmit = useCallback(() => {
    if (!startDate) return;
    dispatch(setGlobalDate(format(startDate, "yyyy-MM-dd")));
  }, [dispatch, startDate]);

  return (
    <>
      <span>Select date</span>
      <DatePicker
        selected={startDate}
        onChange={setStartDate}
        filterDate={isWeekDay}
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
      />
      <button className="search-btn" onClick={handleDateSubmit}>
        Go
      </button>
    </>
  );
};

export default CustomDatePicker;
