import React from "react";

const FormattedCell = ({ value, disable = false }) => {
  if (disable) return <td className="disable-cell" />;

  const num = Number(value);
  if (isNaN(num)) return <td>-</td>;

  const formatted = Math.abs(num).toFixed(2);
  const isNegative = num < 0;

  return (
    <td className={isNegative ? "negative" : ""}>
      {isNegative ? `(${formatted})` : formatted}
    </td>
  );
};

export default FormattedCell;
