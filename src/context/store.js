import React, {createContext, useReducer} from 'react';

export const SET_CASE_NUM = 'SET_CASE_NUM';

const initialState = {caseNum: 1000};

export const store = createContext(initialState);
const {Provider} = store;

export const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SET_CASE_NUM:
        return {...state, caseNum: action.payload.caseNum};
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{state, dispatch}}>{children}</Provider>;
};
