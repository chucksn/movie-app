import { currentPageReducer } from "./currentPageReducer";
import { searchInfoReducer } from "./searchInfoReducer";
import { returnedPageReducer } from "./returnedPageReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  currentPg: currentPageReducer,
  search: searchInfoReducer,
  returnedPg: returnedPageReducer,
});
