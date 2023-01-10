import { useContext } from "react";
import PosterCard from "./posterCard";
import { PageContextTv } from "../pages/tvSeries";
import { PageContextMovie } from "../pages/movies";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MovieDetailModal from "./modal";

function PaginatedDisplay({ movieData, pgNumDisplayLimit, pages, activePage }) {
  const tvPageContext = useContext(PageContextTv);
  const moviePageContext = useContext(PageContextMovie);
  const dispatch = useDispatch();
  const searchCurrentPg = useSelector((state) => state.currentPg);
  const toggleState = useSelector((state) => state.toggle);
  const handleCardClicked = () => {
    dispatch({ type: "CARD_CLICKED" });
  };

  const cardClicked = useSelector((state) => state.cardClicked);

  if (activePage === "movie") {
    var currentPage = moviePageContext.value1;
    var setCurrentPage = moviePageContext.value2;
    var tvType = moviePageContext.value3;
  }

  if (activePage === "tv") {
    var currentPage = tvPageContext.value1;
    var setCurrentPage = tvPageContext.value2;
    var tvType = tvPageContext.value3;
  }

  if (activePage === "search") {
    if (toggleState === "movie") {
      tvType = "Movie";
    } else if (toggleState === "tv") {
      tvType = "Tv series";
    }
  }

  const handleScrollToTop = () => {
    window.scrollTo(0, 0, "smooth");
  };

  const goToNextPage = () => {
    activePage === "search"
      ? dispatch({ type: "NEXT_PAGE" })
      : setCurrentPage(currentPage + 1);
    handleScrollToTop();
  };

  const goToPrevPage = () => {
    activePage === "search"
      ? dispatch({ type: "PREV_PAGE" })
      : setCurrentPage(currentPage - 1);
    handleScrollToTop();
  };

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    activePage === "search"
      ? dispatch({ type: "CHANGE_PAGE", payload: pageNumber })
      : setCurrentPage(pageNumber);
    handleScrollToTop();
  };

  const getPaginationGroup = () => {
    if (activePage === "search") {
      currentPage = searchCurrentPg;
    }
    let start =
      Math.floor((currentPage - 1) / pgNumDisplayLimit) * pgNumDisplayLimit;
    return new Array(pgNumDisplayLimit).fill().map((_, idx) => start + idx + 1);
  };

  if (movieData) {
    return (
      <div className="card-pagination-container">
        <div className="card-container">
          {movieData.map((data) => {
            return (
              <>
                <PosterCard
                  onClick={handleCardClicked}
                  key={data.id}
                  posterImgPath={data.poster_path}
                  rating={data.vote_average}
                  title={data.name || data.title}
                  date={data.first_air_date || data.release_date}
                  type={tvType || data.media_type}
                />
                {cardClicked && <MovieDetailModal />}
              </>
            );
          })}
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