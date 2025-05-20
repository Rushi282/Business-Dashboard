import { format } from "date-fns";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = () => {
  const MIN_DATE = new Date("2024-01-01");
  const MAX_DATE = new Date(); //current date
  const [startDate, setStartDate] = useState(null);

  const isWeekDay = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const fetchDate = () => {
    console.log(startDate);
    var selectedDate = format(startDate, "yyyy-MM-dd");
    console.log(selectedDate);
  };

  return (
    <>
      <span>select date</span>
      {/* <input type="date" class="date-input" min={"2024-01-01"} /> */}
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        filterDate={isWeekDay}
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
      />
      <button className="search-btn" onClick={fetchDate}>
        Go
      </button>
    </>
  );
};

export default CustomDatePicker;
