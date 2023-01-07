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
