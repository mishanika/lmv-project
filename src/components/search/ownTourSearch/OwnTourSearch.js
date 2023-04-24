import React from "react";
import "./OwnTourSearch.scss";
import { useState } from "react";

function OwnTourSearch() {
  const urlMakeOwnTour = "http://localhost:3030/ownTour";
  const [countries, setCountries] = useState([
    { textContent: "City, Country", className: "place-property", id: "add-place" },
  ]);

  const makeOwnTourRequest = () => {
    const data = {
      sessionId: localStorage.getItem("sessionId"),
      countries: [...document.querySelectorAll("#add-place")].map((country) => country.value),
      style: document.getElementById("add-place-style").value,
      duration: document.getElementById("add-place-days").value,
    };
    fetch(urlMakeOwnTour, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const addCountry = () => {
    const div = document.createElement("div");
    const input = document.createElement("input");

    div.textContent = "City, Country";
    div.classList.add("place-property");
    input.id = "add-place";
    div.append(input);
    document.querySelector(".place-country").append(div);
  };

  const cityRender = ({ textContent, className, id }) => (
    <div className={className}>
      {textContent}
      <input type="text" id={id} />
    </div>
  );

  return (
    <div className="own-tour">
      <div className="place-country">
        {countries.map(cityRender)}

        <span className="add-country-input" onClick={() => setCountries((prev) => [...prev, prev[0]])}>
          +
        </span>
      </div>

      <div className="place-property">
        {" "}
        Prefered style
        <input type="text" id="add-place-style" />
      </div>

      <div className="place-property">
        {" "}
        How much days?
        <input type="text" id="add-place-days" />
      </div>

      <div className="own-tour-request" onClick={() => makeOwnTourRequest()}>
        Make own tour request
      </div>
    </div>
  );
}

export default OwnTourSearch;
