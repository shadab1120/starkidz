import React from "react";
import Content from "../../layout/content/Content";
import {  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  PaginationComponent,Icon,DataTableHead, DataTableRow, DataTableItem, UserAvatar } from "../../components/Component";
import { ContentTypeData } from "./ContentTypeData";
import avtar from "../../images/avatar/c-sm.jpg";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
	Card,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Progress,
  FormGroup,
  ModalBody,
  Modal,
  DropdownItem,
  Form,
  Col,Row
} from "reactstrap";
const ContentType = () => {
  return (
    <Content>
	 <div>
        <form>
          <Row className="mt-4">
		    <Col>
              <FormGroup className="form-group">
                <label className="form-label" htmlFor="bucksTo">
                  ContentType Name :
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="bucksTo"
                    name="bucksTo"
                    className="form-control"
                  />
                
                </div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="form-group">
                <label className="form-label" htmlFor="bucksFrom">
                  ContentType Image :
                </label>
                <div className="form-control-wrap">
                  <input
                    type="file"
                    id="bucksFrom"
                    name="bucksFrom"
                    className="form-control"
                  />
                 
                </div>
              </FormGroup>
            </Col>
          
            <Col className="d-flex align-items-end">
              <Button color="primary" size="md" bgColor="#D32F2F" bRadius="none" width="50%">
                Submit
              </Button>
            </Col>
          </Row>
        </form>
      </div>
      <Card className="card-full mt-4">
	  
       
         <div className="nk-tb-list">
          <DataTableHead>
            <DataTableRow>
              <span>Sr No.</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span>ContentType Name</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span> Image</span>
            </DataTableRow>
          
            <DataTableRow>
              <span className="d-none d-sm-inline">Status</span>
            </DataTableRow>
			  <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {ContentTypeData.map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow>
                <span className="tb-lead">
                  <a href="#order" onClick={(ev) => ev.preventDefault()}>
                    {item.id}
                  </a>
                </span>
              </DataTableRow>
			  <DataTableRow size="md">
                <span className="tb-lead">{item.name}</span>
              </DataTableRow>
              <DataTableRow size="md">
               <img className="img-fluid" src={avtar} alt="njkl" />
              </DataTableRow>
             
			
              <DataTableRow>
                <span
                  className={`badge badge-dot badge-dot-xs badge-${
                    item.status === "Paid" ? "success" : item.status === "Due" ? "warning" : "danger"
                  }`}
                >
                  {item.status}
                </span>
              </DataTableRow>
			   <DataTableRow className="">
			    <FiEdit color="green" />
                      <FiTrash2 className="ml-2" color="#d32f2f" />
			           
                      </DataTableRow>
            </DataTableItem>
          ))}
        </div>
      </Card>
    </Content>
  );
};
export default ContentType;
