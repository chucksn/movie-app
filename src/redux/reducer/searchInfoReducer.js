export function searchInfoReducer(state = {}, action) {
  switch (action.type) {
    case "UPDATE_SEARCH":
      return { ...state, searchResult: action.payload };
    default:
      return state;
  }
}
