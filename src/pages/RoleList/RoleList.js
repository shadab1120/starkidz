import React, { useState } from "react";
import Content from "../../layout/content/Content";
import {
  Button,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  DataTableHead,
  DataTableRow,
  DataTableItem
} from "../../components/Component";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { STATUS_OPTIONS } from "./../../utils/Utils";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import "../style.css";
import Api from "../../http/masterApis";
import { Card, FormGroup, ModalBody, Modal, Row, Col, Spinner } from "reactstrap";
import toast from "react-hot-toast";

const DataList = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState("");
  const history = useHistory();
  const toggle = () => setModal(!modal);
  const { errors, handleSubmit, register, reset } = useForm();
  const { data: role_list } = useQuery('getRole', Api.getRole);

  const { data: user_list } = useQuery(
    ['getUser', row],
    Api.getUsers,
    {
      enabled: !!row,
    }
  )

  const mutation = useMutation(Api.manageRole);
  const updateMutation = useMutation(Api.updateRole)

  const onSubmit = (data) => {
    setLoading(true)
    data.event = 'insert'
    const payload = {
      ...data,
    };
    mutation.mutate(payload, {
      onSuccess: async (response) => {
        console.log('newPost', response?.data?.status === 'Failed')
        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        toast.success("Role created successfully");
        toggle();
        history.push("/backend/frontend/roles");
        reset();
      }
    });
  };
  const handleDelete = (row) => {
    setLoading(true);
    const { role_name } = row;
    const payload = {
      role_name: role_name,
      event: 'delete'
    }

    mutation.mutate(payload, {
      onSuccess: async (response) => {
        setLoading(false);
        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        toast.success("Role deleted successfully");
        history.push(`${process.env.PUBLIC_URL}/roles`);
      }
    });
  }
  const handleEdit = (row) => {
    setRow(row);
    toggle();
  }
  const onUpdate = (data) => {
    setLoading(true)
    const payload = {
      ...data,
    };
    updateMutation.mutate(payload, {
      onSuccess: async (response) => {
        if (response?.data?.status === 'Failed') {
          setLoading(false);
          return toast.error(response?.data?.msg);
        }
        toast.success("Role updated successfully");
        toggle();
        history.push("/backend/frontend/roles");
        reset();
      }
    });
  };

  return (
    <Content>
      {/* bootstrap modal */}
      <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered modal-lg">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {row ? `Update` : `Add`} Role
          </h5>
          <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={toggle}>
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          {row ? <form onSubmit={handleSubmit(onUpdate)}>
           <Row>
              <Col md="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="role_name">
                    User Name
                  </label>
                  <select className="form-control"
                    ref={register}
                    {...register('user_id')}
                    name="user_id"
                    id="user_id">
                    {user_list?.data?.map((item, idx) => <option key={idx} value={item.id}>{item.name}</option>)}
                  </select>
                  {errors.user_id && <span className="error" style={{ color: 'red' }}>{errors.user_id.message}</span>}
                </FormGroup>

              </Col>
              <Col md="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="role_name">
                    Role Name
                  </label>
                  <select className="form-control"
                    ref={register}
                    {...register('role_name')}
                    name="role_name"
                    id="role_name">
                    {role_list?.data?.map((item, idx) => <option key={idx} value={item.name}>{item.role_name}</option>)}
                  </select>
                  {errors.role_name && <span className="error" style={{ color: 'red' }}>{errors.role_name.message}</span>}
                </FormGroup>


              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="role_short_name">
                    Role Short Name
                  </label>
                  <input
                    type="text"
                    id="role_short_name"
                    name="role_short_name"
                    className="form-control"
                    placeholder="Role Short Name"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.role_short_name && <span className="error" style={{ color: 'red' }}>{errors.role_short_name.message}</span>}
                </FormGroup>

              </Col>
              <Col md="6">

              </Col>
            </Row>

            {/* submit btn */}
            <Button type="submit" color="danger" className="mt-3">
              Submit
             </Button>
          </form> :
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="role_name">
                      Role Name
                    </label>
                    <input
                      type="text"
                      id="role_name"
                      name="role_name"
                      className="form-control"
                      placeholder="Role Name"
                      ref={register({ required: "This field is required" })}
                    />
                    {errors.role_name && <span className="error" style={{ color: 'red' }}>{errors.role_name.message}</span>}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="role_short_name">
                      Role Short Name
                    </label>
                    <input
                      type="text"
                      id="role_short_name"
                      name="role_short_name"
                      className="form-control"
                      placeholder="Role Short Name"
                      ref={register({ required: "This field is required" })}
                    />
                    {errors.role_short_name && <span className="error" style={{ color: 'red' }}>{errors.role_short_name.message}</span>}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="example3cols3Input">
                      Role Order
                    </label>
                    <input
                      type="text"
                      id="role_order"
                      name="role_order"
                      className="form-control"
                      placeholder="Role Order"
                      ref={register({ required: "This field is required" })}
                    />
                    {errors.role_order && <span className="error" style={{ color: 'red' }}>{errors.role_order.message}</span>}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="active">
                      Role Status
                    </label>
                    {/* dropdown for status */}
                    <select className="form-control"
                      ref={register}
                      {...register('active')}
                      name="active"
                      id="active">
                      {STATUS_OPTIONS.map((list, i) => <option key={i} value={list.value}>{list.name}</option>)}
                    </select>
                    {errors.active && <span className="error" style={{ color: 'red' }}>{errors.active.message}</span>}
                  </FormGroup>
                </Col>
              </Row>

              {/* submit btn */}
              <Button type="submit" color="danger" className="mt-3">
                Submit
              </Button>
            </form>
          }
        </ModalBody>
      </Modal>

      <div>
        <div className="card-title-group">
          <div className="card-title">
            <h6 className="title">Role List</h6>
          </div>
        </div>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <a href="#" className="btn btn-danger" onClick={toggle}>
                    Add Role
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
              <span>Role Name</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span>Role short name</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span>Role Order</span>
            </DataTableRow>

            <DataTableRow>
              <span className="d-none d-sm-inline">Status</span>
            </DataTableRow>
            <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {loading && <Spinner size="sm" color="danger" />}

          {role_list?.data?.map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow size="md">
                <span className="tb-lead">{item.role_name}</span>
              </DataTableRow>

              <DataTableRow>
                <span className="tb-sub tb-amount">{item.role_short_name}</span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">{item.role_order}</span>
              </DataTableRow>
              <DataTableRow>
                <span
                  className={`badge badge-dot badge-dot-xs badge-${item.is_active === "1" ? "success" : item.is_active === "0" ? "warning" : "danger"
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
export default DataList;
