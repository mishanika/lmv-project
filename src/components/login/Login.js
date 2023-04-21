import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { update } from "../../redux/slices/authSlice";
import { text } from "./text";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = "http://localhost:3030/userLogin";
  const userRegister = async (e) => {
    e.preventDefault();

    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();

    if (json.auth === true) {
      localStorage.setItem("auth", true);
      localStorage.setItem("sessionId", json.sessionId);
      localStorage.setItem("status", json.status);

      dispatch(
        update({
          auth: true,
          sessionId: json.sessionId,
          status: json.status,
        })
      );
      navigate("/profile");
    }
  };
  return (
    <main className="login-form-wrapper">
      <div className="login">
        <div className="login-header">{text.authorize}</div>
        <div className="login-main-section">
          <img src="https://www.coraltravel.ua/dist/img/login-modal.png" alt="" className="passport" />
          <div className="login-input-wrapper">
            <div className="login-input-wrapper-text">
              <span>{text.enterYour}</span>
              <span>{text.alreadyRegistered}</span>
            </div>

            <form action="" id="login-form" className="login-form">
              <div className="login-wrapper">
                <div className="input-wrapper">
                  <input
                    type="text"
                    className="nickname-login input-field"
                    id="email"
                    placeholder="Enter your email adress"
                  />
                </div>
                <label htmlFor="login">E-mail</label>
              </div>
              <div className="login-wrapper">
                <div className="input-wrapper">
                  <input
                    type="password"
                    className="password input-field"
                    id="password"
                    placeholder="Enter your password"
                  />
                </div>
                <label htmlFor="password">Password</label>
              </div>
              <div className="btn-wrapper">
                <div className="remember-label-wrapper">
                  <input type="checkbox" id="info" className="info" name="info" />
                  <label htmlFor="info">{text.remember}</label>
                </div>
                <div className="submit-wrapper">
                  <input
                    type="submit"
                    className="login-btn"
                    id="login-btn"
                    value="Log in"
                    onClick={(e) => {
                      userRegister(e);
                    }}
                  />
                </div>
              </div>
            </form>
            <div className="line">
              <div className="first-line"></div>
              <span>or</span>
              <div className="second-line"></div>
            </div>
            <div className="login-register-btn">
              <span>{text.signUp}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
