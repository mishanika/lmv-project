import React, { useState } from "react";
import "./AddTours.scss";

function AddTours({ rerender }) {
  const urlPost = "http://localhost:3030/addTourAdmin";
  console.log("rendering");
  const addTour = () => {
    fetch(urlPost, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: document.querySelector("#add-name").value,
        url: document.querySelector("#add-url").value,
        duration: document.querySelector("#add-duration").value,
        cost: document.querySelector("#add-cost").value,
        destination: document.querySelector("#add-destination").value,
        style: document.querySelector("#add-style").value,
        type: document.querySelector("#add-type").value,
        date: document.querySelector("#add-date").value,
        continent: document.querySelector("#add-continent").value,
      }),
    }).then(() => {
      rerender();
    });
  };
  return (
    <div className="add-tour-btn">
      <div className="add-tour-inner-wrapper">
        <span className="add-name">
          Name
          <input type="text" id="add-name" />
        </span>
        <span className="add-url">
          Img url
          <input type="url" id="add-url" />
        </span>
        <span className="add-duration">
          Duration
          <input type="text" id="add-duration" />
        </span>
        <span className="add-cost">
          Cost
          <input type="text" id="add-cost" />
        </span>
        <span className="add-destination">
          Destination
          <input type="text" id="add-destination" />
        </span>
        <span className="add-style">
          Style
          <input type="text" id="add-style" />
        </span>
        <span className="add-type">
          Type
          <input type="text" id="add-type" />
        </span>
        <span className="add-date">
          Date
          <input type="date" id="add-date" />
        </span>
        <span className="add-continent">
          Continent
          <input type="text" id="add-continent" />
        </span>
        <div className="add-btn" onClick={() => addTour()}>
          Add Tour
        </div>
      </div>
    </div>
  );
}

export default AddTours;
