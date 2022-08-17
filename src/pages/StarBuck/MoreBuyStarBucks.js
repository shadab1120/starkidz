import React, { useEffect } from "react";
import Content from "../../layout/content/Content";
import { Card } from "reactstrap";
import Paper from "@mui/material/Paper";
import { Row, Col, FormGroup } from "reactstrap";
import { Button } from "../../components/Component";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Api from "../../http/api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import first_coin from "../../images/coins/1.png";
import second_coin from "../../images/coins/2.png";
import third_coin from "../../images/coins/3.png";
import forth_coin from "../../images/coins/4.png";
import five_coin from "../../images/coins/5.png";

export default function StarBucks() {
  const { data } = useQuery("starBucks", Api.getStarBucks);
  const mutation = useMutation(Api.manageStarBucks);
  const [starBucks, setStarBucks] = React.useState([]);
  const { errors, register, handleSubmit, reset } = useForm({
    reValidateMode: "onChange",
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      const { data: bucks } = data;
      const mainBucks = Object.values(bucks);
      if (mainBucks.length > 0) {
        setStarBucks(mainBucks);
      }
    }
  }, [data]);


  return (
    <Content>
   
        <div className="row">
		<Col sm={2} lg={2} xxl={2}>
		 <img src={first_coin} alt={first_coin} />
    
        </Col>
		<Col sm={2} lg={2} xxl={2}>
		 <img src={second_coin} alt={second_coin} />
    
        </Col>
		<Col sm={2} lg={2} xxl={2}>
		  <img src={third_coin} alt={third_coin} />
    
        </Col>
		<Col sm={2} lg={2} xxl={2}>
		  <img src={forth_coin} alt={forth_coin} />
    
        </Col>
		<Col sm={2} lg={2} xxl={2}>
		  <img src={five_coin} alt={five_coin} />
    
        </Col>
		</div>
       <h2>Buy Star Bucks:</h2>
        <div className="row">
		
		<Col sm={6} lg={6} xxl={6}>
				 <Row className="mt-4">
		 
		 <Col>
              <FormGroup className="form-group">
                <label className="form-label" htmlFor="bucksFrom">
                 Entry Qty :
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="bucksFrom"
                    name="bucksFrom"
					style={{height:'50px'}}
                    className="form-control"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.bucksFrom && <span className="invalid">{errors.bucksFrom.message}</span>}
                </div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="form-group">
                <label className="form-label" htmlFor="bucksTo">
                 Coupon Code:
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="bucksTo"
                    name="bucksTo"
					style={{height:'50px'}}
                 
                    className="form-control"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.bucksTo && <span className="invalid">{errors.bucksTo.message}</span>}
                </div>
              </FormGroup>
            </Col>
           
            <Col className="d-flex align-items-end">
              <Button color="primary" style={{height:'50px'}} size="lg" bgColor="#D32F2F" bRadius="none" width="100%">
                Apply
              </Button>
            </Col>
			
          </Row>
		 </Col>
		 </div>
		<div className="row">
		
		<Col sm={6} lg={6} xxl={6}>
				 <Row className="mt-4">
		 
		 <Col>
              <FormGroup className="form-group">
                <label className="form-label" htmlFor="bucksFrom">
                 Total Rupess Value :
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="bucksFrom"
                    name="bucksFrom"
					style={{height:'50px'}}
                    className="form-control"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.bucksFrom && <span className="invalid">{errors.bucksFrom.message}</span>}
                </div>
              </FormGroup>
            </Col>
            
           
            <Col className="d-flex align-items-end">
              <Button color="primary" style={{height:'50px'}} size="lg" bgColor="#D32F2F" bRadius="none" width="100%">
                Confirm Star Bucks Order
              </Button>
            </Col>
			
          </Row>
		 </Col>
		 </div>
		 
		 <div className="row">
		 <Col sm={12} lg={12} xxl={12}>
		
		 <h3>Terms & Conditions:</h3>
  </Col>
				 
		 <Col>
		 <ul>
		  <li>1. Validity of purchased Star-Bucks is 365 days from the date of purchase.
 </li>
  <li>
2. Star-Bucks purchased are non-refundable and can only be used against participating in contests at thestarkidz.com
 </li>
  <li>
3. Star-Bucks cannot be transferred or clubbed with any other participant's account or Star Bucks
 </li>
  <li>
4. The amount paid for purchasing Star-Bucks includes 18% GST
 </li>
  <li>
5. Star-Bucks are not e-money or currency of any type. They can only be used on The Star Kidz website according to The Star Kidz rules.
 </li>     
	 </ul>
	 </Col>
		 </div>
		 
    </Content>
  );
}
