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
      className="main-slide-card"
    >
      <img className="main-slide-image" src={image} alt="movie" />

      <div className="main-slide-detail">
        <i ref={playBtnRef} className="fa-solid fa-circle-play"></i>

        <div className="main-slide-info">
          <span className="main-slide-title">{title}</span>
          <span style={{ color: "gray" }} className="main-slide-year">
            {year}
          </span>
          <span>Watch The Trailer</span>
        </div>
      </div>
    </div>
  );
}

export default MainSlideCard;
