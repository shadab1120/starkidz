import React, { useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import JudgeGalleryCard from "../../../components/partials/gallery/JudgeGalleryCard";
import {
  BlockBetween,
  BlockDes,
  Block,
  BlockHeadContent,
  BlockHead,
  BlockTitle,
  Col,
  Row,
  Icon,
  Button,
} from "../../../components/Component";
import { galleryData } from "./GalleryData";
import { useQuery } from "react-query";
import Api from "./../../../http/ContestApi";

const JudgeGalleryPreview = () => {
  const judgeId = JSON.parse(localStorage.getItem("user"))?.data?.ID;

  const { data: result, isLoading } = useQuery(['getContestByRole', '', judgeId], Api.getContestByRole);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Head title="Gallery"></Head>
      <Content>
        <Block>
          <Row className="g-gs">
            {/*<!--{Object.values(result?.data)?.map((item) => {
              return (
                <Col sm={6} lg={3} xxl={3} key={item.id}>
                  <GalleryCard
                    img={item.image}
                    userName={item.contest}
                    userEmail={item.category}
                    heartCount="40"
                    theme="purple"
                    newGallery={true}
                  />
                </Col>
              );
				})}-->*/}
            {result?.data?.map((item) => {
              return (
                <Col sm={6} lg={3} xxl={3} key={item.id}>
                  <JudgeGalleryCard
                    img={item.contest_image}
                    userName={item.contest_short_name}
                    userEmail={item.contest_short_name}
                    theme={item.contest_short_name}
                    userImg={item.userImg}
                    heartCount={item.contest_short_name}
                    newGallery={true}
                    item={item}
                  />
                </Col>
              );
            })}
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default JudgeGalleryPreview;
