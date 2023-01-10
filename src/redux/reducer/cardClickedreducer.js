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
