import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import authImg from "../assets/authImage.svg";
import "./AuthStyles.scss";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  // pervent page reset on submit
  const handleSubmit = event => {
    event.preventDefault();
  };
  useEffect(() => {
    if (emailRegex.test(email)) {
      setEmailValid(true);
    } else setEmailValid(false);
    return () => {
      setEmailTouched(true);
    };
  }, [email, emailRegex]);

  const emailErrorMsg =
    !emailValid && emailTouched ? "enter valid email" : null;
  return (
    <>
      <img className="corner_img " src={authImg} alt="auth" />
      {emailSent ? (
        <div className="auth">
          <div className="auth-reset-text">Email sent</div>
          <NavLink className="auth-reset-link" to="/login">
            Click here to log in
          </NavLink>
        </div>
      ) : (
        <form className="auth" onSubmit={handleSubmit}>
          <label className="auth-label" htmlFor="email">
            E-mail:
            <input
              id="email"
              type="email"
              className="auth-input"
              onChange={e => setEmail(e.target.value)}
            />
            <p className="auth-input-error">{emailErrorMsg}</p>
          </label>
          <button
            className="auth-big_button"
            type="button"
            onClick={() => setEmailSent(true)}
            disabled={!emailValid}
          >
            Reset password
          </button>
          <NavLink type="link" className="auth-link" to="/login">
            Oh I remebered it now, back to log in!
          </NavLink>
        </form>
      )}
    </>
  );
};

export default PasswordReset;
