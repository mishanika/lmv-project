import React, { useEffect, useState } from "react";
import "./Review.scss";

function Review() {
  const url = "http://localhost:3030/tours";
  const [tours, setTours] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((data) => data.json())
      .then((data) => setTours(data));
  }, []);

  const veilOnOff = () => {
    let veil = getComputedStyle(document.querySelector(".veil")).display;
    document.querySelector(".veil").style.display = veil == "none" ? "flex" : "none";
    document.querySelector(".comments-wrapper").style.display = veil == "none" ? "grid" : "none";
  };

  const toursRender = ({ name, url, duration, cost, destination, style, type, date }) => (
    <div
      className="tour-item"
      onClick={() => {
        veilOnOff();
      }}
    >
      <img src={url} className="tour-item-img" />
      <div className="tour-item-description">
        <div className="tour-item-description-upper">
          <span className="tour-style">{style}</span>
          <span className="search-tour-name">{name}</span>
          <span className="tour-duration">
            {duration} days <span className="tour-destination">{destination}</span>
          </span>
        </div>
        <div className="tour-item-description-lower">
          <span className="tour-type">{type}</span>
          <div className="date-cost-wrapper">
            <span className="tour-cost">{cost} €</span>
            <span class="tour-date">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const commentsRender = ({ rating, comment }) => (
    <div className="comment-item">
      <div className="comment-item-inner-wrapper">
        <span className="rating">{rating}</span>
        <span className="comment">{comment}</span>
      </div>
    </div>
  );

  return (
    <>
      <div className="veil" onClick={() => veilOnOff()}></div>
      <div className="comments-wrapper">
        {comments.map(toursRender)} <div className="add-comment">Add comment</div>{" "}
      </div>
      <main className="review-main">{tours.map(toursRender)}</main>
    </>
  );
}

export default Review;
