import React, { useEffect } from "react";
import Header from "./header/Header";
import PopularBooks from "./popular books/PopularBooks";
import Authors from "./authors/Authors";
import Genres from "./genres/Genres";
import Footer from "./footer/Footer";
import "./Homepage.scss";

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <Genres />
      <PopularBooks />
      <Authors />
      <Footer />
    </>
  );
};

export default Homepage;
