function PosterCard({ posterImgPath, rating, title, date, type }) {
  let image = `https://image.tmdb.org/t/p/w500${posterImgPath}`;
  return (
    <div className="card">
      <img src={image} alt="poster" className="poster" />

      <span className="rating">
        <span>
          <i className="fa-solid fa-star"></i>
        </span>{" "}
        {rating}
      </span>
      <p className="movie-title">{title}</p>
      <div className="type-date">
        <p className="type">{type}</p>
        <span className="date">{date}</span>
      </div>
    </div>
  );
}
export default PosterCard;
