import { useRef, useState, createContext } from "react";
import { useDispatch } from "react-redux";
import CastCard from "./castCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Navigation } from "swiper";

export const TooltipVisibilityContext = createContext();

function MovieDetailModal({
  modalPosterPath,
  movieTitle,
  tagline,
  overview,
  castData,
  year,
}) {
  const dispatch = useDispatch();
  const modal = useRef();

  const [tooltipVisibility, setTooltipVisibility] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);

  // When the modal is shown, we want a fixed body
  document.body.style.overflow = "hidden";

  // When the modal is hidden...
  const restoreScroll = () => {
    document.body.style.overflow = "unset";
  };

  const onClose = () => {
    modal.current.style.display = "none";
    dispatch({ type: "CARD_CLICK_RESET" });
    dispatch({ type: "MODAL_DATA_RESET" });
    restoreScroll();
  };

  window.onclick = (event) => {
    if (event.target === modal.current) {
      modal.current.style.display = "none";
      dispatch({ type: "CARD_CLICK_RESET" });
      dispatch({ type: "MODAL_DATA_RESET" });
      restoreScroll();
    }
  };

  document.onkeydown = (event) => {
    if (event.key === "Escape") modal.current.style.display = "none";
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

  return (
    <div ref={modal} className="modal">
      <div className="modal-content">
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
                        <TooltipVisibilityContext.Provider
                          value={{ tooltipVisibility, clickedCard }}
                        >
                          <CastCard
                            onClick={() => handleCastCardClick(index)}
                            key={data.cast_id}
                            index={index}
                            castName={data.name}
                            character={data.character}
                            castImgPath={data.profile_path}
                          />
                        </TooltipVisibilityContext.Provider>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <i className="fa-solid fa-circle-chevron-right"></i>
                </div>
              </div>
              <button className="play-trailer-btn">
                <i class="fa-brands fa-youtube"></i> PLAY TRAILER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailModal;
