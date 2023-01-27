export function cardClickedReducer(state = false, action) {
  switch (action.type) {
    case "CARD_CLICKED":
      return (state = true);
    case "CARD_CLICK_RESET":
      return (state = false);
    default:
      return state;
  }
}

export function trailerBtnClickedReducer(state = false, action) {
  switch (action.type) {
    case "TRAILER_BTN_CLICKED":
      return (state = true);
    case "TRAILER_BTN_CLICK_RESET":
      return (state = false);
    default:
      return state;
  }
}

export function currentPageReducer(state = 1, action) {
  switch (action.type) {
    case "NEXT_PAGE":
      return state + 1;
    case "PREV_PAGE":
      return state - 1;
    case "CHANGE_PAGE":
      return action.payload;
    case "RESET":
      return (state = 1);
    default:
      return state;
  }
}

export function mainSlideCardClickedReducer(state = false, action) {
  switch (action.type) {
    case "MAIN_SLIDE_CARD_CLICKED":
      return (state = true);
    case "MAIN_SLIDE_CARD_CLICK_RESET":
      return (state = false);
    default:
      return state;
  }
}

export function mainSlideVideoListReducer(state = null, action) {
  switch (action.type) {
    case "UPDATE_MAIN_SLIDE_VIDEO_LIST_DATA":
      return action.payload;
    case "MAIN_SLIDE_VIDEO_LIST_DATA_RESET":
      return (state = null);
    default:
      return state;
  }
}

export function modalDataReducer(state = null, action) {
  switch (action.type) {
    case "UPDATE_MODAL_DATA":
      return action.payload;
    case "MODAL_DATA_RESET":
      return (state = null);
    default:
      return state;
  }
}

export function returnedPageReducer(state = 1, action) {
  switch (action.type) {
    case "UPDATE_RETURNED_PAGE":
      return action.payload;
    default:
      return state;
  }
}

export function searchInfoReducer(state = {}, action) {
  switch (action.type) {
    case "UPDATE_SEARCH":
      return { ...state, searchResult: action.payload };
    default:
      return state;
  }
}

export function searchToggleReducer(state = "movie", action) {
  switch (action.type) {
    case "TV_SELECTED":
      return "tv";
    case "MOVIE_SELECTED":
      return "movie";
    default:
      return state;
  }
}
