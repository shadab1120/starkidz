import React, { useState } from "react";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import UserAvatar from "../../../../components/user/UserAvatar";
import UserImg from "../../../../images/avatar/c-sm.jpg";
import { useDispatch } from "react-redux";
import { logout } from "../../../../store/AuthSlice";

const User = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const toggle = () => setOpen((prevState) => !prevState);

  const handleSignout = () => {
    dispatch(logout());
  };

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar
            // icon="user-alt"
            image={UserImg}
            className="sm"
          />
          <div className="user-info d-none d-md-block">
            <div className="user-status">Jessica</div>
            {/* <div className="user-name dropdown-indicator">Abu Bin Ishityak</div> */}
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap d-none d-md-block">
          <div className="user-card sm">
            {/* <div className="user-avatar">
              <span>AB</span>
            </div> */}
            <div className="user-info">
              <span className="lead-text">Status Online/Offline</span>
              {/* <span className="sub-text">info@softnio.com</span> */}
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem link="/profile" icon="user-alt" onClick={toggle}>
              Profile
            </LinkItem>
            <LinkItem link="#" icon="setting-alt" onClick={toggle}>
              Manage Order
            </LinkItem>
            <LinkItem link="#" icon="activity-alt" onClick={toggle}>
              Settings
            </LinkItem>
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <a onClick={handleSignout}>
              <Icon name="signout"></Icon>
              <span>Logout</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
