import React from "react";
import { Card } from "reactstrap";
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
} from "../../../../components/Component";

const Filter = () => {
  return (
    <Card className="card-full">
      <div className="card-inner">
        <div className="card-title-group">
          <div className="card-title">
            <h6 className="title">Recent Entry:</h6>
			
          </div>
        </div>
      </div>
      <div className="nk-tb-list mt-n2">
      <Row className="g-gs">
             <Col xxl="3">
             
			<input type="text" className="form-control" placeholder="Search Keywords" />
		</Col>
	   <Col xxl="3">
             
			<select className="form-control" placeholder="Select a option">
				<option label="Date By State" value=""></option>
				<option value="fv-gq">General Question</option>
				<option value="fv-tq">Tachnical Question</option>
				<option value="fv-ab">Account &amp; Billing</option>
			 </select>
		</Col>
		 <Col xxl="3">
			<select className="form-control" placeholder="Select a option">
			
				<option label="Date By State" value=""></option>
				<option value="fv-gq">General Question</option>
				<option value="fv-tq">Tachnical Question</option>
				<option value="fv-ab">Account &amp; Billing</option>
			 </select>
		</Col>	  	
		 <Col xxl="3">
			<select className="form-control" placeholder="Select a option">
			
				<option label="Date By State" value=""></option>
				<option value="fv-gq">General Question</option>
				<option value="fv-tq">Tachnical Question</option>
				<option value="fv-ab">Account &amp; Billing</option>
			 </select>
		</Col>	  		
		
		</Row>	  		
		 <Row className="g-gs">
		    <Col xxl="3">
             
			<select className="form-control" placeholder="Select a option">
				<option label="Date By State" value=""></option>
				<option value="fv-gq">General Question</option>
				<option value="fv-tq">Tachnical Question</option>
				<option value="fv-ab">Account &amp; Billing</option>
			 </select>
		</Col>
          
	    <Col xxl="3">
             
			<select className="form-control" placeholder="Select a option">
				<option label="Date By State" value=""></option>
				<option value="fv-gq">General Question</option>
				<option value="fv-tq">Tachnical Question</option>
				<option value="fv-ab">Account &amp; Billing</option>
			 </select>
		</Col>
		 <Col xxl="3">
			<select className="form-control" placeholder="Select a option">
			
				<option label="Date By State" value=""></option>
				<option value="fv-gq">General Question</option>
				<option value="fv-tq">Tachnical Question</option>
				<option value="fv-ab">Account &amp; Billing</option>
			 </select>
		</Col>	  	
		 <Col xxl="3">
			<select className="form-control" placeholder="Select a option">
			
				<option label="Date By State" value=""></option>
				<option value="fv-gq">General Question</option>
				<option value="fv-tq">Tachnical Question</option>
				<option value="fv-ab">Account &amp; Billing</option>
			 </select>
		</Col>	  
		</Row>	
      </div>
    </Card>
  );
};
export default Filter;
