import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const NotificationContext = createContext();

export const NotificationProvider = props => {
  const { children } = props;
  const [showNoti, setShowNoti] = useState(false);
  const [message, setMessage] = useState(false);

  const notify = msg => {
    if (showNoti === false) {
      setMessage(msg);
      setShowNoti(true);
      setTimeout(() => {
        setShowNoti(false);
      }, 1500);
    } else {
      setTimeout(() => {
        setMessage(msg);
        setShowNoti(true);
        setTimeout(() => {
          setShowNoti(false);
        }, 1500);
      }, 1500);
    }
  };
  return (
    <NotificationContext.Provider
      value={[showNoti, setShowNoti, message, setMessage, notify]}
    >
      {children}
    </NotificationContext.Provider>
  );
};
NotificationProvider.propTypes = {
  children: PropTypes.element
};
NotificationProvider.defaultProps = {
  children: null
};
