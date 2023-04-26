import PaginatedDisplay from "../components/paginatedDisplay";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function SearchResult() {
  const returnedPage = useSelector((state) => state.returnedPg);
  const searchInfo = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const toggleState = useSelector((state) => state.toggle);

  useEffect(() => {
    dispatch({ type: "RESET" }); //resets searchResult
  }, [dispatch]);

  const handleMovieToggle = () => {
    dispatch({ type: "MOVIE_SELECTED" });
  };

  const handleTvToggle = () => {
    dispatch({ type: "TV_SELECTED" });
  };

  return (
    <>
      {Object.keys(searchInfo.searchResult).length < 1 && (
        <div className="outlet-bg-empty-search flex justify-center items-center min-h-screen w-full bg-black/80">
          <span className="tv-header">No Search Result</span>
        </div>
      )}
      {Object.keys(searchInfo.searchResult).length >= 1 && (
        <div className="outlet-bg min-h-screen w-full bg-black/80">
          <span className="tv-header">Search Result</span>
          <div className="select-movie-tv-search">
            <span
              onClick={handleMovieToggle}
              className={`select-movie ${
                toggleState === "movie" ? "active" : null
              }`}
            >
              Movie
            </span>
            <span
              onClick={handleTvToggle}
              className={`select-tv ${toggleState === "tv" ? "active" : null}`}
            >
              Tv Series
            </span>
          </div>

          <PaginatedDisplay
            movieData={searchInfo.searchResult}
            pgNumDisplayLimit={5}
            pages={returnedPage}
            activePage="search"
          />
        </div>
      )}
    </>
  );
}

export default SearchResult;
