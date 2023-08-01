import loading from "../images/loading2.svg";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useGetTrending } from "../hooks/getMovies";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper";
import PosterCard from "./posterCard";

function HomeTrendingSection() {
  const [trendingPeriod, setTrendingPeriod] = useState("day");
  const [selectOpened, setOpenStatus] = useState(false);
  const selectRef = useRef();
  const { data, isLoading } = useGetTrending({ span: trendingPeriod });

  const handleSelectTrending = () => {
    setOpenStatus(!selectOpened);
    if (!selectOpened) {
      selectRef.current.style.display = "block";
    } else {
      selectRef.current.style.display = "none";
    }
  };

  const handleDayTrend = () => {
    setTrendingPeriod("day");
    setOpenStatus(false);
    selectRef.current.style.display = "none";
  };

  const handleWeekTrend = () => {
    setTrendingPeriod("week");
    setOpenStatus(false);
    selectRef.current.style.display = "none";
  };

  const swiperStyle = {
    display: "flex",
    justifyContent: "center",
  };
  return (
    <div className="trending-ctn my-8 md:my-12 px-8 sm:px-12 md:p-0">
      <span className="section-header relative mb-[1rem] text-[rgb(184,184,187)] text-center block mt-2 text-[1.15rem] sm:text-[1.3rem] md:text-[1.6rem]">
        TRENDING {trendingPeriod === "day" && "TODAY"}
        {trendingPeriod === "week" && "THIS WEEK"}{" "}
        <span
          className="select-toggle-ctn text-[green] cursor-pointer"
          onClick={handleSelectTrending}
        >
          {!selectOpened && (
            <i className="closed-select fa-solid fa-chevron-down"></i>
          )}
          {selectOpened && (
            <i className="opened-select fa-solid fa-chevron-up"></i>
          )}
        </span>
        <span
          className="select-options text-[rgb(192,192,192)] absolute left-[55%] text-[1.1rem] leading-[2rem] z-40 bg-[rgb(27,27,27)] p-2 rounded-lg hidden"
          ref={selectRef}
        >
          <span
            className={`today block cursor-pointer hover:text-[yellow] ${
              trendingPeriod === "day" ? "text-[yellow]" : ""
            }`}
            onClick={handleDayTrend}
          >
            Today
          </span>
          <span
            className={`this-week block cursor-pointer hover:text-[yellow] ${
              trendingPeriod === "week" ? "text-[yellow]" : ""
            }`}
            onClick={handleWeekTrend}
          >
            This Week
          </span>
        </span>
      </span>

      <div className="trending-inner-ctn flex ">
        <>
          {isLoading && (
            <div className="flex justify-center items-center w-full h-[370px] md:h-[432.5px]">
              <img
                src={loading}
                alt="loading"
                className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] animate-spin-slow"
              />
            </div>
          )}
          {data && (
            <>
              <div className="flex items-center">
                <FaChevronLeft className="trending-left-nav hidden md:block m-4 text-[rgb(202,202,202)] text-5xl bg-black/40 p-2 rounded cursor-pointer shadow-[0_0_2px_rgba(255,255,255,0.8)]" />
              </div>

              <Swiper
                spaceBetween={30}
                navigation={{
                  nextEl: ".trending-right-nav",
                  prevEl: ".trending-left-nav",
                }}
                breakpoints={{
                  360: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                  1200: {
                    slidesPerView: 5,
                  },
                  1440: {
                    slidesPerView: 6,
                  },
                  1800: {
                    slidesPerView: 7,
                  },
                }}
                modules={[Navigation]}
              >
                {data.results.map((result, index) => (
                  <SwiperSlide style={swiperStyle}>
                    <PosterCard
                      key={result.id}
                      posterImgPath={result.poster_path}
                      date={result.release_date || result.first_air_date}
                      rating={result.vote_average}
                      title={result.title || result.name}
                      tag={result.media_type}
                      posterCardData={data.results}
                      index={index}
                      movieId={result.id}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="flex items-center">
                <FaChevronRight className="trending-right-nav hidden md:block m-4 text-[rgb(202,202,202)] text-5xl bg-black/40 p-2 rounded cursor-pointer shadow-[0_0_2px_rgba(255,255,255,0.8)]" />
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
}

export default HomeTrendingSection;
