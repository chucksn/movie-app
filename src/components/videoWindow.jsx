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
    <div ref={videoWindowRef} className="video-window-bg">
      <div className="video-window">
        <span onClick={handleClose} className="close-icon">
          &times;
        </span>
        <iframe
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
