import React from "react";
import "./Main.scss";
import { text } from "./text";
import { tours } from "./tours";

function Main() {
  const toursRender = ({ url, name, description }) => (
    <div className="tour-block" key={url}>
      <img src={url} alt={name} />
      <div className="text">
        <span className="tour-name">{name}</span>
        <span className="tour-description">{description}</span>
      </div>
      <span className="learn-more">Learn more &gt;</span>
    </div>
  );
  return (
    <div className="main-page">
      <div className="tours">
        <div className="tours-description">
          <span>{text.travelStyles}</span>
          <span>{text.theRightTour}</span>
          <span>{text.allAdventures}</span>
        </div>
        <div className="tours-wrapper">{tours.map(toursRender)}</div>
      </div>
    </div>
  );
}

export default Main;
