import { useContext, useState } from "react";
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
  const modalData = useSelector((state) => state.modalData);
  const cardClicked = useSelector((state) => state.cardClicked);
  const [clickedCardIndex, setClickedCardIndex] = useState(null);

  const handleCardClick = async (index, id) => {
    dispatch({ type: "CARD_CLICKED" });
    setClickedCardIndex(index);

    let res = await fetch(
      `https://api.themoviedb.org/3/${tvType}/${id}?api_key=5267b00cdf764bc75046eff3d46be3e2&language=en-US&append_to_response=videos,credits`
    );
    let fetchedModalData = await res.json();

    dispatch({
      type: "UPDATE_MODAL_DATA",
      payload: fetchedModalData,
    });
  };

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
      tvType = "movie";
    } else if (toggleState === "tv") {
      tvType = "tv";
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

  return (
    <div className="card-pagination-container flex flex-col">
      <div className="card-container flex flex-wrap justify-center p-[0.8rem_0.3rem] gap-[2rem_1.5rem] sm:gap-[2rem_2.5rem] md:p-[1.8rem] md:gap-12 lg:p-[1.8rem] xl:p-8">
        {movieData.map((data, index) => {
          return (
            <>
              {movieData && (
                <PosterCard
                  onClick={() => handleCardClick(index, data.id)}
                  key={data.id}
                  posterImgPath={data.poster_path}
                  rating={data.vote_average}
                  title={data.name || data.title}
                  date={data.first_air_date || data.release_date}
                  type={tvType || data.media_type}
                />
              )}
              {cardClicked && modalData && clickedCardIndex === index && (
                <MovieDetailModal
                  key={modalData.id}
                  modalPosterPath={modalData.poster_path}
                  movieTitle={modalData.name || modalData.title}
                  overview={modalData.overview}
                  tagline={modalData.tagline}
                  videosInfoList={modalData.videos.results}
                  year={
                    modalData.release_date && modalData.release_date.slice(0, 4)
                  }
                  castData={modalData.credits.cast}
                />
              )}
            </>
          );
        })}
      </div>
      <div className="pagination-container flex items-center justify-center p-[0.5rem_1rem]">
        <button
          onClick={goToPrevPage}
          className={`prev bg-black/20 border border-[#666] rounded-[50%] p-[0.63rem]  mx-[0.63rem] cursor-pointer text-[0.9rem] ${
            currentPage === 1
              ? "shadow-none pointer-events-none text-[#999]"
              : "text-[rgb(1,173,1)] shadow-[0_0_3px_rgba(0,0,0,0.4)]"
          }`}
        >
          prev
        </button>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem bg-black/20 p-[10px_15px] rounded-[50%] max-h-[2.8rem] max-w-[2.8rem] relative mx-[5px] cursor-pointer ${
              currentPage === item
                ? "border border-[#888] text-[greenyellow] pointer-events-none"
                : "border-2 border-[#666] text-white"
            }`}
          >
            <span className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
              {item}
            </span>
          </button>
        ))}

        <button
          onClick={goToNextPage}
          className={`next bg-black/20 border border-[#666] rounded-[50%] p-[0.63rem] mx-[0.63rem] cursor-pointer text-[0.9rem] ${
            currentPage === pages
              ? "shadow-none pointer-events-none text-[#999]"
              : "text-[rgb(1,173,1)] shadow-[0_0_3px_rgba(0,0,0,0.4)]"
          }`}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default PaginatedDisplay;
