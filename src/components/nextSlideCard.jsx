import { useRef } from "react";

function NextSlideCard({ posterImgPath, title, type, year }) {
  const playBtnRef = useRef();

  const handleMouseEnter = () => {
    playBtnRef.current.style.color = "orange";
  };

  const handleMouseLeave = () => {
    playBtnRef.current.style.color = "unset";
  };

  let image =
    posterImgPath === null
      ? "./no-poster.jpg"
      : `https://image.tmdb.org/t/p/w92${posterImgPath}`;
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="next-slide-card"
    >
      <img
        src={image}
        alt="poster"
        className="next-slide-poster"
        style={{ maxWidth: "5.75rem" }}
      />
      <div className="next-slide-details">
        <i
          ref={playBtnRef}
          style={{ fontSize: "2rem", marginBottom: "0.7rem" }}
          className="fa-regular fa-circle-play"
        ></i>
        <span className="next-slide-title">{title}</span>
        <span style={{ color: "gray" }} className="next-slide-date">
          {type} {year}
        </span>
      </div>
    </div>
  );
}

export default NextSlideCard;
