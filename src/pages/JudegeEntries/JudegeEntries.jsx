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

const JudegeEntries = () => {
  return (
    <Content>
      <Card className="card-full">
        <div className="card-inner">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">JudegeEntries</h6>
            </div>
          </div>
        </div>
        <div className="nk-tb-list mt-n2">
          <DataTableHead>
            <DataTableRow>
              <span>Order No.</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span>Entry ID</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span>Contest Name</span>
            </DataTableRow>
            <DataTableRow>
              <span>Judge By Date</span>
            </DataTableRow>
			 <DataTableRow>
              <span>Entry Document</span>
            </DataTableRow>
			<DataTableRow>
              <span>Age Group</span>
            </DataTableRow>
            <DataTableRow>
              <span className="d-none d-sm-inline">Progress</span>
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
                <span className="tb-lead">{item.order}123</span>
              </DataTableRow>
              <DataTableRow size="sm">
                <div className="user-card">
                  <UserAvatar className="sm" theme={item.theme} text={item.initial} image={item.img}></UserAvatar>
                  <div className="user-name">
                    <span className="tb-lead">{item.name}</span>
                  </div>
                </div>
              </DataTableRow>
              
			                <DataTableRow>
                <span className="tb-sub tb-amount">
                 {item.date}
                </span>
              </DataTableRow>
			                <DataTableRow>
                <span className="tb-sub tb-amount">
                  {item.amount}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {item.ageGroup}
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
export default JudegeEntries;
