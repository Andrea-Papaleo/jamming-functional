import { combineReducers } from "redux";
import { dataSlice } from "./dataSlice";

export const rootReducer = combineReducers({
  data: dataSlice.reducer,
});
