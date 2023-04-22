import React, { useEffect, useState } from "react";
import "./AddClients.scss";

function AddClients() {
  const urlGetClients = "http://localhost:3030/clients";
  const urlRegister = "http://localhost:3030/userRegister";
  const urlBasketOrBooked = "http://localhost:3030/basketOrBooked";
  const urlAdminDelete = "http://localhost:3030/adminDelete";

  const [clients, setClients] = useState([]);
  const [basketOrBooked, setBasketOrBooked] = useState([]);
  const [activeId, setActiveId] = useState(0);
  const [amount, setAmount] = useState(0);

  const addClient = () => {
    const data = {
      name: document.querySelector("#add-name").value,
      surname: document.querySelector("#add-surname").value,
      email: document.querySelector("#add-email").value,
      phone: document.querySelector("#add-phone").value,
      password: document.querySelector("#add-password").value,
    };
    fetch(urlRegister, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const clientsRender = ({ url, name, surname, email, phone, id }) => (
    <div className="client">
      <div className="client-upper-part">
        <img src={url} alt="" />
        <div className="client-data">
          <span className="client-name">{name}</span>
          <span className="client-surname">{surname}</span>
          <span className="client-email">{email}</span>
          <span className="client-phone">{phone}</span>
        </div>
      </div>
      <div className="client-tour-data">
        <span
          className="client-basket add-btn"
          id="basket"
          onClick={(e) => {
            getClientBasketOrBooked(e, id);
            veilOnOff();
            setActiveId(id);
          }}
        >
          Client cart
        </span>
        <span
          className="client-bookedTours add-btn"
          id="booked"
          onClick={(e) => {
            getClientBasketOrBooked(e, id);
            veilOnOff();
            setActiveId(id);
          }}
        >
          Client booked tours
        </span>
      </div>
    </div>
  );

  const getClientBasketOrBooked = (e, id) => {
    const data = {
      target: e.currentTarget.id,
      id: id,
    };
    fetch(urlBasketOrBooked, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((data) => {
        setBasketOrBooked(data);
      });
  };

  const deleteFromBasketOrBooked = (e, id) => {
    const data = {
      tourId: id,
      userId: activeId,
      target: e.currentTarget.id,
    };
    fetch(urlAdminDelete, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(setBasketOrBooked((prev) => prev.filter((tour) => tour.id != id)));
  };

  const toursRender = ({ name, url, duration, cost, destination, style, type, date, id, target }) => (
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
          {target == "booked" ? (
            <div className="book" id="deleteBooked" onClick={(e) => deleteFromBasketOrBooked(e, id)}>
              Delete booked
            </div>
          ) : (
            <div className="delete-from-cart" id="deleteBasket" onClick={(e) => deleteFromBasketOrBooked(e, id)}>
              Delete from cart
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const veilOnOff = () => {
    let veil = getComputedStyle(document.querySelector(".veil")).display;
    document.querySelector(".veil").style.display = veil == "none" ? "flex" : "none";
    document.querySelector(".basketOrBooked-wrapper").style.display = veil == "none" ? "grid" : "none";
  };

  useEffect(() => {
    fetch(urlGetClients, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount }),
    })
      .then((data) => data.json())
      .then((data) => {
        setClients(data);
        setAmount(amount + data.length);
      });
  }, []);
  return (
    <>
      <div className="veil" onClick={() => veilOnOff()}></div>
      <div className="basketOrBooked-wrapper">{basketOrBooked.map(toursRender)}</div>
      <main className="client-main">
        <div className="client-inner-wrapper">
          <div className="add-client-wrapper">
            <span className="add-name">
              Name
              <input type="text" id="add-name" />
            </span>
            <span className="add-surname">
              Surname
              <input type="text" id="add-surname" />
            </span>
            <span className="add-email">
              Email
              <input type="text" id="add-email" />
            </span>
            <span className="add-phone">
              Phone
              <input type="text" id="add-phone" />
            </span>
            <span className="add-password">
              Password
              <input type="text" id="add-password" />
            </span>

            <div className="add-btn" onClick={() => addClient()}>
              Add Client
            </div>
          </div>
          <div className="clients">{clients.map(clientsRender)}</div>
        </div>
      </main>
    </>
  );
}

export default AddClients;
