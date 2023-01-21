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
import { Link, useHistory } from "react-router-dom";
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
  Spinner,
  Row,
  Col
} from "reactstrap";
import { useQuery, useMutation } from "react-query";
import Api from "../../http/masterApis";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const ManageState = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [row, setRow] = useState("");
  const [result, setResult] = useState('');
  const { errors, handleSubmit, register } = useForm();
  const { data, _, isLoading } = useQuery('getStateList', Api.getStateList);
  const manageMutation = useMutation(Api.manageState);

  const onSubmitFilter = ({ state_name }) => {
    state_name ? setResult(state_name) : setResult('')
  };

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
      <div>
        <form onSubmit={handleSubmit(onSubmitFilter)}>
          <Row className="mt-4">
            <Col md="4">
              <FormGroup className="form-group">
                <div className="form-control-wrap">
                  <label className="form-label" htmlFor="state_name">
                    State Name :
                  </label>
                  <select
                    ref={register}
                    {...register('state_name')}
                    name="state_name"
                    id="state_name"
                    placeholder="State Name"
                    className="form-select form-select-lg form-control"
                  >
                    <option key="-1" value="">State Name</option>
                    {data?.data?.map((list, i) => <option key={i} value={list.id}>{list.state_name}</option>)}
                  </select>
                  {errors.state_name && <span className="error">{errors.state_name.message}</span>}
                </div>
              </FormGroup>
            </Col>

            <Col className="d-flex align-items-end">
              <Button color="primary" size="md" bgColor="#D32F2F" bRadius="none" width="15%">
                Search
              </Button>
            </Col>
          </Row>
        </form>
      </div>
      <br />
      <div >
        <div className="card-title-group">
          <div className="card-title">
            <h6 className="title">State List</h6>

          </div>
        </div>
        <BlockHead size="sm">
          <BlockBetween className="move-right">
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

            {/* <DataTableRow>
              <span className="d-none d-sm-inline">Status</span>
            </DataTableRow> */}
            <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {loading && <Spinner size="sm" color="danger" />}
          {data?.data?.filter((l) => !result || l.id === result).map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow size="md">
                <span className="tb-lead">{item.state_name}</span>
              </DataTableRow>
              {/* <DataTableRow>
                <span
                  className={`badge badge-dot badge-dot-xs badge-${item.status === "Paid" ? "success" : item.status === "Due" ? "warning" : "danger"
                    }`}
                >
                  {item.status}
                </span>
              </DataTableRow> */}
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
