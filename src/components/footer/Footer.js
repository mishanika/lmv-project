import React, { useEffect } from "react";
import { text } from "./texts";
import { titles } from "./texts";
import "./Footer.scss";

function Footer() {
  const footerRender = ({ name }, id) => (
    <div className="footer-block" key={name}>
      <span className="footer-upper-text">{name}</span>
      <div className="footer-lower-text">{text[id].map(footerBlockRender)}</div>
    </div>
  );
  const footerBlockRender = ({ name }) => (
    <span className="footer-block-text">{name}</span>
  );
  useEffect(() => {
    let counter = 40;
    document.querySelectorAll(".media").forEach((item) => {
      item.style.backgroundPosition = -counter + "px 0";
      counter += 40;
    });
  }, []);
  return (
    <>
      <footer className="footer">
        <div className="wrapper">
          <div className="footer-inner">{titles.map(footerRender)}</div>
          <div className="contacts">
            <div className="tel">
              <span>Call us</span>
              <span>8-800-555-3535</span>
            </div>

            <div className="socials">
              <a href="#" className="media"></a>
              <a href="#" className="media"></a>
              <a href="#" className="media"></a>
              <a href="#" className="media"></a>
              <a href="#" className="media"></a>
              <a href="#" className="media"></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
