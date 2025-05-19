import "./App.css";
import FinancialsTable from "./components/FinancialsTable";

function App() {
  return (
    <>
      <div className="container">
        {/* Header start */}
        <div className="row">
          <header className="head mt-1">
            <h3>Cahe ET - Business KPI – EMEA</h3>
          </header>
          <header className="header mt-1">
            <span>select date</span>
            <input type="date" class="date-input" />
            <button className="search-btn">Go</button>
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
          <div className="col-xl-4 border">Right Content</div>
          {/* Chart 3 end */}
        </div>

        {/* Content end */}
      </div>
    </>
  );
}

export default App;
