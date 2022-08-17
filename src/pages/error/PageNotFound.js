import React from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import './PageNotFound.css'
import Img from '../../images/image 3.png'
const PageNotFound = () => {
  return (
    <React.Fragment>
      <Head title="Blank Page" />
      <Content>
        <div className="err-page">
          <div className="err-page-1">
            <img src={Img} alt="asv"/>
            <h6 className="page-not-found-title">No Result found</h6>
            <p className="page-not-found-text">it look like readable English. Many desktop publishing 
              packages and web page editors now use Lorem Ipsum as their default model text</p>
          </div>
        </div>
      </Content>
    </React.Fragment>
  );
};

export default PageNotFound;
