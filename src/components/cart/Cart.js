import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CartContext } from "./CartContext";
import { AuthContext } from "../../auth/AuthContext";
import CartItem from "./cartItem/CartItem";
import "./Cart.scss";
import cartImage from "../../assets/cartCorner.svg";

const Cart = () => {
  const [
    cart,
    ,
    removeItemFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    ,
    setEnableSucc
  ] = useContext(CartContext);

  // auth is needed to enable order button
  const [isAuth] = useContext(AuthContext);

  // for redirecting to orderSuccess
  const history = useHistory();

  // counts total price
  let total = 0;
  cart.map(item => {
    total += item.price * item.quantity;
    return total;
  });

  // setEnableSucc enables route to orderSuccess
  const handleOrderButton = () => {
    setEnableSucc(true);
    clearCart();
    history.push("/ordersuccessful");
  };
  // puts all items from cart into cartitem
  const cartMapped = cart.map(item => (
    <CartItem
      key={item.id}
      title={item.title}
      author={item.author}
      image={item.image}
      quantity={item.quantity}
      price={item.price}
      incQuantity={() => increaseQuantity(item)}
      decQuantity={() => decreaseQuantity(item)}
      removeFromCart={() => removeItemFromCart(item)}
      itemTotal={item.quantity * item.price}
    />
  ));

  // if cart is empty show this message,else show posts
  let cartForDisplay = null;
  if (cartMapped.length === 0) {
    cartForDisplay = (
      <h1 className="cart-empty">
        Cart is currently empty &#160; &#160;
        <br />
        <br />
        :&#40;
      </h1>
    );
  } else {
    cartForDisplay = cartMapped;
  }
  // used for button enabling
  const cartNotEmpty = cartMapped.length > 0;
  const enableOrder = isAuth && cartNotEmpty;
  // sctill to start of page for better UX
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <img src={cartImage} alt="cart" className="corner-img" />
      <div className="cart">
        <div className="cart-container">
          <div className="cart-total ">Total: {total} &euro;</div>
          <div className="cart-animated fade-in cart-items">
            {cartForDisplay}
          </div>
          <div className="cart-button-container ">
            <button
              type="button"
              className="cart-button "
              disabled={!enableOrder}
              onClick={handleOrderButton}
            >
              Order now {total}&nbsp; &euro;
            </button>
            <div className="cart-button-errors">
              <p className="cart-button-error">
                {isAuth ? null : "Please log in"}
              </p>
              <p className="cart-button-error">
                {cartNotEmpty ? null : "Cart can't be empty"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
