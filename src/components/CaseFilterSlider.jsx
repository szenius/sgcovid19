import React, {useContext} from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import {store, SET_CASE_NUM} from '../context/store';

export const CaseFilterSlider = () => {
  const {state, dispatch} = useContext(store);
  const caseNum = state.caseNum;
  return (
    <div className="slider">
      <Slider
        min={0}
        max={12000}
        value={caseNum}
        onChange={(value) => {
          dispatch({type: SET_CASE_NUM, payload: {caseNum: value}});
        }}
      />
    </div>
  );
};
