import React from "react";
import Content from "../../layout/content/Content";
import { Icon, DataTableHead, DataTableRow, DataTableItem, UserAvatar } from "../../components/Component";
import { recentOrderData } from "./data";
import "./downloads.css";
import Api from "../../http/masterApis";
import toast from "react-hot-toast";
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
import { useQuery, useMutation } from "react-query";

const Contest = () => {
  const { data } = useQuery(['getMultiSelectUsers', 'contestant'], Api.getMultiSelectUsers);
  console.log('data', data)
  const manageMutation = useMutation(Api.manageContestType);
  return (
    <Content>
      <Card className="card-full">
        <div className="card-inner">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Contestant</h6>
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
              <span>Email</span>
            </DataTableRow>
            <DataTableRow>
              <span>Date</span>
            </DataTableRow>
            <DataTableRow>
              <span className="d-none d-sm-inline">Status</span>
            </DataTableRow>
            <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {data?.data?.map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow>
                <span className="tb-lead">
                  <a href="#order" onClick={(ev) => ev.preventDefault()}>
                    {idx+1}
                  </a>
                </span>
              </DataTableRow>
              <DataTableRow size="md">
                <div className="user-name">
                  <span className="tb-lead">{item.name}</span>
                </div>
              </DataTableRow>
              <DataTableRow size="sm">
                <div className="user-name">
                  <span className="tb-lead">{item.email}</span>
                </div>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {item.date}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span
                  className={`badge badge-dot badge-dot-xs badge-${item.status === "Paid" ? "success" : item.status === "Due" ? "warning" : "danger"
                    }`}
                >
                  {item.status} Pending
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
