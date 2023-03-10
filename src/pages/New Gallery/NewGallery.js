import React, { useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import GalleryCard from "../../components/partials/gallery/GalleryCard";
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
} from "../../components/Component";
import { galleryData } from "../pre-built/gallery/GalleryData";

const NewGallery = () => {
  const [data] = useState(galleryData);
  return (
    <React.Fragment>
      <Head title="Gallery"></Head>
      <Content>
        <Block>
          <Row className="g-gs">
            {data.map((item) => {
              return (
                <Col sm={6} lg={3} xxl={3} key={item.id}>
                  <GalleryCard
                    img={item.img}
                    userName={item.userName}
                    userEmail={item.userEmail}
                    theme={item.theme}
                    userImg={item.userImg}
                    heartCount={item.heart}
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

export default NewGallery;
