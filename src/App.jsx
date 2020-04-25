import React, {useContext} from 'react';
import './css/global.css';
import {Visualisation} from './components/Visualisation';
import {CaseFilterSlider} from './components/CaseFilterSlider';
import {filterData} from './helpers/filterData';
import data from './data/graph.json';
import {store} from './context/store';

const App = () => {
  const caseNum = useContext(store).state.caseNum;
  const {nodes, links} = filterData(data, caseNum);
  console.log(caseNum, nodes.length, links.length)
  return (
    <div className="app">
      <Visualisation nodes={nodes} links={links} />
      <CaseFilterSlider />
    </div>
  );
};

export default App;
