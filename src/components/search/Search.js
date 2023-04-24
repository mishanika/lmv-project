import React, { useEffect } from "react";
import { useState } from "react";
import "./Search.scss";
import { continents, levels, types } from "./text";
import { styles } from "./text";
import Comment from "./comment/Comment";
import OwnTourSearch from "./ownTourSearch/OwnTourSearch";

function Search() {
  const url = "http://localhost:3030/tours";
  const urlAdd = "http://localhost:3030/addTour";
  const urlGetComments = "http://localhost:3030/comments";
  const [tours, setTours] = useState([]);
  const [comments, setComments] = useState({ comments: [] });

  const getComments = (id) => {
    fetch(urlGetComments, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setComments(data);
      });
  };

  const getTours = async () => {
    return await (await fetch(url)).json();
  };
  useEffect(() => {
    getTours().then((data) => setTours(data));
  }, []);

  const addToBasket = async (id) => {
    const response = await fetch(urlAdd, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        sessionId: localStorage.getItem("sessionId"),
      }),
    });
  };

  const handler = async () => {
    const duration = document.querySelector(".duration-range").value;
    const cost = document.querySelector(".budget-range").value;
    const departingAfter = document.querySelector(".departing-after-input").value;
    const departingBefore = document.querySelector(".departing-before-input").value;

    const styles = [...document.querySelectorAll(".styles-item-input")]
      .filter((item) => {
        return item.checked === true;
      })
      .map((item) => {
        return item.id;
      });
    const types = [...document.querySelectorAll(".types-item-input")]
      .filter((item) => {
        return item.checked === true;
      })
      .map((item) => {
        return item.id;
      });
    const destinations = [...document.querySelectorAll(".destinations-item-input")]
      .filter((item) => {
        return item.checked === true;
      })
      .map((item) => {
        return item.id;
      });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        duration: duration,
        cost: cost,
        style: styles,
        type: types,
        departingAfter: departingAfter,
        departingBefore: departingBefore,
        continent: destinations,
      }),
    });
    setTours(await response.json());
  };

  const toursRender = ({ name, url, duration, cost, destination, style, type, date, id }) => (
    <div className="tour-item">
      <img
        src={url}
        className="tour-item-img"
        onClick={() => {
          veilOnOff();
          getComments(id);
        }}
      />
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
        <div className="add-to-cart" onClick={() => addToBasket(id)}>
          Add to cart
        </div>
      </div>
    </div>
  );

  const continentsRender = ({ name }) => (
    <div className="item">
      <input type="checkbox" name="" id={name} />
      <span>{name}</span>
    </div>
  );
  const stylesRender = ({ name }) => (
    <div className="styles-item item">
      <input type="checkbox" name="" id={name} className="styles-item-input" onClick={() => handler()} />
      <span>{name}</span>
    </div>
  );
  const typesRender = ({ name }) => (
    <div className="types-item item">
      <input type="checkbox" name="" id={name} className="types-item-input" onClick={() => handler()} />
      <span>{name}</span>
    </div>
  );
  const destinationsRender = ({ name }) => (
    <div className="destinations-item item">
      <input type="checkbox" name="" id={name} className="destinations-item-input" onClick={() => handler()} />
      <span>{name}</span>
    </div>
  );

  const commentsRender = ({ rating, comment }) => (
    <div className="comment-item">
      <span className="rating">{rating}/5</span>
      <span className="comment">{comment}</span>
    </div>
  );

  const veilOnOff = () => {
    let veil = getComputedStyle(document.querySelector(".veil")).display;
    document.querySelector(".veil").style.display = veil == "none" ? "flex" : "none";
    document.querySelector(".comments-wrapper").style.display = veil == "none" ? "grid" : "none";
  };

  return (
    <>
      <div className="veil" onClick={() => veilOnOff()}></div>
      <div className="comments-wrapper">
        {comments.comments.map(commentsRender)}
        <Comment id={comments.id} setComments={setComments} />
      </div>
      <main className="search-main">
        <div className="search-side-panel">
          <div className="search-tour-date">
            <span>Tour start date</span>
            <div className="departing-after">
              <input
                type="date"
                className="departing-after-input"
                placeholder="Departing after..."
                onChange={() => handler()}
              />
            </div>
            <div className="departing-before">
              <input
                type="date"
                className="departing-before-input"
                placeholder="Departing before..."
                onChange={() => handler()}
              />
            </div>
          </div>
          <div className="search-budget">
            <span>Budget</span>
            <input
              type="range"
              min="100"
              max="10000"
              defaultValue="10000"
              className="budget-range"
              id="budget-range"
              onInput={() => handler()}
            />
          </div>
          <div className="search-duration">
            <span>Duration</span>
            <input
              type="range"
              min="1"
              max="50"
              defaultValue="50"
              className="duration-range"
              id="duration-range"
              onChange={() => handler()}
            />
          </div>
          <div className="search-destinations">
            <span>Destinations</span>
            {continents.map(destinationsRender)}
          </div>
          <div className="search-travel-styles">
            <span>Travel styles</span>
            {styles.map(stylesRender)}
          </div>
          <div className="search-tour-type">
            <span>Tour types</span>
            {types.map(typesRender)}
          </div>
          <div className="search-service-level">
            <span>Service level</span>
            {levels.map(continentsRender)}
          </div>
        </div>
        <div className="search-tours">
          {tours.map(toursRender)}
          <OwnTourSearch />
        </div>
      </main>
    </>
  );
}

export default Search;
