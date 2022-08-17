import React from "react";
import Icon from "../../components/icon/Icon";
import './HeaderSearch.css'

const HeaderSearch = () => {
  return (
    <div className="header-search">
      <Icon name="search"></Icon>
      <input className="form-control border-transparent form-focus-none" type="text" placeholder="Search"
      />
    </div>
  );
};

export default HeaderSearch;
