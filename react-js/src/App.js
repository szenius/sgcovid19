import React from "react";
import "./global.css";
import { Visualisation } from "./Visualisation";
import { filterData } from "./dataHelpers";
import data from "./data/graph.json";

function App() {
  const maxCaseNum = 1000; // TODO:
  const filteredData = filterData(data, maxCaseNum);
  return (
    <div className="app">
      <Visualisation data={filteredData} />
    </div>
  );
}

export default App;
