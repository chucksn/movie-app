import PaginatedDisplay from "../components/paginatedDisplay";
import { useSelector } from "react-redux";
import loading from "../images/loading2.svg";
import { useGetPopularMovies } from "../hooks/getMovies";

function Movies() {
  const currentPg = useSelector((state) => state.currentPg);

  const { data, isLoading } = useGetPopularMovies({ currentPage: currentPg });

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
      {data && (
        <div className="outlet-bg min-h-screen w-full bg-black/90 py-[72px] px-2 sm:py-32 sm:px-4 md:px-7 lg:px-2 ">
          <span className="section-header text-[rgb(184,184,187)] text-center block mt-2 text-[1.15rem] sm:text-[1.3rem] md:text-[1.6rem]">
            DISCOVER MOVIES
          </span>

          <PaginatedDisplay
            key="movie-pagination"
            movieDataList={data.results}
            pgNumDisplayLimit={data.total_pages > 5 ? 5 : data.total_pages}
            pages={data.total_pages}
            tag="movie"
          />
        </div>
      )}
    </>
  );
}

export default Movies;
