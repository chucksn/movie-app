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
  mainSlideCardHoverReducer,
} from "./reducers";

import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  currentPg: currentPageReducer,
  search: searchInfoReducer,
  search_returnedPg: returnedPageReducer,
  searchToggleState: searchToggleReducer,
  cardClicked: cardClickedReducer,
  modalData: modalDataReducer,
  mainSlideVideoList: mainSlideVideoListReducer,
  mainSlideCardClicked: mainSlideCardClickedReducer,
  mainSlideCardHover: mainSlideCardHoverReducer,
  trailerBtnClicked: trailerBtnClickedReducer,
});
