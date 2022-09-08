import React from "react";
import Content from "../../layout/content/Content";
import {
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  DataTableHead, DataTableRow, DataTableItem
} from "../../components/Component";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Api from "../../http/masterApis";
import "../style.css";

import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  Card,
} from "reactstrap";

const ManageCity = () => {
  const { data, error, isLoading } = useQuery('getCity', Api.getCity);
  const handleDelete = (row) => {
    console.error('row',row)
  }
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
            <h6 className="title">City List</h6>

          </div>
        </div>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <Link to="add-city" className="btn btn-danger">
                    Add City
                  </Link>
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
              <span>State Name</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span>City Name</span>
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
              <DataTableRow size="md">
                <span className="tb-lead"> {item.state_name}</span>
              </DataTableRow>

              <DataTableRow size="md">
                <span className="tb-lead"> {item.city_name}</span>
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
                <FiTrash2 className="ml-2" color="#d32f2f" onClick={(e) => handleDelete(item)} />

              </DataTableRow>
            </DataTableItem>
          ))}
        </div>
      </Card>
    </Content>
  );
};
export default ManageCity;
