import { useRef } from "react";

function MainSlideCard({
  posterImgPath,
  title,
  year,
  leftNavRef,
  rightNavRef,
  onClick,
}) {
  const playBtnRef = useRef();

  const handleMouseEnter = () => {
    playBtnRef.current.style.color = "orange";
    leftNavRef.current.style.display = "block";
    rightNavRef.current.style.display = "block";
  };

  const handleMouseLeave = () => {
    playBtnRef.current.style.color = "rgba(255, 255, 255, 0.4)";
    leftNavRef.current.style.display = "none";
    rightNavRef.current.style.display = "none";
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
      className="main-slide-card bg-[rgb(5,5,5)] py-4 flex flex-col text-white text-center cursor-pointer text-lg relative"
    >
      <img className="main-slide-image" src={image} alt="movie" />

      <div className="main-slide-detail flex justify-center items-center absolute top-[100%] left-[50%] -translate-x-1/2 -translate-y-full w-full ">
        <i
          ref={playBtnRef}
          className="fa-solid fa-circle-play text-white/40 text-8 mr-4 sm:text-3xl sm:mr-6 md:text-5xl md:mr-8"
        ></i>

        <div className="main-slide-info flex flex-col text-center text-[0.8rem] leading-4 sm:text-base sm:leading-5 md:leading-7">
          <span className="main-slide-title text-[rgb(182,148,61)] font-ubuntu font-medium sm:text-lg md:text-2xl">
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
