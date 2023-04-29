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
        <div className="outlet-bg-empty-search flex justify-center items-center min-h-screen w-full bg-black/90">
          <span className="section-header text-[rgb(184,184,187)] text-center block font-light mt-2 font-unbounded sm:text-[1.3rem] md:text-[1.6rem]">
            No Search Result
          </span>
        </div>
      )}
      {Object.keys(searchInfo.searchResult).length >= 1 && (
        <div className="outlet-bg min-h-screen w-full bg-black/90 py-40 px-2 sm:py-48 sm:px-4 md:py-48 md:px-7 lg:py-28 lg:px-2">
          <span className="section-header text-[rgb(184,184,187)] text-center block font-light mt-2 font-unbounded sm:text-[1.3rem] md:text-[1.6rem]">
            Search Result
          </span>
          <div className="select-movie-tv-search flex justify-center m-[1.5rem_0_1rem_0] text-xl cursor-pointer">
            <span
              onClick={handleMovieToggle}
              className={`select-movie mx-8 ${
                toggleState === "movie" ? "text-white" : "text-[rgb(70,70,70)]"
              }`}
            >
              Movie
            </span>
            <span
              onClick={handleTvToggle}
              className={`select-tv mx-8 ${
                toggleState === "tv" ? "text-white" : "text-[rgb(70,70,70)]"
              }`}
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
