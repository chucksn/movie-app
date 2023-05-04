import { useState } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import loadingSvg from "../images/loading2.svg";

function MainSlideCard({ posterImgPath, title, year, onClick }) {
  const [mouseEnter, setMouseEnter] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const handleMouseEnter = () => {
    setMouseEnter(true);
    dispatch({ type: "MAIN_SLIDE_CARD_MOUSE_ENTER" });
  };

  const handleMouseLeave = () => {
    setMouseEnter(false);
    dispatch({ type: "MAIN_SLIDE_CARD_MOUSE_LEAVE" });
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  let image =
    posterImgPath === null
      ? "./no-poster.jpg"
      : `https://image.tmdb.org/t/p/w780${posterImgPath}`;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="main-slide-card  py-4 w-full min-h-[234px] sm:min-h-[374.19px] md:min-h-[400.6px] xl:min-h-[553.16px] bg-[rgb(5,5,5)] flex flex-col text-white text-center cursor-pointer text-lg relative"
    >
      {!loaded && (
        <div className="loading-placeholder w-full min-h-[234px] sm:min-h-[374.19px] md:min-h-[400.6px] xl:min-h-[553.16px] flex justify-center items-center">
          <img
            src={loadingSvg}
            alt="loading"
            className="w-[40px] h-[40px] animate-spin-slow"
          />
        </div>
      )}
      <img
        className="main-slide-image"
        src={image}
        alt="movie"
        onLoad={handleLoad}
        style={{ display: loaded ? "inline-block" : "none" }}
      />

      <div className="main-slide-detail flex justify-center items-center absolute top-[100%] left-[50%] -translate-x-1/2 -translate-y-full w-[101%] ">
        <BsPlayCircle
          className={` text-8 mr-4 sm:text-3xl sm:mr-6 md:text-6xl md:mr-8 ${
            mouseEnter ? "text-[rgb(245,197,24)]" : "text-white/40"
          }`}
        />

        <div className="main-slide-info flex flex-col text-center text-[0.8rem] leading-4 sm:text-base sm:leading-5 md:leading-7">
          <span className="main-slide-title text-[rgb(182,148,61)] text-shadow-[0_0_4px_2px_rgb(0,0,0)] font-ubuntu font-medium sm:text-lg md:text-2xl">
            {title}
          </span>
          <span className="main-slide-year text-gray-400">{year}</span>
          <span>Watch The Trailer</span>
        </div>
      </div>
    </div>
  );
}

export default MainSlideCard;
