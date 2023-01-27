import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Navigation } from "swiper";
import MainSlideCard from "../components/mainSlideCard";
import NextSlideCard from "../components/nextSlideCard";
import PosterCard from "../components/posterCard";
import { useDispatch, useSelector } from "react-redux";
import VideoWindow from "../components/videoWindow";

function Home() {
  const [nowPlayingList, setNowPlayingList] = useState(null);
  const [trendingList, setTrendingList] = useState(null);
  const [topRatedList, setTopRatedList] = useState(null);
  const [trendingTimeWindow, setTrendingTimeWindow] = useState("day");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [nextSlideList, setNextSlideList] = useState([]);
  const leftNavRef = useRef();
  const rightNavRef = useRef();
  const dispatch = useDispatch();
  const mainSlideVideoList = useSelector((state) => state.mainSlideVideoList);
  const mainSlideClicked = useSelector((state) => state.mainSlideCardClicked);

  const videoInfo =
    mainSlideClicked &&
    mainSlideVideoList.filter((videoInfo) => {
      return videoInfo.type === "Trailer";
    });

  const youtubeKey = videoInfo.length > 0 ? videoInfo[0].key : null;

  const videoPath = youtubeKey
    ? `https://www.youtube.com/embed/${youtubeKey}?&autoplay=1`
    : null;

  useEffect(() => {
    const getNowPlaying = async () => {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=5267b00cdf764bc75046eff3d46be3e2&language=en-US&page=1`
      );
      let data = await response.json();
      setNowPlayingList(data.results);
      setNextSlideList(
        data.results.slice(currentSlideIndex + 1, currentSlideIndex + 4)
      );
    };

    getNowPlaying();
  }, []);

  useEffect(() => {
    nowPlayingList &&
      setNextSlideList(
        nowPlayingList.slice(currentSlideIndex + 1, currentSlideIndex + 4)
      );
  }, [currentSlideIndex]);

  useEffect(() => {
    const getTrending = async () => {
      let response = await fetch(
        `https://api.themoviedb.org/3/trending/all/${trendingTimeWindow}?api_key=5267b00cdf764bc75046eff3d46be3e2`
      );
      let data = await response.json();
      setTrendingList(data.results);
    };
    getTrending();
  }, [trendingTimeWindow]);

  useEffect(() => {
    const getTopRated = async () => {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=5267b00cdf764bc75046eff3d46be3e2&language=en-US&page=1`
      );
      let data = await response.json();
      setTopRatedList(data.results);
    };
    getTopRated();
  }, []);

  const handleSlideChange = (swiper) => {
    setCurrentSlideIndex(swiper.realIndex);
  };

  const handleNav = () => {
    leftNavRef.current.style.display = "block";
    rightNavRef.current.style.display = "block";
  };

  const handleClickMainSlide = async (id) => {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=5267b00cdf764bc75046eff3d46be3e2&language=en-US&append_to_response=videos`
    );
    let data = await response.json();
    dispatch({
      type: "UPDATE_MAIN_SLIDE_VIDEO_LIST_DATA",
      payload: data.videos.results,
    });

    dispatch({
      type: "MAIN_SLIDE_CARD_CLICKED",
    });
    leftNavRef.current.style.display = "none";
    rightNavRef.current.style.display = "none";
  };

  const swiperStyle = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <div className="outlet-bg">
      <div className="home-main">
        <span className="tv-header">Now Playing</span>
        <div className="home-slideshow">
          <div className="main-slide-ctn">
            {nowPlayingList && (
              <>
                <i
                  onMouseEnter={handleNav}
                  ref={rightNavRef}
                  className="fa-solid fa-caret-right"
                ></i>
                <i
                  onMouseEnter={handleNav}
                  ref={leftNavRef}
                  className="fa-solid fa-caret-left"
                ></i>
                <Swiper
                  onSlideChange={handleSlideChange}
                  spaceBetween={0}
                  centeredSlides={true}
                  navigation={{
                    nextEl: ".fa-caret-right",
                    prevEl: ".fa-caret-left",
                  }}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: true,
                  }}
                  modules={[Autoplay, Navigation]}
                  className="mySwiper"
                >
                  {nowPlayingList.map((data) => (
                    <SwiperSlide>
                      <MainSlideCard
                        onClick={() => handleClickMainSlide(data.id)}
                        key={data.id}
                        posterImgPath={data.backdrop_path}
                        title={data.title}
                        year={data.release_date}
                        leftNavRef={leftNavRef}
                        rightNavRef={rightNavRef}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                {videoPath && mainSlideClicked && (
                  <VideoWindow videoUrl={videoPath} />
                )}
              </>
            )}
          </div>
          <div className="next-slide-ctn">
            <span className="up-next-txt">UP NEXT</span>
            <div className="next-slide-swiper-ctn">
              {nowPlayingList && (
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
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="trending-ctn">
        <span style={{ marginBottom: "1rem" }} className="tv-header">
          TRENDING
        </span>
        <div className="trending-inner-ctn">
          {trendingList && (
            <>
              <i className="fa-solid fa-chevron-left"></i>
              <Swiper
                spaceBetween={50}
                navigation={{
                  nextEl: ".fa-chevron-right",
                  prevEl: ".fa-chevron-left",
                }}
                breakpoints={{
                  320: {
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
                  1800: {
                    slidesPerView: 7,
                  },
                }}
                modules={[Navigation]}
              >
                {trendingList.map((data) => (
                  <SwiperSlide style={swiperStyle}>
                    <PosterCard
                      key={data.id}
                      posterImgPath={data.poster_path}
                      date={data.release_date || data.first_air_date}
                      rating={data.vote_average}
                      title={data.title || data.name}
                      type={data.media_type}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <i className="fa-solid fa-chevron-right"></i>
            </>
          )}
        </div>
      </div>
      <div className="top-rated-ctn">
        <span style={{ marginBottom: "1rem" }} className="tv-header">
          TOP RATED
        </span>
        <div className="top-rated-inner-ctn">
          {topRatedList && (
            <>
              <i className="fa-solid fa-angle-left"></i>
              <Swiper
                spaceBetween={50}
                navigation={{
                  nextEl: ".fa-angle-right",
                  prevEl: ".fa-angle-left",
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    navigation: false,
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
                  1800: {
                    slidesPerView: 7,
                  },
                }}
                modules={[Navigation]}
              >
                {topRatedList.map((data) => (
                  <SwiperSlide style={swiperStyle}>
                    <PosterCard
                      key={data.id}
                      posterImgPath={data.poster_path}
                      date={data.release_date || data.first_air_date}
                      rating={data.vote_average}
                      title={data.title || data.name}
                      type={data.media_type}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <i className="fa-solid fa-angle-right"></i>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
