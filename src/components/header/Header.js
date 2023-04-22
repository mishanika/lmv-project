import React, { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { routes } from "./routes";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/slices/authSlice";

function Header() {
  const authState = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("auth") || localStorage.getItem("auth") === "false") {
      dispatch(update({ auth: false }));
    }
  }, []);

  const PrivateRoute = ({ auth, children, status }) => {
    if (auth === "notImportant") {
      return children;
    } else if (auth === "unAuth") {
      if (authState.auth === false) {
        return children;
      } else {
        return <Navigate to="/" />;
      }
    } else if (auth === "auth" && status === "member") {
      if (authState.auth === true) {
        return children;
      } else {
        return <Navigate to="/login" />;
      }
    } else if (auth === "auth" && status === "admin") {
      if (authState.auth === true && authState.status === "admin") {
        return children;
      } else {
        return <Navigate to="/" />;
      }
    }
  };

  const renderRoute = ({ path, component, auth, status }) => {
    return (
      <Route
        path={path}
        element={
          <PrivateRoute auth={auth} status={status}>
            {component}
          </PrivateRoute>
        }
        key={path}
      />
    );
  };

  const headerRender = ({ path, name, auth, status }) => {
    if (authState.auth) {
      if (auth !== "unAuth") {
        if ((status === "member" || status === "admin") && authState.status === "admin") {
          return (
            <Link to={path}>
              <div className="path-block" key={name}>
                <span className="path-name">{name}</span>
              </div>
            </Link>
          );
        } else if (status === "member" && authState.status === "member") {
          return (
            <Link to={path}>
              <div className="path-block" key={name}>
                <span className="path-name">{name}</span>
              </div>
            </Link>
          );
        }
      }
    } else {
      if (auth !== "auth") {
        return (
          <Link to={path}>
            <div className="path-block" key={name}>
              <span className="path-name">{name}</span>
            </div>
          </Link>
        );
      }
    }
  };
  return (
    <>
      <header className="header">{routes.map(headerRender)}</header>
      <Routes>{routes.map(renderRoute)}</Routes>
    </>
  );
}

export default Header;
