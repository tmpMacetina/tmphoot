import React from "react";
import PropTypes from "prop-types";
import "./Card.scss";
// card components that holds a book data
const Card = props => {
  const { image, title, author, price, onclick } = props;
  return (
    <div className="card">
      <div
        className="bgcontainer"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="price">{price} &euro;</div>
      <div className="cover">
        <div className="cover-container">
          <p className="cover-title">{title}</p>
        </div>
        <hr className="hor-line" />
        <p className="cover-author">by {author}</p>
        <p className="cover-price">{price} &euro;</p>
        <button type="button" className="card-button" onClick={onclick}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Card;

Card.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onclick: PropTypes.func.isRequired
};
