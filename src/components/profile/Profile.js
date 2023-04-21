import React from "react";
import "./Profile.scss";
import donikghoul from "../../assets/png/donikghoul.png";
import { update } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux/es/exports";

function Basket() {
  const dispatch = useDispatch();
  const logoutHandle = () => {
    localStorage.setItem("auth", false);
    localStorage.setItem("sessionId", null);
    dispatch(update({ auth: false, sessionId: null }));
  };
  return (
    <main className="profile-main">
      <div className="profile">
        <div className="greetings-name">
          <span>
            <span className="name">Nate</span>
            <span className="surname">Milo</span>
          </span>
          <span className="greetings">Welcome to your profile</span>
        </div>
        <div className="profile-img">
          <img src={donikghoul} alt="" />
        </div>
        <div className="logout" onClick={() => logoutHandle()}>
          Logout
        </div>
      </div>
    </main>
  );
}

export default Basket;
