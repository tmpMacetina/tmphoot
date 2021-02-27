import React, { useContext, useEffect } from "react";
import "./MobileNavigation.scss";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaUserSlash,
  FaShoppingCart,
  FaBookOpen
} from "react-icons/fa";
import { AuthContext } from "../../auth/AuthContext";
import { NotificationContext } from "../notification/NotificationContext";
// navigation for devices that have width 1024 px with or less
const MobileNavigation = () => {
  const [isAuth, , , , , , logout, authCheck] = useContext(AuthContext);
  const [, , , , notify] = useContext(NotificationContext);
  // check for auth for the change between Log in and Log out
  useEffect(() => {
    authCheck();
  }, [authCheck]);

  const { pathname } = useLocation();
  return (
    <div className="navigationmobile">
      <div className="navmob-menu">
        <NavLink
          to="/"
          isActive={() => {
            return pathname === "/" || pathname === "/tmphoot";
          }}
          activeClassName="active-navmob"
          className="no-decoration-mob"
        >
          <div className="navmob-menu-item">
            <FaHome />
          </div>
        </NavLink>
        <div className="navmob-menu-item categoriesm">
          <NavLink
            to="/books/"
            activeClassName="active-navmob"
            className="navmob-menu-item"
          >
            <FaBookOpen />
          </NavLink>
        </div>

        {isAuth ? (
          <div
            role="menuitem"
            tabIndex={0}
            className=" navmob-menu-item"
            type="button"
            onClick={() => {
              logout();
              notify("You have been logged out");
            }}
            onKeyDown={() => {
              logout();
              notify("You have been logged out");
            }}
          >
            <FaUserSlash />
          </div>
        ) : (
          <NavLink
            to="/login"
            isActive={() => {
              return (
                pathname === "/login" ||
                pathname === "/signup" ||
                pathname === "/reset"
              );
            }}
            exact
            activeClassName="active-navmob"
            className="no-decoration-mob navmob-menu-item"
          >
            <div className="navmob-menu-item">
              <FaUser />
            </div>
          </NavLink>
        )}
        <NavLink
          to="/cart"
          exact
          activeClassName="active-navmob"
          className="no-decoration-mob last"
        >
          <div className="navmob-menu-item ">
            <FaShoppingCart />
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default MobileNavigation;
