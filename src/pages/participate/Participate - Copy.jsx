import React from "react";
import { useQuery } from "react-query";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, CardImg, Row, Col } from "reactstrap";
import Content from "../../layout/content/Content";
import Api from "../../http/ContestApi";

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
          {Object.values(results?.data)?.map((contest) => (
            <Col lg="4" md="4" sm="6" className="mb-3">
              <Card>
                <CardImg alt="Card image cap" src={contest?.contest_image} top width="100%" />
                <CardBody>
                  <CardTitle tag="h5">{contest?.contest_short_name}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {contest?.age_bracket} - {contest?.contest_type_2}
                  </CardSubtitle>
                  <CardText>{contest?.terms_conditions}</CardText>
                  <Button>Participate</Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        <div></div>
      </Content>
    </React.Fragment>
  );
};

export default Participate;
