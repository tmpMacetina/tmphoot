import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import "./AuthStyles.scss";
import authImg from "../assets/authImage.svg";

const SignUp = () => {
  const [isAuth, setIsAuth, , setAuthData, , setAuthError] = useContext(
    AuthContext
  );
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [nameValid, setNameValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordRepeatTouched, setPasswordRepeatTouched] = useState(false);
  const [passwordRepeatValid, setPasswordRepeatValid] = useState(false);

  const [fetchError, setFetchError] = useState(null);

  const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const nameRegex = /^[a-zA-Z]{3,}(?: [a-zA-Z]+){1,2}$/;
  const signUpUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyChrZYShFuZAEa3gN_kd6S4SGXpsejvExA";

  // scrolls to top of page for better UX
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // attempt to sign up using provided email and password
  // password repeat is just used for misspelled password
  // name is not used anywhere due to lack of 'See previous orders' API that will
  //  be implemented in the future,additional input fields might be added as part of it
  const trySignUp = () =>
    axios
      .post(signUpUrl, { email, password, returnSecureToken: true })
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
      })
      .catch(err => {
        setFetchError(err.response.data.error.message || null);
        setAuthError(true);
      });

  // pervent page reset on submit
  const handleSubmit = event => {
    event.preventDefault();
  };
  // checks name input,sets valid if it matches name regular expression
  useEffect(() => {
    if (nameRegex.test(name)) setNameValid(true);
    else setNameValid(false);
  }, [name, nameRegex]);

  // checks email input,sets valid if it matches email regular expression
  useEffect(() => {
    if (emailRegex.test(email)) setEmailValid(true);
    else setEmailValid(false);
  }, [email, emailRegex]);

  // checks passwod input,sets valid if it is 8 or more characters
  useEffect(() => {
    if (password.length > 7) setPasswordValid(true);
    else setPasswordValid(false);
  }, [password]);

  // checks if passwords match
  useEffect(() => {
    if (password === passwordRepeat) setPasswordRepeatValid(true);
    else setPasswordRepeatValid(false);
  }, [passwordRepeat, password]);

  // errors shown when name/email/password/password repeat is invalid
  const nameErrorMsg = !nameValid && nameTouched ? "enter valid name" : null;
  const emailErrorMsg =
    !emailValid && emailTouched ? "enter valid email" : null;
  const passwordErrorMsg =
    !passwordValid && passwordTouched ? "enter valid password" : null;
  const passwordRepeatErrorMsg =
    !passwordRepeatValid && passwordRepeatTouched
      ? "passwords do not match"
      : null;

  return (
    <>
      <img className="corner_img " src={authImg} alt="auth" />
      {isAuth ? (
        <div className="auth-success">
          You are logged in!
          <br />
          <NavLink to="/books/all">Click here to continue shopping. </NavLink>
          <NavLink to="/cart">Click here to go to the cart. </NavLink>
        </div>
      ) : (
        <form className="auth" onSubmit={handleSubmit}>
          <label className="auth-label" htmlFor="name">
            Full name:
            <input
              id="name"
              className="auth-input"
              onChange={e => {
                setName(e.target.value);
                setNameTouched(true);
              }}
            />
            <p className="auth-input-error">{nameErrorMsg}</p>
          </label>

          <label className="auth-label" htmlFor="email">
            E-mail:
            <input
              id="email"
              type="email"
              className="auth-input"
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
          <label className="auth-label" htmlFor="rpassword">
            Repeat password:
            <input
              id="rpassword"
              className="auth-input"
              type="password"
              onChange={e => {
                setPasswordRepeat(e.target.value);
                setPasswordRepeatTouched(true);
              }}
            />
            <p className="auth-input-error">{passwordRepeatErrorMsg} </p>
          </label>

          <button
            className="auth-button"
            type="submit"
            onClick={trySignUp}
            disabled={
              !(emailValid && passwordValid && nameValid && passwordRepeatValid)
            }
          >
            Sign Up
          </button>
          <h1 className="auth-error">
            {fetchError ? "Invalid information" : null}
          </h1>

          <NavLink className="auth-link" to="/login">
            Already have an account,click here!
          </NavLink>
        </form>
      )}
    </>
  );
};

export default SignUp;
