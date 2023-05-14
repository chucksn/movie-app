import PosterCard from "./posterCard";
import { useDispatch, useSelector } from "react-redux";

function PaginatedDisplay({ movieDataList, pgNumDisplayLimit, pages, tag }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPg);

  const handleScrollToTop = () => {
    window.scrollTo(0, 0, "smooth");
  };

  const goToNextPage = () => {
    dispatch({ type: "NEXT_PAGE" });

    handleScrollToTop();
  };

  const goToPrevPage = () => {
    dispatch({ type: "PREV_PAGE" });

    handleScrollToTop();
  };

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    dispatch({ type: "CHANGE_PAGE", payload: pageNumber });

    handleScrollToTop();
  };

  const getPaginationGroup = () => {
    let start =
      Math.floor((currentPage - 1) / pgNumDisplayLimit) * pgNumDisplayLimit;
    return new Array(pgNumDisplayLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div className="card-pagination-container flex flex-col">
      <div className="card-container flex flex-wrap justify-center p-[0.8rem_0.3rem] gap-[2rem_1.5rem] sm:gap-[2rem_2.5rem] md:p-[1.8rem_0.5rem] md:gap-12 lg:p-[1.8rem] xl:p-8">
        {movieDataList.map((data, index) => {
          return (
            <>
              {movieDataList && (
                <PosterCard
                  key={data.id}
                  movieId={data.id}
                  posterImgPath={data.poster_path}
                  rating={data.vote_average}
                  title={data.name || data.title}
                  date={data.first_air_date || data.release_date}
                  tag={tag === "watchlist" ? data.tag : tag}
                  posterCardData={movieDataList}
                  index={index}
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
