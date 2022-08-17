import React from "react";
import { Card } from "reactstrap";
import { DataTableHead, DataTableRow, DataTableItem, UserAvatar } from "../../../Component";
import { Madya_Pradesh_Detail_List } from "./Madya_Pradesh_Detail_List";

const RecentOrders = () => {
  return (
    <Card className="card-full">
      <div className="card-inner">
        <div className="card-title-group">
          <div className="card-title">
            <h6 className="title">Madya Pradesh Detail</h6>
          </div>
        </div>
      </div>
      <div className="nk-tb-list mt-n2">
        <DataTableHead>
          <DataTableRow>
            <span>Event Name</span>
          </DataTableRow>
          <DataTableRow size="sm">
            <span>Registration</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span>Participants</span>
          </DataTableRow>
          <DataTableRow>
            <span>Score</span>
          </DataTableRow>
          <DataTableRow>
            <span className="d-none d-sm-inline">Ratings</span>
          </DataTableRow>
        </DataTableHead>
        {Madya_Pradesh_Detail_List.map((item, idx) => (
          <DataTableItem key={idx}>
            <DataTableRow>
              <span className="tb-lead">
                  {item.event_name}
              </span>
            </DataTableRow>
            <DataTableRow size="sm">
              <div className="user-card">
                <div className="user-name">
                  <span className="tb-lead">{item.registration}</span>
                </div>
              </div>
            </DataTableRow>
            <DataTableRow size="md">
              <span className="tb-lead">{item.participants}</span>
            </DataTableRow>
            <DataTableRow>
              <span className="tb-lead tb-score">
                {item.score}
              </span>
            </DataTableRow>
            <DataTableRow>
               <span className="tb-lead tb-ratings">
                {item.ratings}
              </span>
            </DataTableRow>
          </DataTableItem>
        ))}
      </div>
    </Card>
  );
};
export default RecentOrders;
