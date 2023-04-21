import React, { useEffect, useState } from "react";
import "./Basket.scss";
import donikghoul from "../../assets/png/donikghoul.png";
import { update } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux/es/exports";

function Basket() {
  const url = "http://localhost:3030/basketTours";
  const urlDelete = "http://localhost:3030/deleteTour";
  const urlBook = "http://localhost:3030/book";
  const [tours, setTours] = useState([]);

  const getTours = async () => {
    return await (
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: localStorage.getItem("sessionId"),
        }),
      })
    ).json();
  };

  useEffect(() => {
    getTours().then((data) => setTours(data));
  }, []);

  const deleteFromBasket = async (id) => {
    const response = await fetch(urlDelete, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        sessionId: localStorage.getItem("sessionId"),
      }),
    });
    const json = await response.json();

    setTours((prev) => prev.filter((tour) => json.includes(tour.id)));
  };

  const book = async (id) => {
    const response = await fetch(urlBook, {
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

  const toursRender = ({ name, url, duration, cost, destination, style, type, date, id }) => (
    <div className="tour-item">
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
        <div className="cart-btn">
          <div className="delete-from-cart" onClick={() => deleteFromBasket(id)}>
            Delete from cart
          </div>
          <div className="book" onClick={() => book(id)}>
            Book
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <main className="basket-main">
      <div className="basket">{tours.map(toursRender)}</div>
    </main>
  );
}

export default Basket;
