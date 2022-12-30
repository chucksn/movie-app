function Footer() {
  let year = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="footer-links">
        <a href="https://github.com/chucksn" rel="noreferrer" target="_blank">
          <i className="fa-brands fa-github"></i>
        </a>
        <a
          href="https://twitter.com/chuckfugee?t=fDFd4mEuIOOvFJLhSXnFNA&s=09"
          rel="noreferrer"
          target="_blank"
        >
          <i className="fa-brands fa-twitter"></i>
        </a>
        <a
          href="https://www.tiktok.com/@chuckx892?_t=8YbFb8cvrSI&_r=1"
          rel="noreferrer"
          target="_blank"
        >
          <i className="fa-brands fa-tiktok"></i>
        </a>
      </div>
      <div className="footer-text">
        <span>Developed with ReactJS</span>
        <br />
        <small>Designed and Developed By Chucks N &#169;{year}</small>
      </div>
    </div>
  );
}

export default Footer;
