import React, { useEffect, useRef, useState } from "react";
import AddTours from "./addTours/AddTours";
import "./ToursAdmin.scss";

function ToursAdmin() {
  const url = "http://localhost:3030/tours";
  const urlPost = "http://localhost:3030/tourEdit";
  const [tours, setTours] = useState([]);
  const [rerender, setRerender] = useState(false);
  const tourRefs = useRef([]);

  const editTour = (id) => {
    console.log(tourRefs);
    const updatedTour = {
      id: id,
      style: tourRefs.current[id].style.textContent,
      name: tourRefs.current[id].name.textContent,
      duration: parseInt(tourRefs.current[id].duration.textContent),
      destination: tourRefs.current[id].destination.textContent,
      type: tourRefs.current[id].type.textContent,
      cost: parseInt(tourRefs.current[id].cost.textContent),
      date: tourRefs.current[id].date.textContent,
    };

    fetch(urlPost, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updatedTour,
      }),
    });
  };

  const getTours = async () => {
    return fetch(url).then((data) => data.json());
  };
  useEffect(() => {
    getTours().then((data) => setTours(data));
  }, [rerender]);

  const handleRerender = () => {
    setRerender((prev) => !prev);
  };

  const toursRender = ({ name, url, duration, cost, destination, style, type, date, id }) => {
    if (!tourRefs[id]) {
      tourRefs[id] = {};
    }
    return (
      <div className="tour-item">
        <img src={url} className="tour-item-img" />
        <div className="tour-item-description">
          <div className="tour-item-description-upper">
            <span
              className="tour-style"
              contentEditable={true}
              suppressContentEditableWarning={true}
              ref={(el) => (tourRefs.current[id] = { ...tourRefs.current[id], style: el })}
            >
              {style}
            </span>
            <span
              className="search-tour-name"
              contentEditable={true}
              suppressContentEditableWarning={true}
              ref={(el) => (tourRefs.current[id] = { ...tourRefs.current[id], name: el })}
            >
              {name}
            </span>
            <span
              className="tour-duration"
              contentEditable={true}
              suppressContentEditableWarning={true}
              ref={(el) => (tourRefs.current[id] = { ...tourRefs.current[id], duration: el })}
            >
              {duration} days{" "}
              <span
                className="tour-destination"
                contentEditable={true}
                suppressContentEditableWarning={true}
                ref={(el) => (tourRefs.current[id] = { ...tourRefs.current[id], destination: el })}
              >
                {destination}
              </span>
            </span>
          </div>
          <div className="tour-item-description-lower">
            <span
              className="tour-type"
              contentEditable={true}
              suppressContentEditableWarning={true}
              ref={(el) => (tourRefs.current[id] = { ...tourRefs.current[id], type: el })}
            >
              {type}
            </span>
            <div className="date-cost-wrapper">
              <span
                className="tour-cost"
                contentEditable={true}
                suppressContentEditableWarning={true}
                ref={(el) => (tourRefs.current[id] = { ...tourRefs.current[id], cost: el })}
              >
                {cost} €
              </span>
              <span
                className="tour-date"
                contentEditable={true}
                suppressContentEditableWarning={true}
                ref={(el) => (tourRefs.current[id] = { ...tourRefs.current[id], date: el })}
              >
                {date}
              </span>
            </div>
          </div>
          <div className="edit-tour-btn" onClick={() => editTour(id)}>
            Save Changes
          </div>
        </div>
      </div>
    );
  };
  return (
    <main className="admin-tours-main">
      <div className="admin-btns">
        <div className="add-tour-btn"></div>
      </div>
      <div className="admin-tours">
        {tours.map(toursRender)}
        <AddTours rerender={handleRerender} />
      </div>
    </main>
  );
}

export default ToursAdmin;
