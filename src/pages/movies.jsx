import PaginatedDisplay from "../components/paginatedDisplay";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import loading from "../images/loading2.svg";

function Movies() {
  const currentPage = useSelector((state) => state.currentPg);
  const [returnedPage, setReturnedPage] = useState(1);
  const [movieInfoList, setMovieInfoList] = useState(null);

  useEffect(() => {
    const getMovieInfo = async () => {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${currentPage}`
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
          <div className="flex justify-center items-center w-full h-screen">
            <img
              src={loading}
              alt="loading"
              className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] animate-spin-slow"
            />
          </div>
        </div>
      )}
      {movieInfoList && (
        <div className="outlet-bg min-h-screen w-full bg-black/90 py-[72px] px-2 sm:py-32 sm:px-4 md:px-7 lg:px-2 ">
          <span className="section-header text-[rgb(184,184,187)] text-center block font-light mt-2 font-unbounded sm:text-[1.2rem] md:text-[1.4rem]">
            DISCOVER MOVIES
          </span>

          <PaginatedDisplay
            key="movie-pagination"
            movieData={movieInfoList}
            pgNumDisplayLimit={5}
            pages={returnedPage}
            tag="movie"
          />
        </div>
      )}
    </>
  );
}

export default Movies;
