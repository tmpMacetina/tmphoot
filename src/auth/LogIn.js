import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { NotificationContext } from "../components/notification/NotificationContext";
import authImg from "../assets/authImage.svg";
import "./AuthStyles.scss";
// for quick log in use
// email:1111@11.11
// password:11111111 (8x1)
// or sign up
const LogIn = () => {
  const [, , , , notify] = useContext(NotificationContext);
  const [isAuth, setIsAuth, , setAuthData, , setAuthError] = useContext(
    AuthContext
  );
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const logInUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChrZYShFuZAEa3gN_kd6S4SGXpsejvExA";

  // scrolls to top of page for better UX
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // attempt to log in using provided email and password
  const tryToLog = () =>
    axios
      .post(logInUrl, { email, password, returnSecureToken: true })
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        setIsAuth(true);
        setAuthData((response.data.idToken, response.data.localId));
        setFetchError(null);
        notify("Logged in");
      })
      .catch(err => {
        setFetchError(err.response.data.error.message || null);
        setAuthError(true);
        notify("Error logging in");
      });
  // pervent page reset on submit
  const handleSubmit = event => {
    event.preventDefault();
  };
  // checks email input, sets valid if it matches email regular expression

  useEffect(() => {
    if (emailRegex.test(email)) {
      setEmailValid(true);
    } else setEmailValid(false);
  }, [email, emailRegex]);

  // checks password input, sets valid if it is 8 or more characters
  useEffect(() => {
    if (password.length > 7) setPasswordValid(true);
    else setPasswordValid(false);
  }, [password]);

  // errors shown when email/password is invalid
  const emailErrorMsg =
    !emailValid && emailTouched ? "enter valid email" : null;
  const passwordErrorMsg =
    !passwordValid && passwordTouched ? "must contain 8 characters" : null;

  return (
    <>
      <img className="corner_img" src={authImg} alt="auth" />
      {isAuth ? (
        <div className="login-success">
          You are logged in!
          <br />
          <NavLink to="/books/all">Click here to continue shopping. </NavLink>
          <NavLink to="/cart">Click here to go to the cart. </NavLink>
        </div>
      ) : (
        <form className="auth" onSubmit={handleSubmit}>
          <label className="auth-label" htmlFor="email">
            E-mail:
            <input
              id="email"
              className="auth-input"
              type="email"
              onChange={e => {
                setEmail(e.target.value);
                setEmailTouched(true);
              }}
            />
            <p className="auth-input-error">{emailErrorMsg}</p>
          </label>

          <label className="auth-label" htmlFor="password">
            Password:
            <input
              id="password"
              type="password"
              className="auth-input"
              onChange={e => {
                setPassword(e.target.value);
                setPasswordTouched(true);
              }}
            />
            <p className="auth-input-error"> {passwordErrorMsg}</p>
          </label>

          <button
            className="auth-button"
            type="submit"
            onClick={tryToLog}
            disabled={!(emailValid && passwordValid)}
          >
            Log in
          </button>
          <div className="auth-error">
            {fetchError ? "Invalid e-mail or password" : null}
          </div>
          <NavLink className="auth-link" to="/signup">
            Don&apos;t have account? Click here!
          </NavLink>
          <NavLink className="auth-link" to="/reset">
            Forgotten password? Click here!
          </NavLink>
        </form>
      )}
    </>
  );
};

export default LogIn;
