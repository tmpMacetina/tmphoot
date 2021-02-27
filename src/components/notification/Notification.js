import React, { useContext, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { NotificationContext } from "./NotificationContext";
import "./Notification.scss";
// notification near top right corner
// used when book is added to the cart,log in/out ...
const Notification = () => {
  const [showNoti, , message, ,] = useContext(NotificationContext);
  const notiRef = useRef(null);
  return ReactDOM.createPortal(
    <CSSTransition
      nodeRef={notiRef}
      in={showNoti}
      timeout={1500}
      classNames="my-noti"
      mountOnEnter
      unmountOnExit
    >
      <div className="notification" ref={notiRef}>
        <div className="message">{message}</div>
      </div>
    </CSSTransition>,
    document.getElementById("notification")
  );
};

export default Notification;
