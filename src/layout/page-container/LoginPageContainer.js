import React, { useEffect, useState } from "react";

const LoginPageContainer = ({ ...props }) => {
  const [themeState] = useState({
    main: "default",
    sidebar: "white",
    header: "white",
    skin: "light",
  });

  useEffect(() => {
    document.body.className = `nk-body bg-lighter npc-default has-sidebar no-touch nk-nio-theme ${
      themeState.skin === "dark" ? "dark-mode" : ""
    }`;
  },[themeState.skin]);
  
  return (
    <React.Fragment>
      <div className="nk-app-root">
        <div className="nk-wrap nk-wrap-nosidebar">
          <div className="nk-content nk-content2">{props.children}</div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default LoginPageContainer;
