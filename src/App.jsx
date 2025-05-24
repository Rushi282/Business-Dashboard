import "./App.css";
import CustomDatePicker from "./components/CustomDatePicker";
import FinancialsTable from "./components/FinancialsTable";
import GrossCommCOI from "./components/GrossCommCOI";
import GrossCommCOIChartECharts from "./components/GrossCommCOIChartECharts";
import GrossCommission from "./components/GrossCommission";
import GrossNetChartECharts from "./components/GrossCommissionEcharts";
import GrossCommSTP from "./components/GrossCommSTP";
import MarketShareActiveClients from "./components/MarketShareActiveClients";
import NetRevenueSTP from "./components/NetRevenueSTP";

function App() {
  return (
    <>
      <div className="container">
        {/* Header start */}
        <div className="row">
          <header className="head mt-1">
            <h3>Cash ET - Business KPI – EMEA</h3>
          </header>
          <header className="header mt-1">
            <CustomDatePicker />
          </header>
        </div>
        {/* Header end */}
        {/* Content start */}
        <div className="mt-1 content-box row">
          {/* Table start */}
          <div className="col-xl-8 border table-div">
            <FinancialsTable />
          </div>
          {/* Table end */}
          {/* Chart 3 start */}
          <div className="col-xl-4 border">
            <MarketShareActiveClients />
          </div>
          {/* Chart 3 end */}
          {/* Chart 1 start */}
          <div className="col-xl-8 border">
            {/* <GrossCommission /> */}
            <GrossNetChartECharts />
          </div>
          {/* Chart 1 end */}
          {/* Chart 4 start */}
          <div className="col-xl-4 border">
            <GrossCommSTP />
          </div>
          {/* Chart 4 end */}
          {/* Chart 2 start */}
          <div className="col-xl-8 border">
            {/* <GrossCommCOI /> */}
            <GrossCommCOIChartECharts />
          </div>
          {/* Chart 2 end */}
          {/* Chart 5 start */}
          <div className="col-xl-4 border">
            <NetRevenueSTP />
          </div>
          {/* Chart 5 end */}
        </div>
        {/* Content end */}
      </div>
    </>
  );
}

export default App;
