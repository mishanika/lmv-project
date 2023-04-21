import React, { useState } from "react";
import { firstSection, fourthSection, secondSection, thirdSection } from "./text";
import "./Classic.scss";

function Classic() {
  const [sliderPx, setSliderPx] = useState(0);

  const sliderRight = () => {
    if (!(sliderPx == -2440)) {
      document.querySelectorAll(".fourth-section-item").forEach((item) => {
        item.style.left = sliderPx - 305 + "px";
      });
      setSliderPx((prev) => prev - 305);
    }
  };

  const sliderLeft = () => {
    if (!(sliderPx == 0)) {
      document.querySelectorAll(".fourth-section-item").forEach((item) => {
        item.style.left = sliderPx + 305 + "px";
      });
      setSliderPx((prev) => prev + 305);
    }
  };

  const secondSectionRender = ({ name }) => <div className="continent">{name}</div>;

  const thirdSectionRender = ({ name, description }) => (
    <div className="third-section-item">
      <span>{name}</span>
      <span>{description}</span>
    </div>
  );
  const fourthSectionRender = ({ url, name, description }) => (
    <div className="fourth-section-item">
      <img src={url} alt="" className="fourth-section-item-img" />
      <span className="fourth-section-item-title">{name}</span>
      <span className="fourth-section-item-description">{description}</span>
    </div>
  );
  return (
    <main className="classic-main">
      <div className="first-section">
        <div className="first-section-text">
          <span className="first-section-title">{firstSection.classic}</span>
          <span className="first-section-description">{firstSection.lookingFor}</span>
          <div className="first-section-btn">{firstSection.seAll}</div>
        </div>
        <img
          src="https://media.gadventures.com/media-server/dynamic/admin/content_pages/2022_classic_hero.jpg"
          alt=""
          className="first-section-img"
        />
      </div>
      <div className="second-section">
        <div className="second-section-inner-wrapper">
          <span className="second-section-title">{secondSection[0].ourGreatest}</span>
          <div className="continents">{secondSection[1].map(secondSectionRender)}</div>
          <div className="second-section-btn">{secondSection[0].viewTours}</div>
        </div>
      </div>
      <div className="third-section">
        <div className="third-section-img"></div>
        <div className="third-section-text">
          <span className="third-section-title">{thirdSection[0].reasons}</span>

          <div className="third-section-description">{thirdSection[1].map(thirdSectionRender)}</div>
        </div>
      </div>
      <div className="fourth-section">
        <div className="fourth-section-text">
          <span>{fourthSection[0].seeAndDo}</span>
          <span>{fourthSection[0].getReady}</span>
        </div>
        <div className="other-tours-wrapper">
          <div className="slider left" onClick={sliderLeft}></div>
          <div className="other-tours">{fourthSection[1].map(fourthSectionRender)}</div>
          <div className="slider right" onClick={sliderRight}></div>
        </div>
      </div>
    </main>
  );
}

export default Classic;
