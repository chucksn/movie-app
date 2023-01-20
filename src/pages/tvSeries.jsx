import PaginatedDisplay from "../components/paginatedDisplay";
import { useEffect, useState, createContext } from "react";

export const PageContextTv = createContext();

function TvSeries() {
  const [currentPage, setCurrentPage] = useState(1);
  const [returnedPage, setReturnedPage] = useState(1);
  const [movieInfoList, setMovieInfoList] = useState("");

  useEffect(() => {
    const getMovieInfo = async () => {
      let response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=5267b00cdf764bc75046eff3d46be3e2&language=en-US&page=${currentPage}`
      );
      let data = await response.json();
      setMovieInfoList(data.results);
      setReturnedPage(data.total_pages);
    };

    getMovieInfo();
  }, [currentPage]);
  return (
    <div className="outlet-bg">
      <span className="tv-header">DISCOVER TV SERIES</span>
      <PageContextTv.Provider
        value={{
          value1: currentPage,
          value2: setCurrentPage,
          value3: "tv",
        }}
      >
        <PaginatedDisplay
          movieData={movieInfoList}
          pgNumDisplayLimit={5}
          pages={returnedPage}
          activePage="tv"
        />
      </PageContextTv.Provider>
    </div>
  );
}

export default TvSeries;
