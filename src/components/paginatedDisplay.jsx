import { useContext } from "react";
import PosterCard from "./posterCard";
import { PageContextTv } from "../pages/tvSeries";

function PaginatedDisplay({ movieData, pgNumDisplayLimit, pages }) {
  const tvPageContext = useContext(PageContextTv);
  let currentPage = tvPageContext.value1;
  let setCurrentPage = tvPageContext.value2;
  let tvType = tvPageContext.value3;

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
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
              title={data.name}
              date={data.first_air_date}
              type={tvType}
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
