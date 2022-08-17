import React from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown } from "reactstrap";
import { Badge } from "reactstrap";
import Icon from "../../../../components/icon/Icon";
import data from "./NotificationData";

const NotificationItem = (props) => {
  const { icon, iconStyle, text, time, id } = props;
  return (
    <div className="nk-notification-item" key={id} id={id}>
      <div className="nk-notification-icon">
        <Icon name={icon} className={[`icon-circle ${iconStyle ? " " + iconStyle : ""}`]} />
      </div>
      <div className="nk-notification-content">
        <div className="nk-notification-text">{text}</div>
        <div className="nk-notification-time">{time}</div>
      </div>
    </div>
  );
};

const Notification = () => {
  return (
    <UncontrolledDropdown className="user-dropdown">
      <DropdownToggle tag="a" className="dropdown-toggle nk-quick-nav-icon">
        <div
          style={{
            background: "#F3F4F6",
            // padding:"5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            position: "relative",
          }}
        >
          <span
            className="badge badge-danger"
            style={{
              position: "absolute",
              top: "-5px",
              right: "-10px",
              borderRadius: "50px",
            }}
          >
            3
          </span>
          <Icon name="bell" />
        </div>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-xl dropdown-menu-s1">
        <div className="dropdown-head">
          <span className="sub-title nk-dropdown-title">{/* {data.title} */}</span>
          <a href="#markasread" onClick={(ev) => ev.preventDefault()}>
            Notifications
          </a>
        </div>
        <div className="dropdown-body">
          <div className="nk-notification">
            {data.notification.map((item) => {
              return (
                <NotificationItem
                  key={item.id}
                  id={item.id}
                  icon={item.icon}
                  iconStyle={item.iconStyle}
                  text={item.text}
                  time={item.time}
                />
              );
            })}
          </div>
        </div>
        <div className="dropdown-foot center">
          <a href="#viewall" onClick={(ev) => ev.preventDefault()}>
            See All Notifications
          </a>
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default Notification;
