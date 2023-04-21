import React from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { text } from "./text";

function Register() {
  const navigate = useNavigate();
  const url = "http://localhost:3030/userRegister";
  const userRegister = async (e) => {
    e.preventDefault();
    if (document.querySelector("#password").value !== document.querySelector("#repeatPassword").value) {
      return;
    }

    const data = {
      name: document.querySelector("#name").value,
      surname: document.querySelector("#surname").value,
      email: document.querySelector("#email").value,
      phone: document.querySelector("#phone").value,
      password: document.querySelector("#password").value,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    navigate("/login");
  };
  return (
    <main className="register-form-wrapper">
      <div className="register">
        <div className="register-header">{text.register}</div>
        <div className="register-main-section">
          <div className="passport"></div>
          <div className="register-input-wrapper">
            <span className="register-input-wrapper-text">{text.signUp}</span>

            <form action="" id="register-form" className="register-form">
              <div className="name-wrapper">
                <div className="input-wrapper">
                  <input type="text" className="name-register input-field" id="name" placeholder="Enter your name" />
                </div>
                <label htmlFor="login">{text.name}</label>
              </div>

              <div className="surname-wrapper">
                <div className="input-wrapper">
                  <input
                    type="text"
                    className="surname-register input-field"
                    id="surname"
                    placeholder="Enter your surname"
                  />
                </div>
                <label htmlFor="surname">{text.surname}</label>
              </div>

              <div className="email-wrapper">
                <div className="input-wrapper">
                  <input
                    type="text"
                    className="email-register input-field"
                    id="email"
                    placeholder="Enter your email adress"
                  />
                </div>
                <label htmlFor="email">{text.email}</label>
              </div>

              <div className="phone-wrapper">
                <div className="input-wrapper">
                  <input
                    type="text"
                    className="phone-register input-field"
                    id="phone"
                    placeholder="Enter your phone number"
                  />
                </div>
                <label htmlFor="phone">{text.phoneNumber}</label>
              </div>

              <div className="password-wrapper">
                <div className="input-wrapper">
                  <input
                    type="password"
                    className="password input-field"
                    id="password"
                    placeholder="Enter your phone number"
                  />
                </div>
                <label htmlFor="password">{text.password}</label>
              </div>

              <div className="phone-wrapper">
                <div className="input-wrapper">
                  <input
                    type="password"
                    className="password input-field"
                    id="repeatPassword"
                    placeholder="Enter your phone number"
                  />
                </div>
                <label htmlFor="repeatPassword">{text.repeatPass}</label>
              </div>

              <div className="register-login-btn">
                <span>{text.alreadyregistered}</span>
              </div>
              <div className="submit-wrapper">
                <input
                  type="submit"
                  className="register-btn"
                  id="register-btn"
                  value="Sign up"
                  onClick={(e) => userRegister(e)}
                />
              </div>

              <div className="terms-label-wrapper">
                <div className="first-term">
                  <input type="checkbox" id="info" className="info" name="info" />
                  <label htmlFor="info">{text.readTheInfo}</label>
                </div>

                <div className="first-term">
                  <input type="checkbox" id="info" className="info" name="info" />
                  <label htmlFor="info">{text.wantToRecieve}</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
