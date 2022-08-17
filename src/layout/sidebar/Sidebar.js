import React, { useState } from "react";
import classNames from "classnames";
import SimpleBar from "simplebar-react";
import Logo from "../logo/Logo";
import Menu from "../menu/Menu";
import Toggle from "./Toggle";
import EcommerceMenu from "../menu/EcommerceMenu";

const Sidebar = ({ fixed, theme, className, sidebarToggle, mobileView, ...props }) => {
  const [collapseSidebar, setSidebar] = useState(true);
  const [mouseEnter, setMouseEnter] = useState(false);

  const toggleCollapse = () => {
    setSidebar(!collapseSidebar);
  };

  const handleMouseEnter = () => setMouseEnter(true);
  const handleMouseLeave = () => setMouseEnter(false);

  const classes = classNames({
    "nk-sidebar": true,
    "nk-sidebar-fixed": fixed,
    "is-compact": collapseSidebar,
    "has-hover": collapseSidebar && mouseEnter,
    [`is-light`]: theme === "white",
    [`is-${theme}`]: theme !== "white" && theme !== "light",
    [`${className}`]: className,
  });

  return (
    <div className={classes}>
      <div
        className="nk-sidebar-element nk-sidebar-head"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          justifyContent: mouseEnter ? "center" : "space-between",
        }}
      >
        <div className="nk-sidebar-brand">
          <Logo />
        </div>
        {/* <div className="nk-menu-trigger mr-n2">
           
        </div> */}
      </div>
      <div className="nk-sidebar-content" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <SimpleBar className="nk-sidebar-menu">
          {window.location.pathname.split("/")[2] === "ecommerce" ? (
            <EcommerceMenu sidebarToggle={sidebarToggle} mobileView={mobileView} />
          ) : (
            <Menu sidebarToggle={sidebarToggle} mobileView={mobileView} />
          )}
        </SimpleBar>
      </div>
    </div>
  );
};
export default Sidebar;
