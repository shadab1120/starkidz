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
import { StatesData } from "./StatesData";
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

const DataList = () => {
  return (
    <Content>
	<div >
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">State List</h6>
			  
            </div>
          </div>
		  <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                 <a href="#" className="btn btn-danger">
				 Add State
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
              <span>State Name</span>
            </DataTableRow>
          
            <DataTableRow>
              <span className="d-none d-sm-inline">Status</span>
            </DataTableRow>
						  <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {StatesData.map((item, idx) => (
            <DataTableItem key={idx}>
             <DataTableRow size="md">
                <span className="tb-lead">{item.name}</span>
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
export default DataList;
