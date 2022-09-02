import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient, useQuery } from "react-query";
import moment from "moment"
import {DATE_AND_TIME_FORMAT} from "./../../utils/Utils.js"
import Api from "../../http/ContestApi";
import Content from "../../layout/content/Content";
import { Icon, DataTableHead, DataTableRow, DataTableItem, UserAvatar } from "../../components/Component";
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

const MonitorContest = () => {
  const data = useSelector((state) => state.contest);
  const users = useSelector((state) => state.auth.user);
  const contestMutaion = useMutation(Api.getContest);
  const [contestDetails, setContestDetails] = useState({});
console.log('users',users)

  useEffect(() => {
    if (!data) return;
    contestMutaion.mutate(
      {
    
      },
      {
        onSuccess: (res) => {
          setContestDetails(res.data);
        },
      }
    );
  }, [data]);



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
          {Object.values(contestDetails)?.map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow>
                <span className="tb-lead">
                  <a href="#order" onClick={(ev) => ev.preventDefault()}>
                    {idx}
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
                  <UserAvatar className="sm" theme={item.theme} text={item.initial} image={item.contest_image}></UserAvatar>

                </div>
              </DataTableRow>

              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {item.contest_type_2}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {moment(item.contest_start_end_date).format(DATE_AND_TIME_FORMAT)}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
                {moment(item.contest_start_end_date).format(DATE_AND_TIME_FORMAT)}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {moment(item.result_date).format(DATE_AND_TIME_FORMAT)}
                </span>
              </DataTableRow>

              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {users?.display_name}
                </span>
              </DataTableRow>

              <DataTableRow>
                <span className="tb-sub tb-amount">
                {moment(item.updated_at).format(DATE_AND_TIME_FORMAT)}
                </span>
              </DataTableRow>


              <DataTableRow>
                <span
                  className={`badge badge-dot badge-dot-xs badge-${item.status === "Paid" ? "success" : item.status === "Due" ? "warning" : "danger"
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
