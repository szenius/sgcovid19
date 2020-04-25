import React, {createContext, useReducer} from 'react';

export const SET_CASE_NUM = 'SET_CASE_NUM';

export const SET_SLIDER_START = 'SET_SLIDER_START';
export const SET_SLIDER_COMPLETE = 'SET_SLIDER_COMPLETE';

const initialState = {caseNum: 6157, slider: false};

export const store = createContext(initialState);
const {Provider} = store;

export const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SET_SLIDER_START:
        return {...state, slider: true};
      case SET_SLIDER_COMPLETE:
        return {...state, slider: false};
      case SET_CASE_NUM:
        return {...state, caseNum: action.payload.caseNum, realTimeCaseNum: action.payload.caseNum};
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{state, dispatch}}>{children}</Provider>;
};
