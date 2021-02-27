import React from "react";
import { FaArrowRight } from "react-icons/fa";
import "./Authors.scss";
import { NavLink } from "react-router-dom";
import agataImg from "../../../assets/agataImg.jpg";
import jkrImg from "../../../assets/jkrImage.jpg";
import paulImg from "../../../assets/georgeImg.jpg";
// hardcoded part with most popular authors
// TODO make a component that holds single author
const Authors = () => {
  return (
    <>
      <div className="authors">
        <div className="authors-title">MOST PUBLISHED AUTHORS</div>
        <div className="authors-container">
          <div className="author">
            <img
              src={agataImg}
              alt="Agata"
              className="author-img authors-animated fade-in-left"
            />
            <div className="author-quote authors-animated fade-in-left">
              Agatha Christie was an English crime novelist and short-story
              writer. Her reputation rests on 66 detective novels and 14
              short-story collections. Guinness World Records lists Christie as
              the best-selling fiction writer of all time, her novels having
              sold more than two billion copies.
            </div>
            <NavLink
              to="/books/author/Agatha Christie"
              className="author-link authors-animated-delay fade-in-left"
            >
              <button type="button" className="author-button">
                All her books &nbsp;
                <FaArrowRight className="arrow" />
              </button>
            </NavLink>
          </div>
          <div className="author">
            <img
              src={paulImg}
              alt="Paul"
              className="author-img authors-animated fade-in-left"
            />

            <div className="author-quote authors-animated fade-in-left">
              George Raymond Richard Martin is an American novelist and short
              story writer, screenwriter, and television producer. He writes the
              series of epic fantasy novels A Song of Ice and Fire, which was
              adapted into the HBO series Game of Thrones.
            </div>

            <NavLink
              to="/books/author/George R. R. Martin"
              className="author-link authors-animated-delay fade-in-left"
            >
              <button type="button" className="author-button">
                All his books &nbsp;
                <FaArrowRight className="arrow" />
              </button>
            </NavLink>
          </div>
          <div className="author">
            <img
              src={jkrImg}
              alt="JKR"
              className="author-img authors-animated fade-in-left"
            />
            <div className="author-quote authors-animated fade-in-left">
              Joanne Rowling better known by her pen name J. K. Rowling, is a
              British writer and philanthropist. She is best known for writing
              the Harry Potter fantasy series, which has won multiple awards and
              sold more than 500 million copies, becoming the best-selling book
              series in history.
            </div>

            <NavLink
              to="/books/author/J. K. Rowling"
              className="author-link authors-animated-delay fade-in-left"
            >
              <button type="button" className="author-button">
                All her books &nbsp;
                <FaArrowRight className="arrow" />
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authors;
