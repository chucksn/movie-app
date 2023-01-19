const CastCard = ({
  castImgPath,
  castName,
  character,
  onClick,
  index,
  clickedCard,
  tooltipVisibility,
}) => {
  let castImg =
    castImgPath === null
      ? "./not_available.jpg"
      : `https://image.tmdb.org/t/p/w185${castImgPath}`;
  return (
    <div className="cast-profile" onClick={onClick}>
      <img src={castImg} alt="profile" className="cast-image" />
      <span className="cast-name">{castName}</span>
      {clickedCard === index && tooltipVisibility && (
        <span className="character-tooltip">
          <span className="character-txt">Character:</span>
          {character}
        </span>
      )}
    </div>
  );
};

export default CastCard;
