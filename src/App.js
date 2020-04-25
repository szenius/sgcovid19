import React from "react";
import "./css/global.css";
import { Visualisation } from "./components/Visualisation";
import { filterData } from "./helpers/filterData";
import data from "./data/graph.json";

function App() {
  const maxCaseNum = 5000; // TODO:
  const filteredData = filterData(data, maxCaseNum);
  return (
    <div className="app">
      <Visualisation data={filteredData} />
    </div>
  );
}

export default App;
