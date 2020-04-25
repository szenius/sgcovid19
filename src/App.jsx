import React, {useContext, useState, useEffect} from 'react';
import './css/global.css';
import {Visualisation} from './components/Visualisation';
import {CaseFilterSlider} from './components/CaseFilterSlider';
import {filterData} from './helpers/filterData';
import data from './data/graph.json';
import {store} from './context/store';

const App = () => {
  const {caseNum, slider} = useContext(store).state;
  const [nodes, setNodes] = useState({});
  const [links, setLinks] = useState({});
  useEffect(() => {
    if (!slider) {
      const filteredData = filterData(data, caseNum);
      setNodes(filteredData.nodes);
      setLinks(filteredData.links);
    }
  }, [caseNum, slider]);
  return (
    <div className="app">
      <h2>COVID19 - Singapore</h2>
      <Visualisation nodes={nodes} links={links} />
      <CaseFilterSlider />
    </div>
  );
};

export default App;
