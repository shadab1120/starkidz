import React from "react";
import Content from "../../layout/content/Content";
import { Icon,DataTableHead, DataTableRow, DataTableItem, UserAvatar } from "../../components/Component";
import { recentOrderData } from "./data";
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

const LoginReports = () => {
  return (
    <Content>
      <Card className="card-full">
        <div className="card-inner">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Login Reports</h6>
            </div>
          </div>
        </div>
        <div className="nk-tb-list mt-n2">
          <DataTableHead>
            <DataTableRow>
              <span>S. No.</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span>Father's Name</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span>Mother's Name</span>
            </DataTableRow>
            <DataTableRow>
              <span>date of  Birth</span>
            </DataTableRow>
			 <DataTableRow>
              <span>District</span>
            </DataTableRow>
			<DataTableRow>
              <span>State</span>
            </DataTableRow>
			<DataTableRow>
              <span>Parent's Phone</span>
            </DataTableRow>
        <DataTableRow>
              <span>Parent's Email</span>
            </DataTableRow>
          <DataTableRow>
              <span>Date of Reg</span>
            </DataTableRow>
			   <DataTableRow>
              <span>Login Days</span>
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
                  <span className="tb-lead">{item.name}</span>
              
                </div>
              </DataTableRow>
              
			                <DataTableRow>
                <span className="tb-sub tb-amount">
                 {item.date}
                </span>
              </DataTableRow>
			                <DataTableRow>
                <span className="tb-sub tb-amount">
                                   State
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
               City
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
                                8209240091
                </span>
              </DataTableRow>
              
			  <DataTableRow>
                <span className="tb-sub tb-amount">
                 parent@gmail.com
                </span>
              </DataTableRow>
              
			  <DataTableRow>
                <span className="tb-sub tb-amount">
                   {item.date}
                </span>
              </DataTableRow>
              
			  <DataTableRow>
                <span className="tb-sub tb-amount">
                   14
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
export default LoginReports;
