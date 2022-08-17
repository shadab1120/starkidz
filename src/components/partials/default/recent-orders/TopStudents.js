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

const Madya_Pradesh = () => {
  return (
    <Card className="card-full">
      <div className="card-inner">
        <div className="card-title-group">
          <div className="card-title">
            <h6 className="title">Top Students</h6>
			
          </div>
        </div>
      </div>
      <div className="nk-tb-list mt-n2">
      <Row className="g-gs">
          
	   <Col xxl="6">
             
			<select className="form-control" placeholder="Select a option">
				<option label="Content Type" value=""></option>
				<option value="fv-gq">General Question</option>
				<option value="fv-tq">Tachnical Question</option>
				<option value="fv-ab">Account &amp; Billing</option>
			 </select>
		</Col>
		 <Col xxl="6">
			<select className="form-control" placeholder="Select a option">
			
				<option label="Age Group Type" value=""></option>
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
export default Madya_Pradesh;
