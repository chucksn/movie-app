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
