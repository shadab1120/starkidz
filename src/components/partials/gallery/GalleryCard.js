import React, { useState } from "react";
import ImageContainer from "./GalleryImage";
import { UserAvatar, Icon, Button } from "../../Component";
import { findUpper } from "../../../utils/Utils";
import { Card } from "reactstrap";

const GalleryCard = ({ img, userName, theme, userImg, userEmail }) => {

  const [count, setCount] = useState(0);

  const onHeartClick = () => {
    setCount(prevCount => prevCount + 1);
  };
  return (
    <>
      <div className="gallery">
        <ImageContainer img={img} />
        <div className="gallery-body mt-2">
          <div className="user-card">
            <div className="user-info">
              <span className="lead-text">{userName}</span>
              <span className="sub-text">{userEmail}</span>
            </div>
          </div>
        </div>
      </div>
      <Card className="card-bordered gallery">
        <ImageContainer img={img}/>
        <div className="gallery-body card-inner align-center justify-between flex-wrap g-2">
          <div className="user-card">
            <UserAvatar theme={theme} text={findUpper(userName)} image={userImg}></UserAvatar>
            <div className="user-info">
              <span className="lead-text">{userName}</span>
              <span className="sub-text">{userEmail}</span>
            </div>
          </div>
          <div>
            <Button className="btn-p-0 btn-nofocus" onClick={() => onHeartClick()}>
              <Icon name={`${count ? "heart-fill" : "heart"}`}></Icon>
              <span>{count}</span>
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default GalleryCard;
