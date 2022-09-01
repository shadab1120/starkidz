import React from "react";
import Content from "../../layout/content/Content";
import { Icon, DataTableHead, DataTableRow, DataTableItem, UserAvatar } from "../../components/Component";
import { recentOrderData } from "./data";
import { format, compareAsc } from "date-fns";
import "./downloads.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Card } from "reactstrap";
import { useQuery } from "react-query";
import ContestApi from "../../http/ContestApi";
const MonitorContest = () => {
  const { data: ContestData, isLoading, isError } = useQuery("getContest", ContestApi.getContest);

  return (
    <Content>
      <Card className="card-full">
        <div className="card-inner">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">MonitorContest</h6>
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
          {Object.values(ContestData?.data)?.map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow>
                <span className="tb-lead">
                  <a href="#order" onClick={(ev) => ev.preventDefault()}>
                    {idx + 1}
                  </a>
                </span>
              </DataTableRow>
              <DataTableRow size="md">
                <div className="user-name">
                  <span className="tb-lead">{item.contest_short_name}</span>
                </div>
              </DataTableRow>
              <DataTableRow size="sm">
                <div className="user-card">
                  <UserAvatar
                    className="sm"
                    theme={item.theme}
                    text={item.initial}
                    image={item.contest_image}
                  ></UserAvatar>
                </div>
              </DataTableRow>

              <DataTableRow>
                <span className="tb-sub tb-amount">{item.contest_type_2}</span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">{format(new Date(item.contest_start_end_date), "dd/MM/yyyy")}</span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">{format(new Date(item.result_date), "dd/MM/yyyy")}</span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">{format(new Date(item.result_date), "dd/MM/yyyy")}</span>
              </DataTableRow>

              <DataTableRow>
                <span className="tb-sub tb-amount">N/A</span>
              </DataTableRow>

              <DataTableRow>
                <span className="tb-sub tb-amount">{format(new Date(item.contest_start_end_date), "dd/MM/yyyy")}</span>
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
export default MonitorContest;
