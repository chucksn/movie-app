function Footer() {
  let year = new Date().getFullYear();
  return (
    <div className="footer flex flex-col bg-black/90 p-[4rem_2rem_2rem_2rem] ">
      <div className="footer-links flex justify-center text-white text-xl">
        <a
          href="https://twitter.com/chuckfugee?t=fDFd4mEuIOOvFJLhSXnFNA&s=09"
          rel="noreferrer"
          target="_blank"
          className="mx-8"
        >
          <i className="fa-brands fa-twitter"></i>
        </a>

        <a
          href="https://www.tiktok.com/@chuckx892?_t=8YbFb8cvrSI&_r=1"
          rel="noreferrer"
          target="_blank"
          className="mx-8"
        >
          <i className="fa-brands fa-tiktok"></i>
        </a>
        <a href="#facebook" rel="noreferrer" target="_self" className="mx-8">
          <i className="fa-brands fa-facebook"></i>
        </a>
      </div>
      <div className="footer-text text-[lightgrey] text-center mt-8">
        <span className="top-text">Developed with ReactJS</span>
        <br />
        <br />
        <small>Designed and Developed By Chucks N &#169;{year}</small>
      </div>
    </div>
  );
}

export default Footer;
