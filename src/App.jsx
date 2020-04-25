import React from 'react';
import './css/global.css';
import {Visualisation} from './components/Visualisation';
import {filterData} from './helpers/filterData';
import data from './data/graph.json';

function App() {
  const maxCaseNum = 5000; // TODO:
  const {nodes, links} = filterData(data, maxCaseNum);
  return (
    <div className="app">
      <Visualisation nodes={nodes} links={links} />
    </div>
  );
}

export default App;
