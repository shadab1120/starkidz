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

import {Card,DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";



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
            <Col xxl="4" sm="6">
             <div class="card"><div class="nk-ecwg nk-ecwg6"><div class="card-inner"><div class="card-title-group"><div class="card-title"><h6 class="title">Contests</h6></div></div><div class="data"><div class="data-group">
<div class="nk-ecwg6-ck">Ongoing <span>(12)</span></div><div class="nk-ecwg6-ck">Closed<span>(12)</span></div></div>
<div class="info">
<span>Options (01)</span><span>Options (01)</span></div><div class="info"></div></div></div></div></div>
            </Col>
            <Col xxl="4" sm="6">
              <div class="card"><div class="nk-ecwg nk-ecwg6"><div class="card-inner"><div class="card-title-group"><div class="card-title"><h6 class="title">Judging</h6></div></div><div class="data"><div class="data-group">
<div class="nk-ecwg6-ck">Ongoing <span>(12)</span></div><div class="nk-ecwg6-ck">Closed<span>(12)</span></div></div>
<div class="info">
<span>Options (01)</span><span>Options (01)</span></div><div class="info"></div></div></div></div></div>
            </Col>
            <Col xxl="4" sm="6">
              <div class="card"><div class="nk-ecwg nk-ecwg6"><div class="card-inner"><div class="card-title-group"><div class="card-title"><h6 class="title">Quality</h6></div></div><div class="data"><div class="data-group">
<div class="nk-ecwg6-ck">Ongoing <span>(12)</span></div><div class="nk-ecwg6-ck">Closed<span>(12)</span></div></div>
<div class="info">
<span>Options (01)</span><span>Options (01)</span></div><div class="info"></div></div></div></div></div>
            </Col>

			<Col xxl="8">
			      <SalesStatistics />
        
            </Col>
			<Col lg="4" xxl="4">
			<Card className="card-full">
                <RecentActivity />
              </Card>
         
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
