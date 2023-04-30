import PaginatedDisplay from "../components/paginatedDisplay";
import { useEffect, useState, createContext } from "react";
import tailSpinLoader from "../images/tail-spin.svg";

export const PageContextMovie = createContext();

function Movies() {
  const [currentPage, setCurrentPage] = useState(1);
  const [returnedPage, setReturnedPage] = useState(1);
  const [movieInfoList, setMovieInfoList] = useState(null);

  useEffect(() => {
    const getMovieInfo = async () => {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=5267b00cdf764bc75046eff3d46be3e2&language=en-US&page=${currentPage}`
      );
      let data = await response.json();
      setMovieInfoList(data.results);
      setReturnedPage(data.total_pages);
    };

    getMovieInfo();
  }, [currentPage]);

  return (
    <>
      {(!movieInfoList || movieInfoList.length < 1) && (
        <div className="outlet-bg-empty-search min-h-screen w-full bg-black/90">
          <img src={tailSpinLoader} alt="loading" />
        </div>
      )}
      {movieInfoList && (
        <div className="outlet-bg min-h-screen w-full bg-black/90 py-40 px-2 sm:py-48 sm:px-4 md:py-48  lg:py-28 ">
          <span className="section-header text-[rgb(184,184,187)] text-center block font-light mt-2 font-unbounded sm:text-[1.3rem] md:text-[1.6rem]">
            DISCOVER MOVIES
          </span>
          <PageContextMovie.Provider
            value={{
              value1: currentPage,
              value2: setCurrentPage,
              value3: "movie",
            }}
          >
            <PaginatedDisplay
              movieData={movieInfoList}
              pgNumDisplayLimit={5}
              pages={returnedPage}
              activePage="movie"
            />
          </PageContextMovie.Provider>
        </div>
      )}
    </>
  );
}

export default Movies;
