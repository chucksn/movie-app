import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Navigation } from "swiper";
import MainSlideCard from "./mainSlideCard";
import NextSlideCard from "./nextSlideCard";
import { useDispatch, useSelector } from "react-redux";
import loading from "../images/loading2.svg";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useGetNowPlaying } from "../hooks/getMovies";
import { getMovieById } from "../api/movieDataApi";
import VideoWindow from "./videoWindow";

function HomeMainSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [nextSlideList, setNextSlideList] = useState([]);
  const dispatch = useDispatch();
  const mainSlideVideoList = useSelector((state) => state.mainSlideVideoList);
  const mainSlideClicked = useSelector((state) => state.mainSlideCardClicked);
  const mainSlideHover = useSelector((state) => state.mainSlideCardHover);

  const { data, isLoading } = useGetNowPlaying();

  const videoInfo =
    mainSlideClicked &&
    mainSlideVideoList.filter((videoInfo) => {
      return videoInfo.type === "Trailer";
    });

  const youtubeKey = videoInfo.length > 0 ? videoInfo[0].key : null;

  const videoPath = youtubeKey
    ? `https://www.youtube.com/embed/${youtubeKey}?&autoplay=1`
    : null;

  const nowPlayingList = data?.results;

  useEffect(() => {
    if (nowPlayingList?.length > 0) {
      const reorderedList = [
        ...nowPlayingList.slice(currentSlideIndex + 1),
        ...nowPlayingList.slice(0, currentSlideIndex + 1),
      ];
      setNextSlideList(reorderedList.slice(0, 3));
    }
  }, [currentSlideIndex, nowPlayingList]);

  const handleSlideChange = (swiper) => {
    setCurrentSlideIndex(swiper.realIndex);
  };

  const handleSwiperUpdate = (swiper) => {
    swiper.autoplay.start();
  };

  const handleClickMainSlide = async (id) => {
    const data = await getMovieById({ id, tag: "movie" });
    dispatch({
      type: "UPDATE_MAIN_SLIDE_VIDEO_LIST_DATA",
      payload: data.videos.results,
    });

    dispatch({
      type: "MAIN_SLIDE_CARD_CLICKED",
    });
  };

  const handleMouseEnterSlideNav = () => {
    dispatch({ type: "MAIN_SLIDE_CARD_MOUSE_ENTER" });
  };

  const handleMouseLeaveSlideNav = () => {
    dispatch({ type: "MAIN_SLIDE_CARD_MOUSE_LEAVE" });
  };

  return (
    <div className="home-main flex w-full flex-col m-auto">
      <span className="section-header text-[rgb(184,184,187)] text-center block mt-2 text-[1.15rem] sm:text-[1.3rem] md:text-[1.6rem]">
        Now Playing
      </span>
      <div className="home-slideshow flex justify-between">
        <div
          className={`main-slide-ctn flex relative w-full lg:w-[65%] lg:ml-4 `}
        >
          <>
            {isLoading && (
              <div className="flex justify-center items-center w-full h-[230px] md:h-[400px] lg:w-[780px] lg:h-[438.75px]">
                <img
                  src={loading}
                  alt="loading"
                  className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] animate-spin-slow"
                />
              </div>
            )}

            {data && (
              <>
                <FaChevronRight
                  className={`main-slide-right-nav absolute right-0 top-[50%] mr-2 text-[rgb(202,202,202)] text-5xl z-[4] bg-black/40 p-2 rounded cursor-pointer shadow-[0_0_2px_rgba(255,255,255,0.8)] ${
                    mainSlideHover ? "lg:block" : "hidden"
                  }`}
                  onMouseEnter={handleMouseEnterSlideNav}
                  onMouseLeave={handleMouseLeaveSlideNav}
                />
                <FaChevronLeft
                  className={`main-slide-left-nav absolute left-0 top-[50%] ml-2 text-[rgb(202,202,202)] text-5xl z-[4] bg-black/40 p-2 rounded cursor-pointer shadow-[0_0_2px_rgba(255,255,255,0.8)] ${
                    mainSlideHover ? "lg:block" : "hidden"
                  }`}
                  onMouseEnter={handleMouseEnterSlideNav}
                  onMouseLeave={handleMouseLeaveSlideNav}
                />
              </>
            )}
            {data && (
              <Swiper
                onSlideChange={handleSlideChange}
                onUpdate={handleSwiperUpdate}
                spaceBetween={30}
                centeredSlides={true}
                navigation={{
                  nextEl: ".main-slide-right-nav",
                  prevEl: ".main-slide-left-nav",
                }}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, Navigation]}
                className="mySwiper"
              >
                {data.results.map((data) => (
                  <SwiperSlide>
                    <MainSlideCard
                      onClick={() => handleClickMainSlide(data.id)}
                      key={data.id}
                      posterImgPath={data.backdrop_path}
                      title={data.title}
                      year={data.release_date}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            {videoPath && mainSlideClicked && (
              <VideoWindow videoUrl={videoPath} />
            )}
          </>
        </div>
        <div className="next-slide-ctn p-2 hidden lg:flex lg:w-[35%] lg:flex-col">
          <span className="up-next-txt text-[yellow] font-robotoMono text-xl font-semibold pl-4">
            UP NEXT
          </span>
          <div className="next-slide-swiper-ctn p-4 flex flex-col gap-y-[0.6rem]">
            <>
              {nextSlideList.map((data, index) => (
                <NextSlideCard
                  posterImgPath={data.poster_path}
                  key={index}
                  title={data.title}
                  year={data.release_date}
                />
              ))}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeMainSection;
