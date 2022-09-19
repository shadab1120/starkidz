import React, { useState } from "react";
import Content from "../../layout/content/Content";
import {
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  DataTableHead, DataTableRow, DataTableItem
} from "../../components/Component";
import { useQuery, useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import Api from "../../http/masterApis";
import "../style.css";

import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  Card, Spinner
} from "reactstrap";
import toast from "react-hot-toast";

const ManageBracket = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { data, isLoading } = useQuery('getAgeBracketsList', Api.getAgeBracketsList);
  const manageMutation = useMutation(Api.manageAgeBracket);

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
        toast.success("Age bracket deleted successfully");
      }
    });
  }
  const handleEdit = (row) => {
    const { id } = row;
    history.push(`${process.env.PUBLIC_URL}/add-age-bracket/${id}`);
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
            <h6 className="title">Bracket List</h6>

          </div>
        </div>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <Link to="add-age-bracket" className="btn btn-danger">
                    Add Bracket
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
              <span>Bracket Name</span>
            </DataTableRow>

            <DataTableRow>
              <span className="d-none d-sm-inline">Status</span>
            </DataTableRow>
            <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {loading && <Spinner size="sm" color="danger" />}
          {Object.values(data?.data)?.map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow size="md">
                <span className="tb-lead">{item.age_from} - {item.age_to}</span>
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
export default ManageBracket;
