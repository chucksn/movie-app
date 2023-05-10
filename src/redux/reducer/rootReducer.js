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
  loggedReducer,
  watchlistCounterReducer,
  clickedCardIndexReducer,
  refCardIndexReducer,
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
  isLogged: loggedReducer,
  watchlistCounter: watchlistCounterReducer,
  clickedCardIndex: clickedCardIndexReducer,
  refCardIndex: refCardIndexReducer,
});
