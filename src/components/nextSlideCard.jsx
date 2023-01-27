function NextSlideCard({ posterImgPath, title, year }) {
  let image =
    posterImgPath === null
      ? "./no-poster.jpg"
      : `https://image.tmdb.org/t/p/w92${posterImgPath}`;
  return (
    <div className="next-slide-card">
      <img src={image} alt="poster" className="next-slide-poster" />
      <div className="next-slide-details">
        <span className="next-slide-title">{title}</span>
        <span style={{ color: "gray" }} className="next-slide-date">
          {year}
        </span>
      </div>
    </div>
  );
}

export default NextSlideCard;
