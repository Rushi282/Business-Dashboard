import "./App.css";
import CustomDatePicker from "./components/CustomDatePicker";
import FinancialsTable from "./components/FinancialsTable";
import GrossCommCOIChartECharts from "./components/GrossCommCOIChart";
import GrossNetChartECharts from "./components/GrossCommission";
import GrossCommSTP from "./components/GrossCommSTP";
import MarketShareActiveClients from "./components/MarketShareActiveClients";
import NetRevenueSTP from "./components/NetRevenueSTP";

function App() {
  return (
    <>
      <div className="container">
        <div className="row">
          <header className="head mt-1">
            <h3>Cash ET - Business KPI – EMEA</h3>
          </header>
          <header className="header mt-1">
            <CustomDatePicker />
          </header>
        </div>
        <div className="mt-1 content-box row">
          <div className="col-xl-8 border table-div">
            <FinancialsTable />
          </div>
          <div className="col-xl-4 border">
            <MarketShareActiveClients />
          </div>
          <div className="col-xl-8 border">
            <GrossNetChartECharts />
          </div>
          <div className="col-xl-4 border">
            <GrossCommSTP />
          </div>
          <div className="col-xl-8 border">
            <GrossCommCOIChartECharts />
          </div>
          <div className="col-xl-4 border">
            <NetRevenueSTP />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
