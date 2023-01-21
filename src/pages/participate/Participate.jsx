import React from "react";
import { useQuery } from "react-query";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, CardImg, Row, Col } from "reactstrap";
import Content from "../../layout/content/Content";
import Api from "../../http/ContestApi";
import Video_link from "./video.mp4";

const Participate = () => {
  const { data: results, isLoading } = useQuery("participate", Api.getContest);

  if (isLoading) {
    return (
      <React.Fragment>
        <Content>loading...</Content>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Content>
        <Row>
          <Card>
            <video loop autoPlay>
              <source
                type="video/mp4" alt="Card image cap" control src={Video_link} width="100%" />
            </video>
          </Card>
        </Row>
        <div></div>
      </Content>
    </React.Fragment>
  );
};

export default Participate;
