import React from "react";
import { Badge, Button } from "reactstrap";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import {
  BlockBetween,
  BlockDes,
  Block,
  BlockContent,
  BlockHead,
  BlockTitle,
  Col,
  Row,
} from "../../../components/Component";
import { Card } from "reactstrap";
import { pricingTableDataV1, pricingTableDataV2 } from "./PricingTableData";

const PricingTable = () => {
  return (
    <React.Fragment>
      <Head title="Pricing Table"></Head>
      <Content>
        <Block size="lg">
          <Row className="g-gs">
            {pricingTableDataV2.map((item) => {
              return (
                <Col md={6} xxl={3} key={item.id}>
                  <Card className={`pricing text-center ${item.tags ? "recommend" : ""}`}>
                    {item.tags && (
                      <Badge color="primary" className="pricing-badge">
                        Recommend
                      </Badge>
                    )}
                    <div className="pricing-body">
                      <div className="pricing-media" >
                        <img src={item.logo} alt="" />
                      </div>
                      <div className="pricing-title w-220px mx-auto">
                        <h5 className="title">{item.title}</h5>
                        <span className="sub-text">{item.desc}</span>
                      </div>
                      <div className="pricing-amount">
                        <div className="amount">
                          ${item.amount} <span>/yr</span>
                        </div>
                        <span className="bill">{item.userNumber} User, Billed Yearly</span>
                      </div>
                      <div className="pricing-action">
                        <Button color="primary">Select Plan</Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default PricingTable;
