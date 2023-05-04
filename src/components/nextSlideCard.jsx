import { useState } from "react";
import loadingSvg from "../images/loading2.svg";

function NextSlideCard({ posterImgPath, title, year }) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  let image =
    posterImgPath === null
      ? "./no-poster.jpg"
      : `https://image.tmdb.org/t/p/w92${posterImgPath}`;
  return (
    <div className="next-slide-card flex text-white items-center shadow-[0_0_3px_black] bg-[rgb(20,20,20)]">
      <div className="img-ctn lg:w-[4rem] xl:w-[5.75rem] lg:h-[96px] xl:h-[138px]">
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
          alt="small-poster"
          className="next-slide-poster"
          onLoad={handleLoad}
          style={{ display: loaded ? "inline-block" : "none" }}
        />
      </div>
      <div className="next-slide-details flex flex-col pl-4 leading-[1.6rem] text-[0.95rem]">
        <span className="next-slide-title">{title}</span>
        <span className="next-slide-date text-[gray]">{year}</span>
      </div>
    </div>
  );
}

export default NextSlideCard;
