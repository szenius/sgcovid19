import React, {useContext} from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import {store, SET_CASE_NUM, SET_SLIDER_START, SET_SLIDER_COMPLETE} from '../context/store';

export const SLIDER_MIN = 1;
export const SLIDER_MAX = 3000;

export const CaseFilterSlider = () => {
  const {state, dispatch} = useContext(store);
  const caseNum = state.caseNum;
  return (
    <div className="slider">
      <Slider
        min={SLIDER_MIN}
        max={SLIDER_MAX}
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
      Displaying {caseNum} cases
    </div>
  );
};
