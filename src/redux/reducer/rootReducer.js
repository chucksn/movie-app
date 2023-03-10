import {
  currentPageReducer,
  searchInfoReducer,
  returnedPageReducer,
  searchToggleReducer,
  cardClickedReducer,
  modalDataReducer,
  mainSlideVideoListReducer,
  mainSlideCardClickedReducer,
  trailerBtnClickedReducer,
} from "./reducers";

import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  currentPg: currentPageReducer,
  search: searchInfoReducer,
  returnedPg: returnedPageReducer,
  toggle: searchToggleReducer,
  cardClicked: cardClickedReducer,
  modalData: modalDataReducer,
  mainSlideVideoList: mainSlideVideoListReducer,
  mainSlideCardClicked: mainSlideCardClickedReducer,
  trailerBtnClicked: trailerBtnClickedReducer,
});
