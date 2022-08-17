import React from "react";
import { Card } from "reactstrap";
import { DataTableHead, DataTableRow, DataTableItem, UserAvatar } from "../../../Component";
import { recentOrderData } from "./OrderData";
import { FiEdit, FiTrash2 } from "react-icons/fi";
const RecentOrders = () => {
  return (
    <Card className="card-full">
      <div className="card-inner">
        <div className="card-title-group">
          <div className="card-title">
            <h6 className="title">Recent Entry</h6>
          </div>
        </div>
      </div>
      <div className="nk-tb-list mt-n2">
        <DataTableHead>
          <DataTableRow>
            <span>S No.</span>
          </DataTableRow>
		    <DataTableRow size="md">
            <span>Date</span>
          </DataTableRow>
		 <DataTableRow size="sm">
            <span>Issue No</span>
          </DataTableRow>
		   <DataTableRow size="sm">
            <span>Type</span>
          </DataTableRow>
          <DataTableRow size="sm">
            <span>Customer</span>
          </DataTableRow>
          <DataTableRow>
            <span>State</span>
          </DataTableRow>
          <DataTableRow>
            <span className="d-none d-sm-inline">Status</span>
          </DataTableRow>
		  <DataTableRow>
            <span className="d-none d-sm-inline">Action</span>
          </DataTableRow>
		  		  <DataTableRow>
            <span className="d-none d-sm-inline">View</span>
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
              <span className="tb-lead">{item.date}</span>
            </DataTableRow>
            
            
			
			<DataTableRow size="md">
              <span className="tb-lead">123</span>
            </DataTableRow>
            
			<DataTableRow size="md">
              <span className="tb-lead">Event</span>
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
               State
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
			 <DataTableRow>
			  <FiEdit color="green" />
			  <FiTrash2 className="ml-2" color="#d32f2f" />
			   
			  </DataTableRow>
			   <DataTableRow>
			    <a href="#" className="btn btn-danger">
				 View
				 </a>	
			     </DataTableRow>
          </DataTableItem>
        ))}
      </div>
    </Card>
  );
};
export default RecentOrders;
