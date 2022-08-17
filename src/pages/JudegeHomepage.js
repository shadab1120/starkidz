import React, { useState } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import SalesStatistics from "../components/partials/default/SalesStatistics";
import IndiaMap from "../components/partials/default/IndiaMap";
import OrderStatistics from "../components/partials/default/OrderStatistics";
import StoreStatistics from "../components/partials/default/StoreStatistics";
import RecentOrders from "../components/partials/default/recent-orders/RecentOrders";
import TopStudents from "../components/partials/default/recent-orders/TopStudents";
import Madya_Pradesh from "../components/partials/default/recent-orders/Madya_Pradesh";
import Filter from "../components/partials/default/recent-orders/Filter";
import Madya_Pradesh_Detail from "../components/partials/default/recent-orders/Madya_Pradesh_Detail";
import TopProducts from "../components/partials/default/top-products/TopProducts";
import Carousel from "../components/partials/carousel/Captions";
import DataCard from "../components/partials/default/DataCard";
import RecentActivity from "../components/partials/sales/recent-activity/Activity";
import sale_graph from "../images/Group_sale.png";
import card1 from "../images/card 1.png";
import card2 from "../images/card 2.png";
import card3 from "../images/card 3.png";

import {Card,DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import "./custom.css";



import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  BlockBetween,
} from "../components/Component";
import {
  DefaultCustomerChart,
  DefaultOrderChart,
  DefaultRevenueChart,
  DefaultVisitorChart,
} from "../components/partials/charts/default/DefaultCharts";

const Homepage = () => {
  const [sm, updateSm] = useState(false);
  return (
    <React.Fragment>
      <Head title="Homepage"></Head>
      <Content>
       
        <Block>
          <Row className="g-gs">
            <Col xxl="3" sm="6">
        <img
            // icon="user-alt"
            src={card1}
            className="sm"
          />
            </Col>
			            <Col xxl="3" sm="6">
              
            <img
            // icon="user-alt"
            src={card2}
            className="sm"
          />
            </Col>
            <Col xxl="3" sm="6">
              <img
            // icon="user-alt"
            src={card3}
            className="sm"
          />
            </Col>

			<Col xxl="6">
			
          <img
            // icon="user-alt"
            src={sale_graph}
            className="sm"
          />
            </Col>
			
			
			<Col xxl="12">
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default Homepage;
