import React, { useEffect, useState } from "react";
import { firstSection, fourthSection, secondSection, thirdSection } from "./text";
import "./Roamies.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../../redux/slices/selectSlice";

function Roamies() {
  const continents = useSelector((state) => state.selectSlice);
  console.log(continents);
  const dispatch = useDispatch();

  const [sliderPercent, setSliderPercent] = useState(0);
  const [sliderPx, setSliderPx] = useState(0);

  useEffect(() => {
    let active = continents.findIndex((item) => item.selected === true);
    document.querySelectorAll(".roamies-continent").forEach((item, id) => {
      if (id == active) {
        item.style.background = "#2d3047";
        item.style.color = "#fff";
      } else {
        item.style.background = "#fff";
        item.style.color = "#2d3047";
      }
    });
  }, [continents]);

  const activate = (id, selected) => {
    dispatch(update({ id, selected }));
  };

  const bigSliderRight = () => {
    const starSign = document.querySelector(".star-sign");
    if (sliderPercent > -900) {
      document.querySelectorAll(".big-photo-item").forEach((item, id) => {
        item.style.left = sliderPercent - 100 + "%";
      });

      document.querySelector(".star-title").textContent = thirdSection[sliderPercent / -100 + 1][0];
      document.querySelector(".star-description").textContent = thirdSection[sliderPercent / -100 + 1][1];

      setSliderPercent((prev) => prev - 100);
    } else {
      document.querySelectorAll(".big-photo-item").forEach((item, id) => {
        item.style.transition = "2s all ease-in-out";
        item.style.left = "0%";
        item.style.transition = "0.5s all ease-in-out";
      });
      document.querySelector(".star-title").textContent = thirdSection[0][0];
      document.querySelector(".star-description").textContent = thirdSection[0][1];
      setSliderPercent((prev) => 0);
    }
  };

  const bigSliderLeft = () => {
    const starSign = document.querySelector(".star-sign");
    if (sliderPercent < 0) {
      document.querySelectorAll(".big-photo-item").forEach((item, id) => {
        item.style.left = sliderPercent + 100 + "%";
      });

      document.querySelector(".star-title").textContent = thirdSection[sliderPercent / -100 - 1][0];
      document.querySelector(".star-description").textContent = thirdSection[sliderPercent / -100 - 1][1];

      setSliderPercent((prev) => prev + 100);
    } else {
      document.querySelectorAll(".big-photo-item").forEach((item, id) => {
        item.style.transition = "2s all ease-in-out";
        item.style.left = "-900%";
        item.style.transition = "0.5s all ease-in-out";
      });

      document.querySelector(".star-title").textContent = thirdSection[thirdSection.length - 1][0];
      document.querySelector(".star-description").textContent = thirdSection[thirdSection.length - 1][1];

      setSliderPercent((prev) => -900);
    }
  };

  const continentsRender = ({ name, url, id, selected }) => (
    <div
      className="roamies-continent"
      key={url}
      onClick={() => {
        activate(id, selected);
      }}
    >
      <img src={url} alt={name} />
      <span className="continent-name">{name}</span>
    </div>
  );

  const storiesRender = ({ nickname, name, url, description }) => (
    <div className="tour-storie" key={url}>
      <span className="tour-storie-nickname">{nickname}</span>
      <img src={url} alt={name} />
      <span className="tour-storie-title">{name}</span>
      <span className="tour-storie-description">{description}</span>
    </div>
  );

  const sliderRight = () => {
    if (sliderPx > -2292) {
      document.querySelectorAll(".tour-storie").forEach((item) => {
        item.style.left = sliderPx - 327.5 + "px";
      });
      setSliderPx((prev) => prev - 327.5);
    }
  };

  const sliderLeft = () => {
    if (!(sliderPx == 0)) {
      document.querySelectorAll(".tour-storie").forEach((item) => {
        item.style.left = sliderPx + 327.5 + "px";
      });
      setSliderPx((prev) => prev + 327.5);
    }
  };
  return (
    <main className="roamies-main">
      <div className="roamies-first-section">
        <div className="roamies-first-section-container">
          <div className="roamies-first-section-text">
            <img
              src="https://media.gadventures.com/media-server/dynamic/admin/content_pages/Roamies_Logo_Cadet.png"
              alt=""
              className="roamies-logo"
            />
            <span className="thrillOfAdventure">{firstSection.thrillOfAdventure}</span>
            <Link to={"/search"}>
              <div className="roamies-btn">{firstSection.showMe}</div>
            </Link>
          </div>
          <div className="roamies-first-section-photo">
            <img
              src="https://media.gadventures.com/media-server/dynamic/admin/content_pages/roamiesheadericon2.png"
              className="backpack"
            />
          </div>
        </div>
      </div>

      <div className="roamies-second-section">
        <div className="roam-zones-wrapper">
          <div className="roam-zones">
            <span>{secondSection[0].roamZones}</span>
            <div className="roam-zones-continents">{continents.map(continentsRender)}</div>
          </div>
          <Link to={"/search"}>
            <div className="roamies-btn">{secondSection[0].moreTrips}</div>
          </Link>
        </div>
      </div>

      <div className="roamies-third-section">
        <div className="roamies-third-section-container">
          <span className="title">Five reasons you’ll fall for us</span>
          <div className="two-photo-wrapper-upper">
            <div className="two-photo-vertical">
              <div className="first-img-wrapper">
                <img
                  src="https://media.gadventures.com/media-server/dynamic/admin/content_pages/usp1sticker.png"
                  alt=""
                  className="bucket-list-additional"
                />
                <span className="see-all-additional">See it all, and then some</span>
              </div>
              <span>
                All those bucket-list places you’ve gotta visit? Oh yeah, you’ll see those, and you’ll hear the epic
                stories behind them too. And if you want to get closer, our exclusive experiences will show you a side
                you won’t find scrolling through Instagram.
              </span>
            </div>
            <div className="two-photo-horizontal">
              <div className="first-img-wrapper">
                <img
                  src="https://media.gadventures.com/media-server/dynamic/admin/content_pages/usp2sticker.png"
                  alt=""
                  className="bucket-list-additional"
                />
                <span className="more-additional">The more the merriest</span>
              </div>
              <span>
                All those bucket-list places you’ve gotta visit? Oh yeah, you’ll see those, and you’ll hear the epic
                stories behind them too. And if you want to get closer, our exclusive experiences will show you a side
                you won’t find scrolling through Instagram.
              </span>
            </div>
          </div>

          <div className="big-photo-wrapper">
            <div className="big-photo-elements-wrapper">
              <span className="best-hotels">The best hostels everrrrrr</span>
              <img
                src="https://media.gadventures.com/media-server/dynamic/admin/content_pages/usp3sticker.png"
                alt=""
                className="bucket-list-additional"
              />
              <div className="slider left" onClick={bigSliderLeft}></div>
              <div className="slider right" onClick={bigSliderRight}></div>
              <div className="big-photo">
                <div className="big-photo-item1 big-photo-item"></div>

                <div className="big-photo-item1 big-photo-item"></div>

                <div className="big-photo-item1 big-photo-item"></div>

                <div className="big-photo-item1 big-photo-item"></div>

                <div className="big-photo-item1 big-photo-item"></div>

                <div className="big-photo-item1 big-photo-item"></div>

                <div className="big-photo-item1 big-photo-item"></div>

                <div className="big-photo-item1 big-photo-item"></div>

                <div className="big-photo-item1 big-photo-item"></div>

                <div className="big-photo-item1 big-photo-item"></div>
              </div>
              <div className="star-sign">
                <span className="star-title"></span>
                <span className="star-description"></span>
              </div>
            </div>
            <span className="big-photo-text">
              Everywhere you go, you’ll be staying in hostels that are just as incredible as the destinations they’re
              in. Conveniently located, loaded with amenities, and with your choice of rooming options, hostels don’t
              get any better than this.
            </span>
          </div>

          <div className="two-photo-wrapper-lower">
            <div className="two-photo-vertical">
              <div className="first-img-wrapper">
                <img
                  src="https://media.gadventures.com/media-server/dynamic/admin/content_pages/usp4sticker.png"
                  alt=""
                  className="bucket-list-additional"
                />
                <span className="see-all-additional">You’ve got choice, we’ve got your back</span>
              </div>
              <span>
                Roamies mix the freedom of travelling solo with the peace of mind of going with an organized group.
                You’ll have different ways to build your adventure just how you want it, plus the support of your expert
                Chief Experience Officer every step of the way.
              </span>
            </div>
            <div className="two-photo-horizontal">
              <div className="first-img-wrapper">
                <img
                  src="https://media.gadventures.com/media-server/dynamic/admin/content_pages/usp5sticker.png"
                  alt=""
                  className="bucket-list-additional"
                />
                <span className="more-additional">The most adventure for your money</span>
              </div>
              <span>
                You’re not the only one that travels far on these trips; your money does too. We packed in as much value
                as we possibly could without sacrificing one bit of adventure. Wallet, you’re welcome.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="roamies-fourth-section">
        <div className="roamies-fourth-section-inner-wrapper">
          <div className="roamies-fourth-section-text">
            <span>Oh the things you’ll do</span>
            <span>
              We hope you like telling travel stories because Roamies are packed with one-of-a-kind experiences the
              whole world will want to hear. Some are included, some are optional, but they’re all an unbelievably good
              time.
            </span>
          </div>
          <div className="roamies-tours-stories-wrapper">
            <div className="slider left" onClick={sliderLeft}></div>
            <div className="slider right" onClick={sliderRight}></div>
            <div className="other-stories">{fourthSection.map(storiesRender)}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Roamies;
