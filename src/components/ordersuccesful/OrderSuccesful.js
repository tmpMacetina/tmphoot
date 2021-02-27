import React, { useContext } from "react";
import { Redirect } from "react-router";
import { CartContext } from "../cart/CartContext";
import "./OrderSuccessful.scss";
// component shown after successful order
// user is redirected if tries to go to protected route '/ordersuccessful
const OrderSuccesful = () => {
  const [, , , , , enableSucc] = useContext(CartContext);
  return (
    <div className="ordersuccessful">
      Order has been successfully submitted,check your e-mail for more info
      {enableSucc ? null : <Redirect to="/" />}
    </div>
  );
};

export default OrderSuccesful;
