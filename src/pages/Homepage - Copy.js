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
import TopStudents_Table from "../components/partials/default/recent-orders/TopStudents_Table";
import TopProducts from "../components/partials/default/top-products/TopProducts";
import Carousel from "../components/partials/carousel/Captions";
import DataCard from "../components/partials/default/DataCard";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import "./custom.css";
import D1 from "./Group 1000003888.png";

import D2 from "./Group 1000003889.png";
import D3 from "./Group 1000003909.png"
import D4 from "./Group 1000003911.png"
import D5 from "./Group 1000003906.png"


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
             <div class="card"><div class="nk-ecwg nk-ecwg6"><div class="card-inner"><div class="card-title-group"><div class="card-title"><h6 class="title">Already Participated</h6></div></div><div class="data"><div class="data-group">
<div class="nk-ecwg6-ck">Ongoing <span>(12)</span></div><div class="nk-ecwg6-ck">Closed<span>(12)</span></div></div>
<div class="info">
<span>Options (01)</span><span>Options (01)</span><span>Options (01)</span></div><div class="info"></div></div></div></div></div>
            </Col>
            <Col xxl="3" sm="6">
              <div class="card"><div class="nk-ecwg nk-ecwg6"><div class="card-inner"><div class="card-title-group"><div class="card-title"><h6 class="title">Eligible for participate</h6></div></div><div class="data"><div class="data-group">
<div class="nk-ecwg6-ck">Ongoing <span>(12)</span></div><div class="nk-ecwg6-ck">Closed<span>(12)</span></div></div>
<div class="info">
<span>Options (01)</span><span>Options (01)</span><span>Options (01)</span>	</div><div class="info"></div></div></div></div></div>
            </Col>
            <Col xxl="3" sm="6">
              <div class="card"><div class="nk-ecwg nk-ecwg6"><div class="card-inner"><div class="card-title-group"><div class="card-title"><h6 class="title">Hold Participations</h6></div></div><div class="data"><div class="data-group">
<div class="nk-ecwg6-ck">Ongoing <span>(12)</span></div><div class="nk-ecwg6-ck">Closed<span>(12)</span></div></div>
<div class="info">
<span>Options (01)</span><span>Options (01)</span><span>Options (01)</span></div><div class="info"></div></div></div></div></div>
            </Col>
            <Col xxl="3" sm="6">
             <div class="card"><div class="nk-ecwg nk-ecwg6"><div class="card-inner"><div class="card-title-group"><div class="card-title"><h6 class="title">Rejected Participations</h6></div></div><div class="data"><div class="data-group">
<div class="nk-ecwg6-ck">Ongoing <span>(12)</span></div><div class="nk-ecwg6-ck">Closed<span>(12)</span></div></div>
<div class="info">
<span >Options (01)</span><span>Options (01)</span><span>Options (01)</span></div><div class="info"></div></div></div></div></div>
            </Col>

            <Col sm="6" xxl="5">
              <IndiaMap />
            </Col>
            <Col sm="6" xxl="7">
				<Row className="g-gs dash-gs">        
					<Col xxl="12" md="12">
					  <Madya_Pradesh />
					</Col>
				</Row>
				<Row className="g-gs home_tbl">
					<Col xxl="12" md="12">
					   <Madya_Pradesh_Detail />
					</Col>
				</Row>
				
			</Col>
			<Col sm="6" xxl="5" className="top_stu_left" >
              <OrderStatistics />
            </Col>
            <Col sm="6" xxl="7">
				<Row className="g-gs top_stu">        
					<Col xxl="12" md="12">
					  <TopStudents />
					</Col>
				</Row>
				<Row className="g-gs">
					<Col xxl="12" md="12">
					   <TopStudents_Table />
					</Col>
				</Row>
				
			</Col>
		<Col sm="6" xxl="5">
            <img src={D1} />
            </Col>
            <Col sm="6" xxl="7">
               <img src={D2} />
            </Col>
			<Col sm="6" xxl="6">
            <img src={D3} />
            </Col>
			<Col sm="6" xxl="6">
            <img src={D4} />
            </Col>
			<Col xxl="12">
               <img src={D5} />
            </Col>
			<Col xxl="12" className="filter_inputs">
			 <Filter />
			</Col>
			<Col xxl="12" className="recent_orders_tbl">
              <RecentOrders />
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default Homepage;
