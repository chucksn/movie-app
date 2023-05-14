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
    case "RESET_CURRENT_PAGE":
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

export function mainSlideCardHoverReducer(state = false, action) {
  switch (action.type) {
    case "MAIN_SLIDE_CARD_MOUSE_ENTER":
      return (state = true);
    case "MAIN_SLIDE_CARD_MOUSE_LEAVE":
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
    case "SEARCH_RETURNED_PAGES":
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
    case "SEARCH_TOGGLE_RESET":
      return "movie";
    default:
      return state;
  }
}

export function loggedReducer(state = false, action) {
  switch (action.type) {
    case "LOGGED_IN":
      return (state = true);
    case "LOGGED_OUT":
      return (state = false);
    default:
      return state;
  }
}

export function watchlistReducer(state = null, action) {
  switch (action.type) {
    case "SET_WATCHLIST":
      return (state = action.payload);
    default:
      return state;
  }
}

export function clickedCardIndexReducer(state = null, action) {
  switch (action.type) {
    case "SET_CLICKED_CARD_INDEX":
      return (state = action.payload);
    case "RESET_CLICKED_CARD_INDEX":
      return (state = null);
    default:
      return state;
  }
}

export function refCardIndexReducer(state = null, action) {
  switch (action.type) {
    case "SET_REF_CARD_INDEX":
      return (state = action.payload);
    case "RESET_REF_CARD_INDEX":
      return (state = null);
    default:
      return state;
  }
}

export function userReducer(state = null, action) {
  switch (action.type) {
    case "SET_USER":
      return (state = action.payload);
    case "RESET_USER":
      return (state = null);
    default:
      return state;
  }
}
