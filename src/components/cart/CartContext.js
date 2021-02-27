import React, { createContext, useReducer, useState } from "react";
import PropTypes from "prop-types";

const ACTIONS = {
  ADDTOCART: "addToCart", // adds item to the cart, if it is already in the cart increments amount by 1
  INCREMENT: "increment", // increments amount by 1
  DECREMENT: "decrement", // decrements amount by 1, removes from cart if reaches 0
  REMOVEFROMCART: "removeFromCart", // removes the item from the cart
  CLEARCART: "clearCart" // clears cart
};

export const CartContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADDTOCART: {
      if (state.includes(action.payload.itemToAdd)) {
        const newState = [...state];
        const itemToInc = newState.find(
          item => item === action.payload.itemToAdd
        );
        itemToInc.quantity += 1;
        return [...newState];
      }
      const { itemToAdd } = action.payload;
      itemToAdd.quantity = 1;
      return [...state, itemToAdd];
    }

    case ACTIONS.INCREMENT: {
      const newState = [...state];
      const theItem = newState.find(item => item === action.payload.itemToInc);
      theItem.quantity += 1;
      return [...newState];
    }

    case ACTIONS.DECREMENT: {
      let newState = [...state];
      const theItem = newState.find(item => item === action.payload.itemToDec);
      if (theItem.quantity === 1)
        newState = newState.filter(item => item !== theItem);
      else theItem.quantity -= 1;
      return [...newState];
    }

    case ACTIONS.REMOVEFROMCART: {
      let newState = [...state];
      const theItem = newState.find(
        item => item === action.payload.itemToRemove
      );
      newState = newState.filter(item => item !== theItem);
      return [...newState];
    }

    case ACTIONS.CLEARCART: {
      const newState = [];
      return [...newState];
    }

    default:
      return { state };
  }
};

export const CartProvider = props => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, []);
  const [enableSucc, setEnableSucc] = useState(false);
  const addItemToCart = itemToAdd => {
    dispatch({ type: ACTIONS.ADDTOCART, payload: { itemToAdd } }); // called 2x when in react strict mode
  };
  const increaseQuantity = itemToInc => {
    dispatch({ type: ACTIONS.INCREMENT, payload: { itemToInc } }); // called 2x when in react strict mode
  };
  const decreaseQuantity = itemToDec => {
    dispatch({ type: ACTIONS.DECREMENT, payload: { itemToDec } }); // called 2x when in react strict mode
  };
  const removeItemFromCart = itemToRemove => {
    dispatch({ type: ACTIONS.REMOVEFROMCART, payload: { itemToRemove } }); // called 2x when in react strict mode
  };
  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEARCART }); // called 2x when in react strict mode !
  };

  return (
    <CartContext.Provider
      value={[
        state,
        addItemToCart,
        removeItemFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        enableSucc,
        setEnableSucc
      ]}
    >
      {children}
    </CartContext.Provider>
  );
};
CartProvider.propTypes = {
  children: PropTypes.element
};
CartProvider.defaultProps = {
  children: null
};
