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

          </div>
        </div>
      </div>
      <div className="nk-tb-list mt-n2">
        <DataTableHead>
          <DataTableRow>
            <span>S NO.</span>
          </DataTableRow>
          <DataTableRow size="sm">
            <span>Profile</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span>Name</span>
          </DataTableRow>
          <DataTableRow>
            <span>Contest Winner</span>
          </DataTableRow>
          <DataTableRow>
            <span className="d-none d-sm-inline">Score</span>
          </DataTableRow>
        </DataTableHead>
        {Madya_Pradesh_Detail_List.map((item, idx) => (
          <DataTableItem key={idx}>
            <DataTableRow>
              <span className="tb-lead">
                  {item.id}
              </span>
            </DataTableRow>
            <DataTableRow size="sm">
              <div className="user-card">
                <div className="user-name">
				  <UserAvatar className="sm" theme={item.theme} text={item.initial} image={item.img}></UserAvatar>

                </div>
              </div>
            </DataTableRow>
            <DataTableRow size="md">
              <span className="tb-lead">{item.name}</span>
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
