import React from "react";
import PropTypes from "prop-types";
import "./CartItem.scss";
// components that holds a book data inside the cart
const CartItem = props => {
  const {
    title,
    image,
    author,
    quantity,
    price,
    incQuantity,
    decQuantity,
    removeFromCart
  } = props;
  return (
    <div className="cart-item">
      <div className="cart-left">
        <div
          className="cart-item-img"
          style={{ backgroundImage: `url('${image}')` }}
        />
        <div className="cart-item-title">
          {title}
          <p className="cart-item-author">by {author}</p>
          <br />
          <p className="cart-item-author">{price}&euro;</p>
        </div>
      </div>
      <div className="cart-right">
        <button
          className="cart-item-button"
          type="button"
          onClick={incQuantity}
        >
          +
        </button>
        <div className="cart-item-quantity">{quantity}</div>
        <button
          className="cart-item-button"
          type="button"
          onClick={decQuantity}
        >
          -
        </button>
        <button
          className="cart-item-remove"
          type="button"
          onClick={removeFromCart}
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;

CartItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  incQuantity: PropTypes.func.isRequired,
  decQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired
};
