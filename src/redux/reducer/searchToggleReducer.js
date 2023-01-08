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
