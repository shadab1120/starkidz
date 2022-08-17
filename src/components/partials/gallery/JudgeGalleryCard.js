import React, { useState } from "react";
import ImageContainer from "./GalleryImage";
import { UserAvatar, Icon, Button } from "../../Component";
import { findUpper } from "../../../utils/Utils";
import { Card } from "reactstrap";

const GalleryCard = ({ img, userName, theme, userImg, userEmail, newGallery }) => {
  const [heart, setHeart] = useState(false);
  const onHeartClick = () => {
    setHeart(!heart);
  };
  return (
    <div className="gallery">
      <ImageContainer img={img} />
      <div className="gallery-body mt-2">
        <div className="user-card">
          <div className="user-info">
            <span className="lead-text"><em class="icon ni ni-calendar"></em>1 May, 2022</span>
            <h3>National Level -craftsmith - craft contest</h3>
            <a href="judge_entries" className="btn btn-danger">Proceed</a>
          </div>
        </div>
      </div>
    </div>
  //   <Card className="card-bordered gallery">
  //   <ImageContainer img={img} />
  //   <div className="gallery-body card-inner align-center justify-between flex-wrap g-2">
  //     <div className="user-card">
  //       <UserAvatar theme={theme} text={findUpper(userName)} image={userImg}></UserAvatar>
  //       <div className="user-info">
  //         <span className="lead-text">{userName}</span>
  //         <span className="sub-text">{userEmail}</span>
  //       </div>
  //     </div>
  //     <div>
  //       <Button className="btn-p-0 btn-nofocus" onClick={() => onHeartClick()}>
  //         <Icon name={`${heart ? "heart-fill" : "heart"}`}></Icon>
  //         <span>{heart ? heartCount + 1 : heartCount}</span>
  //       </Button>
  //     </div>
  //   </div>
  // </Card>
  );
};

export default GalleryCard;
