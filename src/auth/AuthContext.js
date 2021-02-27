import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();
// Authentication:Firebase Authentcation is used to simulate authentication
// https://firebase.google.com/docs/reference/rest/auth for more info
// AuthContext is used in LogIn and SignUp components from ./auth

export const AuthProvider = props => {
  const { children } = props;

  const [isAuth, setIsAuth] = useState(false);
  const [authData, setAuthData] = useState(null);
  const [authError, setAuthError] = useState(false);

  // logOut removes token and sets auth state to false and data to null
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    setIsAuth(false);
    setAuthData(null);
  };

  // log out after given time
  const logOutAfter = expirationTime => {
    setTimeout(() => {
      logOut();
    }, expirationTime * 1000);
  };

  // checks if token is stored in local storage of browser, if it is not or has expired
  // user is logged out, in other case state is set accordingly

  const authCheck = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      logOut();
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        logOut();
      } else {
        const userId = localStorage.getItem("userId");
        setAuthData(token, expirationDate, userId);
        setIsAuth(true);
        logOutAfter((expirationDate.getTime() - new Date().getTime()) / 1000);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={[
        isAuth,
        setIsAuth,
        authData,
        setAuthData,
        authError,
        setAuthError,
        logOut,
        authCheck
      ]}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element
};
AuthProvider.defaultProps = {
  children: null
};
