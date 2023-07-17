import loading from "../images/loading2.svg";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getTopRated } from "../api/movieData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper";
import PosterCard from "./posterCard";

function HomeTopRatedSection() {
  const topRatedQuery = useQuery({
    queryKey: ["top-rated"],
    queryFn: getTopRated,
  });

  const swiperStyle = {
    display: "flex",
    justifyContent: "center",
  };
  return (
    <div className="top-rated-ctn my-8 md:my-12 px-8 sm:px-12 md:p-0">
      <span
        style={{ marginBottom: "1rem" }}
        className="section-header text-[rgb(184,184,187)] text-center block mt-2 text-[1.15rem] sm:text-[1.3rem] md:text-[1.6rem]"
      >
        TOP RATED
      </span>
      <div className="top-rated-inner-ctn flex">
        <>
          {topRatedQuery.isLoading && (
            <div className="flex justify-center items-center w-full h-[370px] md:h-[432.5px]">
              <img
                src={loading}
                alt="loading"
                className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] animate-spin-slow"
              />
            </div>
          )}
          {topRatedQuery.data && (
            <>
              <div className="flex items-center">
                <FaChevronLeft className="top-rated-slide-left-nav hidden md:block m-4 text-[rgb(202,202,202)] text-5xl bg-black/40 p-2 rounded cursor-pointer shadow-[0_0_2px_rgba(255,255,255,0.8)]" />
              </div>

              <Swiper
                spaceBetween={30}
                navigation={{
                  nextEl: ".top-rated-slide-right-nav",
                  prevEl: ".top-rated-slide-left-nav",
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
                    navigation: true,
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
                {topRatedQuery.data.results.map((data, index) => (
                  <SwiperSlide style={swiperStyle}>
                    <PosterCard
                      key={data.id}
                      posterImgPath={data.poster_path}
                      date={data.release_date || data.first_air_date}
                      rating={data.vote_average}
                      title={data.title || data.name}
                      tag="movie"
                      posterCardData={topRatedQuery.data.results}
                      index={index}
                      movieId={data.id}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="flex items-center">
                <FaChevronRight className="top-rated-slide-right-nav hidden md:block m-4 text-[rgb(202,202,202)] text-5xl bg-black/40 p-2 rounded cursor-pointer shadow-[0_0_2px_rgba(255,255,255,0.8)]" />
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
}

export default HomeTopRatedSection;
