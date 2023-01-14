function CastCard({ castImgPath, castName, character }) {
  let castImg =
    castImgPath === null
      ? "./not_available.jpg"
      : `https://image.tmdb.org/t/p/w185${castImgPath}`;
  return (
    <div className="cast-profile">
      <img src={castImg} alt="profile" className="cast-image" />
      <span className="cast-name">
        {castName} <br />
        <span className="xter">'{character}'</span>
      </span>
    </div>
  );
}

export default CastCard;
