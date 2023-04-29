function PosterCard({ posterImgPath, rating, title, date, type, onClick }) {
  let image =
    posterImgPath === null
      ? "./no-poster.jpg"
      : `https://image.tmdb.org/t/p/w500${posterImgPath}`;
  return (
    <div
      onClick={onClick}
      className="card flex flex-col justify-between bg-[rgb(61,61,61)] rounded-[0_0_0.5rem_0.5rem] cursor-pointer transition duration-[0.1s] hover:scale-[1.03] min-h-[21rem] w-[8rem] sm:min-h-[24rem] sm:w-[9.5rem] md:min-h-[25rem] md:w-[11rem] lg:min-h-[26rem] lg:w-[12rem]"
    >
      <img src={image} alt="poster" className="poster" />

      <span className="rating text-white font-roboto m-[0.6rem]">
        <span>
          <i className="fa-solid fa-star text-[goldenrod]"></i>
        </span>{" "}
        {rating}
      </span>
      <p className="movie-title text-white text-center px-[0.25rem] text-[0.8rem] sm:text-[0.9rem] font-prosto">
        {title}
      </p>
      <div className="type-date flex p-[0.4rem] m-[0.6rem] justify-between text-[rgb(163,163,163)] bg-[rgb(36,36,36)] rounded-[0.7rem] flex-col-reverse text-center sm:flex-row">
        <p className="type text-[rgb(255,255,128)] text-[0.8rem] sm:text-[0.9rem]">
          {type}
        </p>
        <span className="date">{date}</span>
      </div>
    </div>
  );
}
export default PosterCard;
