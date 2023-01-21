import React, { useState } from "react";
import { Link } from "react-router-dom"
import ImageContainer from "./GalleryImage";
import { UserAvatar, Icon, Button } from "../../Component";
import { findUpper } from "../../../utils/Utils";
import moment from "moment"
import { Card } from "reactstrap";

const GalleryCard = ({ img, userName, theme, userImg, userEmail, newGallery, item = "" }) => {
  const [heart, setHeart] = useState(false);
  const onHeartClick = () => {
    setHeart(!heart);
  };
  console.log(item)
  return (
    <div className="gallery">
      <ImageContainer img={img} />
      <div className="gallery-body mt-2">
        <div className="user-card">
          <div className="user-info">
            <span className="lead-text"><em class="icon ni ni-calendar"></em>{moment(item.contest_start_end_date).format('DMMMM,  YYYY')}</span>
            <h3>{userName}</h3>
            <Link to={`judge_entries/${item.id}`} className="btn btn-danger">Proceed</Link>
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
