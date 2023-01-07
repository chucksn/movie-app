export function returnedPageReducer(state = 1, action) {
  switch (action.type) {
    case "UPDATE_RETURNED_PAGE":
      return action.payload;
    default:
      return state;
  }
}
