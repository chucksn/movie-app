function PosterCard() {
  return (
    <div className="card">
      <img
        src="https://image.tmdb.org/t/p/w500/uO2yU3QiGHvVp0L5e5IatTVRkYk.jpg"
        alt="poster"
        className="poster"
      />

      <span className="rating">
        <span>
          <i className="fa-solid fa-star"></i>
        </span>{" "}
        8.6
      </span>
      <p className="movie-title">Avatar</p>
      <div className="type-date">
        <p className="type">Movie</p>
        <span className="date">2022-11-24</span>
      </div>
    </div>
  );
}

export default PosterCard;
