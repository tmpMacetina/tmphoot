import React from "react";

import { Switch, Route } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";
import MobileNavigation from "../components/navigation/MobileNavigation";
import Homepage from "../components/homepage/Homepage";
import Books from "../components/books/Books";
import { CartProvider } from "../components/cart/CartContext";
import { AuthProvider } from "../auth/AuthContext";
import { NotificationProvider } from "../components/notification/NotificationContext";
import PasswordReset from "../auth/PasswordReset";
import OrderSuccessful from "../components/ordersuccesful/OrderSuccesful";
import Error from "./Error";
import Cart from "../components/cart/Cart";
import LogIn from "../auth/LogIn";
import SignUp from "../auth/SignUp";
import Notification from "../components/notification/Notification";
import "./Page.scss";

const Page = () => {
  return (
    <CartProvider>
      <AuthProvider>
        <NotificationProvider>
          <div className="page">
            <Navigation />
            <MobileNavigation />
            <Notification />
            <Switch>
              <Route path="/" exact component={Homepage} />
              <Route path="/tmphoot" exact component={Homepage} />
              <Route path="/books/" exact>
                <Books />
              </Route>
              <Route path="/books/:genre" exact>
                <Books />
              </Route>
              <Route path="/books/author/:author" exact>
                <Books />
              </Route>
              <Route path="/login" exact component={LogIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/reset" component={PasswordReset} />
              <Route path="/cart" component={Cart} />
              <Route path="/ordersuccessful" component={OrderSuccessful} />
              <Route path="*" component={Error} />
            </Switch>
          </div>
        </NotificationProvider>
      </AuthProvider>
    </CartProvider>
  );
};

export default Page;
