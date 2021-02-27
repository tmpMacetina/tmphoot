import React from "react";
import "./Header.scss";
// import { FaArrowRight } from "react-icons/fa";
// import { NavLink } from "react-router-dom";
import logo from "../../../assets/header.svg";
import newlogo from "../../../assets/newLogo.png";
// import bgImg from "../../../assets/whitebooks.jpg";

const Header = () => {
  return (
    <div className="header ">
      <img className="the-logo" src={newlogo} alt="logo" />

      <div className="header-quote">
        <div className="header-title">
          Welcome to the <div className="colored-text">House of Books</div>{" "}
          place where all books live happily
        </div>
        <button type="button" className="header-button">
          Explore House of Books
        </button>
      </div>
      <div>
        <img className="header-logo" src={logo} alt="logo" />
      </div>
      {/* <div className="quote fade-in-left header-animated">
         <div className="quote-text">
          “The more that you read, the more things you will know. The more that
          you learn, the more places you’ll go.”
          <br />
          <br />– Dr Seuss
        </div>
        <NavLink to="/books/all">
          <div className="quote-link fade-in-left header-animated-delay">
            Go more places &nbsp;<u>NOW</u>&nbsp;
           
          </div>
        </NavLink> 
      </div> */}
    </div>
  );
};

export default Header;
