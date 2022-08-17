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
import api from "../../../http/api";

const JudgeGalleryPreview  = () => {
  const [data] = useState(galleryData);
  const { data: result, isLoading } = useQuery("gallery", api.getGallery);

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
            {data.map((item) => {
              return (
                <Col sm={6} lg={3} xxl={3} key={item.id}>
                  <JudgeGalleryCard
                    img={item.img}
                    userName={item.userName}
                    userEmail={item.userEmail}
                    theme={item.theme}
                    userImg={item.userImg}
                    heartCount={item.heart}
                    newGallery={true}
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
