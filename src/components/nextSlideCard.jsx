function NextSlideCard({ posterImgPath, title, year }) {
  let image =
    posterImgPath === null
      ? "./no-poster.jpg"
      : `https://image.tmdb.org/t/p/w92${posterImgPath}`;
  return (
    <div className="next-slide-card flex text-white items-center shadow-[0_0_3px_black] bg-[rgb(20,20,20)]">
      <img
        src={image}
        alt="poster"
        className="next-slide-poster lg:max-w-[4rem] xl:max-w-[5.75rem]"
      />
      <div className="next-slide-details flex flex-col pl-4 leading-[1.6rem] text-[0.95rem]">
        <span className="next-slide-title">{title}</span>
        <span className="next-slide-date text-[gray]">{year}</span>
      </div>
    </div>
  );
}

export default NextSlideCard;
