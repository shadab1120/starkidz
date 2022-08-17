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
import { Data } from "./Data";
import "../style.css";

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
} from "reactstrap";

const ChildrenList = () => {
  return (
    <Content>
	<div >
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Children Enollment</h6>
			  
            </div>
          </div>
		  <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                 <a href="#" className="btn btn-danger">
				 Add Children
				 </a>	
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        </div>
      <Card className="card-full">
	  
        
		

        <div className="nk-tb-list mt-n2">
          <DataTableHead>
            <DataTableRow>
              <span>SI No.</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span>Student Name</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span>Class </span>
            </DataTableRow>
			<DataTableRow size="md">
              <span>Section </span>
            </DataTableRow>
			<DataTableRow size="md">
              <span>House </span>
            </DataTableRow>
			<DataTableRow size="md">
              <span>Student id </span>
            </DataTableRow>
			<DataTableRow size="md">
              <span>Stream</span>
            </DataTableRow>
			<DataTableRow size="md">
              <span>DOB</span>
            </DataTableRow>
			<DataTableRow size="md">
              <span>Email</span>
            </DataTableRow>
			
			<DataTableRow size="md">
              <span>Mobile</span>
            </DataTableRow>
            <DataTableRow>
              <span className="d-none d-sm-inline">Status</span>
            </DataTableRow>
			  <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {Data.map((item, idx) => (
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
             
			 <DataTableRow>
                <span className="tb-sub tb-amount">
                 {item.class_id}
                </span>
              </DataTableRow>
			
			 <DataTableRow>
                <span className="tb-sub tb-amount">
                 {item.section}
                </span>
              </DataTableRow>
				<DataTableRow>
                <span className="tb-sub tb-amount">
                 {item.house}
                </span>
              </DataTableRow>
			  <DataTableRow>
                <span className="tb-sub tb-amount">
                 {item.id}
                </span>
              </DataTableRow>
			  <DataTableRow>
                <span className="tb-sub tb-amount">
                 {item.stream}
                </span>
              </DataTableRow>
			  <DataTableRow>
                <span className="tb-sub tb-amount">
                 {item.dob}
                </span>
              </DataTableRow>
              
			  <DataTableRow>
                <span className="tb-sub tb-amount">
                 {item.email_id}
                </span>
              </DataTableRow>
              
			  <DataTableRow>
                <span className="tb-sub tb-amount">
                 {item.mobile}
                </span>
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
export default ChildrenList;
