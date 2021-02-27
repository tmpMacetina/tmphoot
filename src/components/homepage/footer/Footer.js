import React from "react";
import "./Footer.scss";
import { FaMapMarkerAlt } from "react-icons/fa";
import Logo from "../../../assets/newLogo.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={Logo} alt="footerlogo" className="footer-logo-img" />
      </div>
      <div className="footer-about ">
        <div className="about-title">About:</div>
        <br />
        <div className="about-text">
          &quot;House of books&quot; is a customer-focused store, designed to
          spur discovery, a place where customers can find great books and
          products, and learn more about books. To give you more information as
          you browse, we’ve created unique features to highlight what people are
          reading and what they are loving, to help customers discover great new
          books.
        </div>
      </div>

      <div className="footer-location ">
        <div className="footer-location-title">Where to find us:</div>

        <div className="footer-location-text">
          Stonechat Road 25{" "}
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaMapMarkerAlt className="footer-pin" />
          </a>
        </div>
        <div className="footer-location-text">
          Nelson Brook 371{" "}
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaMapMarkerAlt className="footer-pin" />
          </a>
        </div>
        <div className="footer-location-text">
          Hartland Passage 14{" "}
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaMapMarkerAlt className="footer-pin" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
