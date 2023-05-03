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
    <div
      className="cast-profile relative flex flex-col text-white items-center cursor-pointer xl:max-w-[6.5rem]"
      onClick={onClick}
    >
      <img
        src={castImg}
        alt="profile"
        className="cast-image mb-[0.3rem] p-[0.3rem] rounded-[1.2rem] object-contain"
      />
      <span className="cast-name p-[0.3rem] text-[0.6rem] sm:text-[0.7rem]">
        {castName}
      </span>
      {clickedCard === index && tooltipVisibility && (
        <span className="character-tooltip absolute text-[0.75rem] text-white bg-[rgb(0,87,87)] p-[0.2rem] rounded-lg top-[50%]">
          <span className="character-txt text-[rgb(235,235,0)] font-medium">
            Character:{" "}
          </span>
          {character}
        </span>
      )}
    </div>
  );
};

export default CastCard;
