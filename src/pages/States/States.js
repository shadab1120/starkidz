import React, { useState } from "react";
import Content from "../../layout/content/Content";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  PaginationComponent, Icon, DataTableHead, DataTableRow, DataTableItem, UserAvatar
} from "../../components/Component";
import { Link,useHistory } from "react-router-dom";
import "../style.css";

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
  Spinner
} from "reactstrap";
import { useQuery, useMutation } from "react-query";
import Api from "../../http/masterApis";
import toast from "react-hot-toast";

const ManageState = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [row, setRow] = useState("");
  const { data, error, isLoading } = useQuery('getStateList', Api.getStateList);
  const manageMutation = useMutation(Api.manageState);

  const handleDelete = (row) => {
    setLoading(true);
    const { id } = row;
    const payload = {
      id: id,
      event: 'delete'
    }

    manageMutation.mutate(payload, {
      onSuccess: async (response) => {
        setLoading(false);
        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        toast.success("State deleted successfully");
        history.push(`${process.env.PUBLIC_URL}/states`);
      }
    });
  }
  const handleEdit = (row) => {
    const { id } = row;
    setRow(row)
    history.push(`${process.env.PUBLIC_URL}/add-state/${id}`);
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
            <h6 className="title">State List</h6>

          </div>
        </div>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <Link to="add-state" className="btn btn-danger">
                    Add State
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

            <DataTableRow>
              <span className="d-none d-sm-inline">Status</span>
            </DataTableRow>
            <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {loading && <Spinner size="sm" color="danger" />}
          {data?.data?.map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow size="md">
                <span className="tb-lead">{item.state_name}</span>
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
                <FiEdit color="green" onClick={(e) => handleEdit(item)} />
                <FiTrash2 className="ml-2" color="#d32f2f" onClick={(e) => handleDelete(item)} />

              </DataTableRow>
            </DataTableItem>
          ))}
        </div>
      </Card>
    </Content>
  );
};
export default ManageState;
