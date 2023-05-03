import PaginatedDisplay from "../components/paginatedDisplay";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function SearchResult() {
  const returnedPage = useSelector((state) => state.search_returnedPg);
  const searchInfo = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const searchToggleState = useSelector((state) => state.searchToggleState);

  useEffect(() => {
    dispatch({ type: "SEARCH_TOGGLE_RESET" });
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
        <div className="outlet-bg-empty-search flex justify-center items-center min-h-screen w-full bg-black/90">
          <span className="section-header text-[rgb(184,184,187)] text-center block font-light mt-2 font-unbounded sm:text-[1.3rem] md:text-[1.6rem]">
            No Search Result
          </span>
        </div>
      )}
      {Object.keys(searchInfo.searchResult).length >= 1 && (
        <div className="outlet-bg min-h-screen w-full bg-black/90 py-[72px] px-2 sm:py-32 sm:px-4 md:px-7 lg:px-2">
          <span className="section-header text-[rgb(184,184,187)] text-center block font-light mt-2 font-unbounded sm:text-[1.2rem] md:text-[1.4rem]">
            Search Result
          </span>
          <div className="select-movie-tv-search flex justify-center m-[1.5rem_0_1rem_0] font-medium font-ubuntu lg:text-lg cursor-pointer">
            <span
              onClick={handleMovieToggle}
              className={`select-movie mx-8 ${
                searchToggleState === "movie"
                  ? "text-teal-500"
                  : "text-slate-400"
              }`}
            >
              Movie
            </span>
            <span
              onClick={handleTvToggle}
              className={`select-tv mx-8 ${
                searchToggleState === "tv" ? "text-teal-500" : "text-slate-400"
              }`}
            >
              Tv Series
            </span>
          </div>

          <PaginatedDisplay
            key="search-pagination"
            movieData={searchInfo.searchResult}
            pgNumDisplayLimit={5}
            pages={returnedPage}
            tag={searchToggleState === "tv" ? "tv" : "movie"}
          />
        </div>
      )}
    </>
  );
}

export default SearchResult;
