import React from "react";
import Content from "../../layout/content/Content";
import { Icon,DataTableHead, DataTableRow, DataTableItem, UserAvatar } from "../../components/Component";
import { recentOrderData } from "./data";
import "./downloads.css";
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

const Contest = () => {
  return (
    <Content>
      <Card className="card-full">
        <div className="card-inner">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Contest</h6>
            </div>
          </div>
        </div>
        <div className="nk-tb-list mt-n2">
          <DataTableHead>
            <DataTableRow>
              <span>S. No.</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span>Contest Name</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span>Image</span>
            </DataTableRow>
            <DataTableRow>
              <span>Contest Type</span>
            </DataTableRow>
			 <DataTableRow>
              <span>Start Date</span>
            </DataTableRow>
			<DataTableRow>
              <span>End Date</span>
            </DataTableRow>
			<DataTableRow>
              <span>Result Date</span>
            </DataTableRow>
        <DataTableRow>
              <span>Created By</span>
            </DataTableRow>
          <DataTableRow>
              <span>Created On</span>
            </DataTableRow>
	   <DataTableRow>
              <span className="d-none d-sm-inline">Status</span>
            </DataTableRow>
			  <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {recentOrderData.map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow>
                <span className="tb-lead">
                  <a href="#order" onClick={(ev) => ev.preventDefault()}>
                    {item.order}
                  </a>
                </span>
              </DataTableRow>
			  <DataTableRow size="md">
                   <div className="user-name">
                    <span className="tb-lead">{item.name}</span>
                  </div>
              </DataTableRow>
              <DataTableRow size="sm">
                <div className="user-card">
                  <UserAvatar className="sm" theme={item.theme} text={item.initial} image={item.img}></UserAvatar>
              
                </div>
              </DataTableRow>
              
			                <DataTableRow>
                <span className="tb-sub tb-amount">
                 {item.date}
                </span>
              </DataTableRow>
			                <DataTableRow>
                <span className="tb-sub tb-amount">
                                   {item.date}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
                 {item.date}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
                                 {item.date}
                </span>
              </DataTableRow>
              
			  <DataTableRow>
                <span className="tb-sub tb-amount">
                 {item.name}
                </span>
              </DataTableRow>
              
			  <DataTableRow>
                <span className="tb-sub tb-amount">
                   {item.date}
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
export default Contest;
