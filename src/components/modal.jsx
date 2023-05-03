import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CastCard from "./castCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Navigation } from "swiper";
import VideoWindow from "./videoWindow";

function MovieDetailModal({
  modalPosterPath,
  movieTitle,
  tagline,
  overview,
  castData,
  year,
  videosInfoList,
}) {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const modalContentRef = useRef();
  const trailerBtnClicked = useSelector((state) => state.trailerBtnClicked);
  const [tooltipVisibility, setTooltipVisibility] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);

  const videoInfo =
    trailerBtnClicked &&
    videosInfoList.filter((videoInfo) => {
      return videoInfo.type === "Trailer";
    });

  const youtubeKey = videoInfo.length > 0 ? videoInfo[0].key : null;

  const videoPath = youtubeKey
    ? `https://www.youtube.com/embed/${youtubeKey}?&autoplay=1`
    : null;

  // When the modal is shown, we want a fixed body
  document.body.style.overflow = "hidden";

  // When the modal is hidden...
  const restoreScroll = () => {
    document.body.style.overflow = "unset";
  };

  const onClose = () => {
    modalRef.current.style.display = "none";
    dispatch({ type: "CARD_CLICK_RESET" });
    dispatch({ type: "MODAL_DATA_RESET" });
    dispatch({ type: "TRAILER_BTN_CLICK_RESET" });
    restoreScroll();
  };

  window.onclick = (event) => {
    if (event.target === modalRef.current) {
      modalRef.current.style.display = "none";
      dispatch({ type: "CARD_CLICK_RESET" });
      dispatch({ type: "MODAL_DATA_RESET" });
      restoreScroll();
    }
  };

  document.onkeydown = (event) => {
    if (event.key === "Escape") modalRef.current.style.display = "none";
    dispatch({ type: "CARD_CLICK_RESET" });
    dispatch({ type: "MODAL_DATA_RESET" });
    restoreScroll();
  };

  let image =
    modalPosterPath === null
      ? "./no-poster.jpg"
      : `https://image.tmdb.org/t/p/w500${modalPosterPath}`;

  const handleCastCardClick = (index) => {
    setTooltipVisibility(!tooltipVisibility);
    setClickedCard(index);
  };

  const handleTrailerBtn = () => {
    dispatch({ type: "TRAILER_BTN_CLICKED" });
  };

  return (
    <>
      <div
        ref={modalRef}
        className="modal fixed left-0 top-0 w-full h-full bg-black/80 z-30 pt-8 overflow-y-auto"
      >
        <div
          ref={modalContentRef}
          className="modal-content w-[80%] sm:w-[70%] bg-[rgb(26,26,26)] p-2 shadow-[0_0_6px_rgb(1,202,202)] rounded-lg my-12 sm:my-24  mx-auto"
        >
          <span
            onClick={onClose}
            className="close-icon float-right text-white font-extrabold text-[1.8rem] cursor-pointer"
          >
            &times;
          </span>
          <div className="modal-body p-[0.8rem] ">
            <div className="details-img-ctn flex flex-col lg:flex-row">
              <div className="img-ctn flex justify-center lg:w-[45%] xl:w-[40%]">
                <img
                  src={image}
                  alt="poster"
                  className="modal-poster max-w-[50%] lg:max-w-[100%]"
                />
              </div>
              <div className="details-ctn flex flex-col justify-between md:p-4 lg:w-[55%] xl:w-[60%]">
                <div className="title-date-ctn text-center hidden md:block">
                  <span className="modal-title block my-[0.3rem] text-[rgb(4,175,175)] font-medium font-ubuntu text-[1.2rem] sm:text-[1.5rem] md:text-[2rem]">
                    {movieTitle}
                  </span>
                  <span className="tagline block my-[0.3rem] text-[orange] font-medium font-[cursive] md:text-[1.3rem]">
                    {tagline}
                  </span>
                  <span className="modal-date block my-[0.3rem] md:text-[1.3rem] text-[green] font-medium">
                    {year}
                  </span>
                </div>

                <div className="overview bg-[rgb(20,20,20)] text-[rgb(192,192,192)] p-2 rounded-lg font-medium my-4 border-none shadow-[0_0_6px_rgb(1,202,202)] overflow-y-scroll max-h-[7rem] text-[0.8rem] sm:max-h-[7rem] lg:max-h-[6rem] xl:max-h-[7rem]">
                  <span className="overview.txt block my-[0.3rem]">
                    {overview}
                  </span>
                </div>

                <div className="cast-ctn flex flex-col text-white text-center rounded-lg bg-[rgb(20,20,20)] shadow-[0_0_6px_rgb(1,202,202)] xl:max-h-[15.2rem]">
                  <span className="cast-txt block my-[0.3rem] font-ubuntu text-[yellow] text-[0.8rem]">
                    Cast
                  </span>

                  <div className="outer-swiper-ctn flex items-center">
                    <i className="fa-solid fa-circle-chevron-left text-white/40 cursor-pointer p-4 text-2xl hidden sm:block"></i>
                    <Swiper
                      spaceBetween={0}
                      modules={[Navigation, Autoplay]}
                      navigation={{
                        nextEl: ".fa-circle-chevron-right",
                        prevEl: ".fa-circle-chevron-left",
                      }}
                      breakpoints={{
                        2300: { slidesPerView: 7 },
                        1900: { slidesPerView: 6 },
                        1024: { slidesPerView: 5 },
                        280: { slidesPerView: 4 },
                      }}
                      autoplay={{
                        delay: 800,
                        disableOnInteraction: true,
                      }}
                    >
                      {castData.map((data, index) => (
                        <SwiperSlide>
                          <CastCard
                            onClick={() => handleCastCardClick(index)}
                            key={data.cast_id}
                            index={index}
                            castName={data.name}
                            character={data.character}
                            castImgPath={data.profile_path}
                            clickedCard={clickedCard}
                            tooltipVisibility={tooltipVisibility}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    <i className="fa-solid fa-circle-chevron-right text-white/40 cursor-pointer p-4 text-2xl hidden sm:block"></i>
                  </div>
                </div>
                {videosInfoList.length > 0 && (
                  <button
                    className="play-trailer-btn bg-[rgb(221,58,49)] text-white my-4 p-2 rounded-lg w-full cursor-pointer hover:bg-[rgb(221,64,56)] "
                    onClick={handleTrailerBtn}
                  >
                    <i className="fa-brands fa-youtube"></i> WATCH TRAILER
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {trailerBtnClicked && videoPath && <VideoWindow videoUrl={videoPath} />}
    </>
  );
}

export default MovieDetailModal;
