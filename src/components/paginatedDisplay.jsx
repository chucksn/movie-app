import { useContext } from "react";
import PosterCard from "./posterCard";
import { PageContextTv } from "../pages/tvSeries";
import { PageContextMovie } from "../pages/movies";
import { PageContextSearch } from "../pages/searchResult";

function PaginatedDisplay({ movieData, pgNumDisplayLimit, pages, activePage }) {
  const tvPageContext = useContext(PageContextTv);
  const moviePageContext = useContext(PageContextMovie);
  const searchPageContext = useContext(PageContextSearch);

  console.log("lvl:3", searchPageContext);

  if (activePage === "movie") {
    var currentPage = moviePageContext.value1;
    var setCurrentPage = moviePageContext.value2;
    var tvType = moviePageContext.value3;
    console.log("active movie");
  }

  if (activePage === "tv") {
    var currentPage = tvPageContext.value1;
    var setCurrentPage = tvPageContext.value2;
    var tvType = tvPageContext.value3;
    console.log("active tv");
  }

  if (activePage === "search") {
    var currentPage = searchPageContext.value1;
    var setCurrentPage = searchPageContext.value2;
    console.log("active search");
  }

  const handleScrollToTop = () => {
    window.scrollTo(0, 0, "smooth");
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
    handleScrollToTop();
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
    handleScrollToTop();
  };

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
    handleScrollToTop();
  };

  const getPaginationGroup = () => {
    let start =
      Math.floor((currentPage - 1) / pgNumDisplayLimit) * pgNumDisplayLimit;
    return new Array(pgNumDisplayLimit).fill().map((_, idx) => start + idx + 1);
  };

  if (movieData) {
    return (
      <div className="card-pagination-container">
        <div className="card-container">
          {movieData.map((data) => (
            <PosterCard
              key={data.id}
              posterImgPath={data.poster_path}
              rating={data.vote_average}
              title={data.name || data.title}
              date={data.first_air_date || data.release_date}
              type={tvType || data.media_type}
            />
          ))}
        </div>
        <div className="pagination-container">
          <button
            onClick={goToPrevPage}
            className={`prev ${currentPage === 1 ? "disabled" : ""}`}
          >
            prev
          </button>

          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`paginationItem ${
                currentPage === item ? "active" : null
              }`}
            >
              <span>{item}</span>
            </button>
          ))}

          <button
            onClick={goToNextPage}
            className={`next ${currentPage === pages ? "disabled" : ""}`}
          >
            next
          </button>
        </div>
      </div>
    );
  }
}

export default PaginatedDisplay;
