import React, { useEffect, useState } from "react";
import "./OwnTourAdmin.scss";

const OwnTourAdmin = () => {
  const urlOwnTour = "http://localhost:3030/ownTourAdmin";
  const [ownTours, setOwnTours] = useState([]);

  useEffect(() => {
    fetch(urlOwnTour)
      .then((data) => data.json())
      .then((data) => {
        setOwnTours(data);
      });
  }, []);

  const ownTourRender = ({ name, surname, email, phone, countries, style, duration }) => (
    <div className="own-tour-admin-item">
      <span className="name">Name: {name}</span>
      <span className="surname">Surname: {surname}</span>
      <span className="email">Email: {email}</span>
      <span className="phone">Phone: {phone}</span>
      <span className="countries">
        Countries:
        {countries.map((country) => (
          <span>{country}, </span>
        ))}
      </span>
      <span className="style">Style: {style}</span>
      <span className="duration">Duration: {duration}</span>
      <div className="take-statement">Take a statement</div>
    </div>
  );
  return (
    <main className="own-tour-admin">
      <div className="own-tour-admin-inner-wrapper">{ownTours.map(ownTourRender)}</div>
    </main>
  );
};

export default OwnTourAdmin;
