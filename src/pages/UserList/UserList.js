import React from "react";
import { useQuery } from "react-query";
import Content from "../../layout/content/Content";
import {
  BlockBetween,
  BlockHead,
  BlockHeadContent,DataTableHead, DataTableRow, DataTableItem, UserAvatar
} from "../../components/Component";
import "../style.css";
import Api from "../../http/masterApis";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  Card,
} from "reactstrap";

const UserList = () => {
  const {  data, error, isLoading } = useQuery('getUser', Api.getUsers);

if (isLoading) {
  return (
    <>
      <Content>loading...</Content>
    </>
  );
}


return (
  <Content>
    <div >
      <div className="card-title-group">
        <div className="card-title">
          <h6 className="title">User</h6>

        </div>
      </div>
      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <ul className="nk-block-tools g-3">
              <li>
                <a href="add-users" className="btn btn-danger">
                  Add New User
                </a>
              </li>
            </ul>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>
    </div>
    <Card className="card-full">




      <div className="nk-tb-list mt-n2">
        <DataTableHead>
          <DataTableRow>
            <span>SI No.</span>
          </DataTableRow>
          <DataTableRow size="sm">
            <span>Employee First Name</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span>Employee last Name</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span>Mobile</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span>Email-id</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span>Department</span>
          </DataTableRow>

          <DataTableRow size="md">
            <span>Role</span>
          </DataTableRow>
          <DataTableRow>
            <span className="d-none d-sm-inline">Employee Status</span>
          </DataTableRow>
          <DataTableRow>
            <span className="d-none d-sm-inline">Action</span>
          </DataTableRow>
        </DataTableHead>
        {Object.values(data?.data)?.map((item, idx) => (
          <DataTableItem key={idx}>
            <DataTableRow>
              <span className="tb-lead">
                <a href="#order" onClick={(ev) => ev.preventDefault()}>
                {idx}
                </a>
              </span>
            </DataTableRow>
            <DataTableRow size="md">
              <span className="tb-lead">{item.name}</span>
            </DataTableRow>

            <DataTableRow>
              <span className="tb-sub tb-amount">
                {item.name}
              </span>
            </DataTableRow>
            <DataTableRow>
              <span className="tb-sub tb-amount">
                {item.phone}
              </span>
            </DataTableRow>

            <DataTableRow>
              <span className="tb-sub tb-amount">
                {item.email}
              </span>
            </DataTableRow>
            <DataTableRow>
              <span className="tb-sub tb-amount">
                {item.Department}
              </span>
            </DataTableRow>
            <DataTableRow>
              <span className="tb-sub tb-amount">
                {item.Role}
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
export default UserList;
