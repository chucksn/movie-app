import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function VideoWindow({ videoUrl }) {
  const videoWindowRef = useRef();
  const dispatch = useDispatch();
  const mainSlideCardClicked = useSelector(
    (state) => state.mainSlideCardClicked
  );

  useEffect(() => {
    if (mainSlideCardClicked)
      videoWindowRef.current.style.backgroundColor = "rgba(0,0,0,0.8)";
  }, [mainSlideCardClicked]);

  const handleClose = () => {
    videoWindowRef.current.style.display = "none";
    dispatch({ type: "TRAILER_BTN_CLICK_RESET" });
    dispatch({ type: "MAIN_SLIDE_CARD_CLICK_RESET" });
  };
  return (
    <div
      ref={videoWindowRef}
      className="video-window-bg fixed left-0 top-0 w-full h-full z-[8] "
    >
      <div className="video-window w-full sm:w-[80%] h-full bg-black my-32 sm:my-44 lg:my-20 mx-auto p-4 md:pt-0">
        <span
          onClick={handleClose}
          className="close-icon float-right text-white font-extrabold text-[1.8rem] cursor-pointer"
        >
          &times;
        </span>
        <iframe
          className="iframe aspect-video"
          title="trailer"
          src={videoUrl}
          width="100%"
          height="auto"
          allowFullScreen
          allow="autoplay"
          frameborder="0"
        ></iframe>
      </div>
    </div>
  );
}

export default VideoWindow;
