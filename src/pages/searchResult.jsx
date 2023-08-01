import PaginatedDisplay from "../components/paginatedDisplay";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useGetSearchMovieTv } from "../hooks/getMovies";
import loading from "../images/loading2.svg";

function SearchResult() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.searchQuery);
  const currentPage = useSelector((state) => state.currentPg);
  const searchToggleState = useSelector((state) => state.searchToggleState);

  const { data, isLoading } = useGetSearchMovieTv({
    currentPage,
    searchQuery,
    searchToggleState,
  });

  useEffect(() => {
    dispatch({ type: "SEARCH_TOGGLE_RESET" });
  }, [dispatch]);

  const handleMovieToggle = () => {
    dispatch({ type: "MOVIE_SELECTED" });
    dispatch({ type: "RESET_CURRENT_PAGE" });
  };

  const handleTvToggle = () => {
    dispatch({ type: "TV_SELECTED" });
    dispatch({ type: "RESET_CURRENT_PAGE" });
  };

  return (
    <>
      {isLoading && (
        <div className="outlet-bg-empty-search min-h-screen w-full bg-black/90">
          <div className="flex justify-center items-center w-full h-screen">
            <img
              src={loading}
              alt="loading"
              className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] animate-spin-slow"
            />
          </div>
        </div>
      )}
      {(!data || data.results.length === 0) && (
        <div className="outlet-bg-empty-search flex justify-center items-center h-screen w-full bg-black/90">
          <span className="section-header text-[rgb(184,184,187)] text-center block font-light mt-2 font-unbounded sm:text-[1.3rem] md:text-[1.6rem]">
            No Search Result
          </span>
        </div>
      )}
      {data && data.results.length >= 1 && (
        <div className="outlet-bg min-h-screen w-full bg-black/90 py-[72px] px-2 sm:py-32 sm:px-4 md:px-7 lg:px-2">
          <span className="section-header text-[rgb(184,184,187)] text-center block mt-2 text-[1.15rem] sm:text-[1.3rem] md:text-[1.6rem]">
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
            movieData={data.results}
            pgNumDisplayLimit={data.total_pages > 5 ? 5 : data.total_pages}
            pages={data.total_pages}
            tag={searchToggleState === "tv" ? "tv" : "movie"}
            movieDataList={data.results}
          />
        </div>
      )}
    </>
  );
}

export default SearchResult;
