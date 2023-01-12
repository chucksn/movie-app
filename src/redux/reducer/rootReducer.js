import { currentPageReducer } from "./currentPageReducer";
import { searchInfoReducer } from "./searchInfoReducer";
import { returnedPageReducer } from "./returnedPageReducer";
import { searchToggleReducer } from "./searchToggleReducer";
import { combineReducers } from "redux";
import { cardClickedReducer } from "./cardClickedreducer";
import { modalDataReducer } from "./modalDataReducer";

export const rootReducer = combineReducers({
  currentPg: currentPageReducer,
  search: searchInfoReducer,
  returnedPg: returnedPageReducer,
  toggle: searchToggleReducer,
  cardClicked: cardClickedReducer,
  modalData: modalDataReducer,
});
