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

const ResultAnnouncement = () => {
  return (
    <Content>
      <Card className="card-full">
        <div className="card-inner">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">ResultAnnouncement</h6>
            </div>
          </div>
        </div>
        <div className="nk-tb-list mt-n2">
          <DataTableHead>
            <DataTableRow>
              <span>S. No.</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span>Child's Name</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span>Mobile No</span>
            </DataTableRow>
            <DataTableRow>
              <span>Email</span>
            </DataTableRow>
			 <DataTableRow>
              <span>City State</span>
            </DataTableRow>
			<DataTableRow>
              <span>School Name</span>
            </DataTableRow>
			<DataTableRow>
              <span>Age Group</span>
            </DataTableRow>
        <DataTableRow>
              <span>Entry Document</span>
            </DataTableRow>
          <DataTableRow>
              <span>Avg Weight</span>
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
                    <span className="tb-lead">{item.mobile}</span>
              
                </div>
              </DataTableRow>
              
			                <DataTableRow>
                <span className="tb-sub tb-amount">
                 {item.email}
                </span>
              </DataTableRow>
			                <DataTableRow>
                <span className="tb-sub tb-amount">
                                   {item.city_state}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
                 {item.school}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
                                 {item.ageGroup}
                </span>
              </DataTableRow>
              
			  <DataTableRow>
                <button class="btn btn-danger" style={{backgroundColor:"#d32f2f"}}>Download</button>
              </DataTableRow>
              
			  <DataTableRow>
                <span className="tb-sub tb-amount">
                   {item.ageGroup}
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
export default ResultAnnouncement;
