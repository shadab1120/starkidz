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
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";



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
             <div class="card"><div class="nk-ecwg nk-ecwg6"><div class="card-inner"><div class="card-title-group"><div class="card-title"><h6 class="title">Contests</h6></div></div><div class="data"><div class="data-group">
<div class="nk-ecwg6-ck">Ongoing <span>(12)</span></div><div class="nk-ecwg6-ck">Closed<span>(12)</span></div></div>
<div class="info">
<span>Options (01)</span><span>Options (01)</span></div><div class="info"></div></div></div></div></div>
            </Col>
            <Col xxl="3" sm="6">
              <div class="card"><div class="nk-ecwg nk-ecwg6"><div class="card-inner"><div class="card-title-group"><div class="card-title"><h6 class="title">Judging</h6></div></div><div class="data"><div class="data-group">
<div class="nk-ecwg6-ck">Ongoing <span>(12)</span></div><div class="nk-ecwg6-ck">Closed<span>(12)</span></div></div>
<div class="info">
<span>Options (01)</span><span>Options (01)</span></div><div class="info"></div></div></div></div></div>
            </Col>
            <Col xxl="3" sm="6">
              <div class="card"><div class="nk-ecwg nk-ecwg6"><div class="card-inner"><div class="card-title-group"><div class="card-title"><h6 class="title">Quality</h6></div></div><div class="data"><div class="data-group">
<div class="nk-ecwg6-ck">Ongoing <span>(12)</span></div><div class="nk-ecwg6-ck">Closed<span>(12)</span></div></div>
<div class="info">
<span>Options (01)</span><span>Options (01)</span></div><div class="info"></div></div></div></div></div>
            </Col>
            <Col xxl="3" sm="6">
             <div class="card"><div class="nk-ecwg nk-ecwg6"><div class="card-inner"><div class="card-title-group"><div class="card-title"><h6 class="title">Event Manger</h6></div></div><div class="data"><div class="data-group">
<div class="nk-ecwg6-ck">Ongoing <span>(12)</span></div><div class="nk-ecwg6-ck">Closed<span>(12)</span></div></div>
<div class="info">
<span >Options (01)</span><span>Options (01)</span></div><div class="info"></div></div></div></div></div>
            </Col>

            <Col xxl="4">
              <IndiaMap />
            </Col>
            <Col xxl="8" md="8">
				<Row className="g-gs">        
					<Col xxl="12" md="12">
					  <Madya_Pradesh />
					</Col>
				</Row>
				<Row className="g-gs">
					<Col xxl="12" md="12">
					   <Madya_Pradesh_Detail />
					</Col>
				</Row>
				
			</Col>
			<Col xxl="4">
              <OrderStatistics />
            </Col>
            <Col xxl="8" md="8">
				<Row className="g-gs">        
					<Col xxl="12" md="12">
					  <TopStudents />
					</Col>
				</Row>
				<Row className="g-gs">
					<Col xxl="12" md="12">
					   <Madya_Pradesh_Detail />
					</Col>
				</Row>
				
			</Col>
		
			
			 <Col xxl="4" md="8" lg="6">
              <RecentOrders />
            </Col>
            <Col xxl="8">
              <RecentOrders />
            </Col>
			
			<Col xxl="12">
              <SalesStatistics />
            </Col>
			<Col xxl="12">
			 <Filter />
			</Col>
			<Col xxl="12">
              <RecentOrders />
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default Homepage;
