import loading from "../images/loading2.svg";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useGetTopRated } from "../hooks/getMovies";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper";
import PosterCard from "./posterCard";

function HomeTopRatedSection() {
  const { data, isLoading } = useGetTopRated();

  const swiperStyle = {
    display: "flex",
    justifyContent: "center",
  };
  return (
    <div className="top-rated-ctn my-8 md:my-12 px-8 sm:px-12 md:p-0">
      <span className="section-header text-[rgb(184,184,187)] text-center block mt-2 text-[1.15rem] sm:text-[1.3rem] md:text-[1.6rem] mb-[1rem]">
        TOP RATED
      </span>
      <div className="top-rated-inner-ctn flex">
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
                <FaChevronLeft className="topRated-left-nav hidden md:block m-4 text-[rgb(202,202,202)] text-5xl bg-black/40 p-2 rounded cursor-pointer shadow-[0_0_2px_rgba(255,255,255,0.8)]" />
              </div>

              <Swiper
                spaceBetween={30}
                navigation={{
                  nextEl: ".topRated-right-nav",
                  prevEl: ".topRated-left-nav",
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
                className="mySwiper"
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
                <FaChevronRight className="topRated-right-nav hidden md:block m-4 text-[rgb(202,202,202)] text-5xl bg-black/40 p-2 rounded cursor-pointer shadow-[0_0_2px_rgba(255,255,255,0.8)]" />
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
}

export default HomeTopRatedSection;
