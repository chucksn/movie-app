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
      <div ref={modalRef} className="modal">
        <div ref={modalContentRef} className="modal-content">
          <span onClick={onClose} className="close-icon">
            &times;
          </span>
          <div className="modal-body">
            <div className="details-img-ctn">
              <div className="img-ctn">
                <img src={image} alt="poster" className="modal-poster" />
              </div>
              <div className="details-ctn">
                <div className="title-date-ctn">
                  <span className="modal-title">{movieTitle}</span>
                  <span className="tagline">{tagline}</span>
                  <span className="modal-date">{year}</span>
                </div>

                <div className="overview">
                  <span className="overview.txt">{overview}</span>
                </div>

                <div className="cast-ctn">
                  <span className="cast-txt">Cast</span>

                  <div className="outer-swiper-ctn">
                    <i className="fa-solid fa-circle-chevron-left"></i>
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

                    <i className="fa-solid fa-circle-chevron-right"></i>
                  </div>
                </div>
                {videosInfoList.length > 0 && (
                  <button
                    className="play-trailer-btn"
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
