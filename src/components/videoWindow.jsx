import { useRef } from "react";

function VideoWindow({ videoUrl, setTrailerBtn }) {
  const videoWindowRef = useRef();
  const handleClose = () => {
    videoWindowRef.current.style.display = "none";
    setTrailerBtn(false);
  };
  return (
    <div ref={videoWindowRef} className="video-window-bg">
      <div className="video-window">
        <span onClick={handleClose} className="close-icon">
          {" "}
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
