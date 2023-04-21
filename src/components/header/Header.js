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

  const PrivateRoute = ({ auth, children }) => {
    if (auth === "notImportant") {
      return children;
    } else if (auth === "unAuth") {
      if (authState.auth === false) {
        return children;
      } else {
        return <Navigate to="/" />;
      }
    } else if (auth === "auth") {
      if (authState.auth === true && authState.status !== "member") {
        return children;
      } else if (authState.auth === true && authState.status === "admin") {
        return children;
      } else {
        return <Navigate to="/login" />;
      }
    }
  };

  const renderRoute = ({ path, component, auth }) => (
    <Route path={path} element={<PrivateRoute auth={auth}>{component}</PrivateRoute>} key={path} />
  );

  const headerRender = ({ path, name, auth }) => {
    if (authState.auth) {
      if (!(auth === "unAuth")) {
        //if (authState.status === "admin" ) {
        return (
          <Link to={path}>
            <div className="path-block" key={name}>
              <span className="path-name">{name}</span>
            </div>
          </Link>
        );
        //} else if (authState.status === "member") {
        // return (
        //   <Link to={path}>
        //     <div className="path-block" key={name}>
        //       <span className="path-name">{name}</span>
        //     </div>
        //   </Link>
        // );
        //}
      }
    } else {
      if (!(auth === "auth")) {
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
