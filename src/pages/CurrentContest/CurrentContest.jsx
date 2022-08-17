import React from "react";
import { Card } from "reactstrap";
import Content from "../../layout/content/Content";
import { DataTableHead, DataTableRow, DataTableItem, UserAvatar } from "../../components/Component";
import { recentOrderData } from "./OrderData";
import "./oldContest.css";

const OldContest = () => {
  return (
    <Content>
      <Card className="card-full">
        <div className="card-inner">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Current Contests</h6>
            </div>
          </div>
        </div>
        <div className="nk-tb-list mt-n2">
          <DataTableHead>
            <DataTableRow>
              <span>SNo.</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span>Contest Name</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span>Uploaded Entry</span>
            </DataTableRow>
            <DataTableRow>
              <span>Contestant Name</span>
            </DataTableRow>
            <DataTableRow>
              <span>Subbmited On</span>
            </DataTableRow>
            <DataTableRow>
              <span>Status</span>
            </DataTableRow>
            <DataTableRow>
              <span>Download Certificate</span>
            </DataTableRow>
          </DataTableHead>
          {recentOrderData.map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow>
                <span className="tb-lead">
                  <a href="#order" onClick={(ev) => ev.preventDefault()}>
                    {idx + 1}
                  </a>
                </span>
              </DataTableRow>
              <DataTableRow size="sm">
                <div className="user-card">
                  <div className="user-name">
                    <span className="tb-lead">{item.name}</span>
                  </div>
                </div>
              </DataTableRow>
              <DataTableRow size="md">
                <UserAvatar className="md" theme={item.theme} text={item.initial} image={item.img}></UserAvatar>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="tb-lead">{item.name}</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="tb-lead">{new Date().toDateString()}</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="tb-lead">Active</span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
                  <a href="#">Download</a>
                </span>
              </DataTableRow>
            </DataTableItem>
          ))}
        </div>
      </Card>
    </Content>
  );
};
export default OldContest;
