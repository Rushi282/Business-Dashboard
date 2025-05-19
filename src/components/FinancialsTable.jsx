import React from "react";
import "../css/FinancialTable.css";

const FinancialsTable = () => {
  return (
    <>
      <table className="text-center f-table">
        <thead>
          <tr className="t-head">
            <th rowSpan="2" className="align-middle cross">
              Cash Electronic - EMEA
            </th>
            <th colSpan="2">FINANCIALS</th>
            <th colSpan="4">MTD</th>
            <th colSpan="4">YTD</th>
          </tr>
          <tr className="sub-col">
            <th>FY 2024</th>
            <th>STP 25</th>
            <th>MTD 24</th>
            <th>MTD 25</th>
            <th>YoY</th>
            <th>v/s STP</th>
            <th>YTD 24</th>
            <th>YTD 25</th>
            <th>YoY</th>
            <th>v/s STP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gross Revenues</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Net Revenues</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Cost of Income</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>%COI</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr className="market-share-row">
            <td>%Market Share</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>#Avg. Daily Clients</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default FinancialsTable;
