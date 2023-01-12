function CastCard(castImgPath, castName, character) {
  let image =
    castImgPath === null
      ? "./no-poster.jpg"
      : `https://image.tmdb.org/t/p/w500${castImgPath}`;
  return (
    <div className="cast-profile">
      <img src={image} alt="profile" className="cast-image" />
      <span className="cast-name">
        {castName} '{character}'
      </span>
    </div>
  );
}

export default CastCard;
