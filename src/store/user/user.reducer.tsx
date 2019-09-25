// import { combineReducers } from "redux";

const initialState = {
  username: 'Subash Chandran'
} 

export interface User {
  username: string
}

const reducer = (state = initialState, action: any) => {
  return {...state, ...initialState};
}

export { reducer as UserReducer }
