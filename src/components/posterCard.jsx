import { useState } from "react";
import loadingSvg from "../images/loading2.svg";

function PosterCard({
  posterImgPath,
  rating,
  title,
  date,
  type,
  onClick,
  posterCardData,
}) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  let image =
    posterImgPath === null
      ? "./no-poster.jpg"
      : `https://image.tmdb.org/t/p/w500${posterImgPath}`;
  return (
    <div
      onClick={onClick}
      className="card flex flex-col justify-between border border-zinc-800 bg-zinc-800 rounded-[0_0_5px_5px] cursor-pointer transition duration-[0.1s] hover:scale-[0.97] min-h-[21rem] w-[10rem] sm:w-[11rem] sm:min-h-[24rem] md:min-h-[25rem] md:w-[12rem] lg:min-h-[26rem] "
    >
      {!posterCardData && (
        <div className="loading-placeholder w-full h-full flex justify-center items-center">
          <img
            src={loadingSvg}
            alt="loading"
            className="w-[30px] h-[30px] animate-spin-slow"
          />
        </div>
      )}
      {posterCardData && (
        <>
          {!loaded && (
            <div className="loading-placeholder w-full h-full flex justify-center items-center">
              <img
                src={loadingSvg}
                alt="loading"
                className="w-[30px] h-[30px] animate-spin-slow"
              />
            </div>
          )}
          <img
            src={image}
            alt="poster"
            className="poster"
            onLoad={handleLoad}
            style={{ display: loaded ? "inline-block" : "none" }}
          />

          <span className="rating text-white font-roboto m-[0.6rem]">
            <span>
              <i className="fa-solid fa-star text-[goldenrod]"></i>
            </span>{" "}
            {rating}
          </span>
          <p className="movie-title text-white text-center px-[0.25rem] text-[0.75rem] sm:text-[0.8.5rem] font-prosto">
            {title}
          </p>
          <div className="type-date flex p-[0.4rem] mx-[0.6rem] mb-4 mt-2 justify-between text-[rgb(163,163,163)] bg-white/10 rounded-[5px] flex-col-reverse text-center sm:flex-row">
            <p className="type text-yellow-400 text-[0.8rem] sm:text-[0.9rem] font-medium">
              {type}
            </p>
            <span className="date text-sky-400 text-[0.93rem] font-medium ">
              {date}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
export default PosterCard;
