import React, {useContext} from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import {store, SET_CASE_NUM, SET_SLIDER_START, SET_SLIDER_COMPLETE} from '../context/store';

export const CaseFilterSlider = () => {
  const {state, dispatch} = useContext(store);
  const caseNum = state.caseNum;
  return (
    <div className="slider">
      <Slider
        min={0}
        max={12000}
        value={caseNum}
        onChangeStart={() => {
          dispatch({type: SET_SLIDER_START});
        }}
        onChange={(value) => {
          dispatch({type: SET_CASE_NUM, payload: {caseNum: value}});
        }}
        onChangeComplete={() => {
          dispatch({type: SET_SLIDER_COMPLETE});
        }}
      />
    </div>
  );
};
