import React, { useState, useEffect } from "react";
import Api from "../../http/masterApis";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import "../style.css";
import toast from "react-hot-toast";
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

import "../style.css";

import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  Card,
  FormGroup,
  ModalBody,
  Modal,
  Row,
  Col,
  Spinner
} from "reactstrap";

const StramMasterList = () => {

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState("");
  const history = useHistory();
  const toggle = () => setModal(!modal);
  const { errors, handleSubmit, register, reset, setValue } = useForm();

  const { data: stream_list } = useQuery(['getClassSectionHouseStreamList', 'stream'], Api.getClassSectionHouseStreamList);
  const manageMutation = useMutation(Api.manageClassSectionHouseStream)

  const { data: stream_details } = useQuery(
    ['getClassSectionHouseStream', row?.id, 'stream'],
    Api.getClassSectionHouseStream,
    {
      enabled: !!row,
    }
  )
  useEffect(() => {
    if (stream_details) {
      let { name } = stream_details?.data[0]
      setValue('name', name);
    }
  }, [stream_details])

  const onSubmit = (data) => {

    const event = row ? `update` : `insert`
    const message = row ? `update` : `created`
    if (row) {
      data.id = row.id;
    }
    const payload = {
      ...data,
      event: event,
      module: `stream`
    };

    manageMutation.mutate(payload, {
      onSuccess: async (response) => {

        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        toast.success(`Stream ${message} successfully`);
        toggle();
        history.push(`${process.env.PUBLIC_URL}/stream_master`);
        reset();
      }
    });
  };
  const handleDelete = (row) => {
    setLoading(true);
    const { id } = row;
    const payload = {
      module: `stream`,
      event: 'delete',
      id: id
    }

    manageMutation.mutate(payload, {
      onSuccess: async (response) => {
        setLoading(false);
        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        toast.success(`Stream delete successfully`);
        history.push(`${process.env.PUBLIC_URL}/stream_master`);
      }
    });
  }
  const handleEdit = (row) => {
    setRow(row);
    toggle();
  }
  return (
    <Content>
      <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered modal-lg">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {row ? `Update` : `Add`} Stream
          </h5>
          <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={toggle}>
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="role_name">
                    Stream Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Section Name"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.name && <span className="error" style={{ color: 'red' }}>{errors.name.message}</span>}
                </FormGroup>

              </Col>
              <Col md="6">
                <FormGroup style={{ 'marginTop': '38px' }}>
                  <Button type="submit" color="danger" >
                    Submit
                  </Button>
                </FormGroup>


              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
      <div >
        <div className="card-title-group">
          <div className="card-title">
            <h6 className="title">StreamMaster List</h6>

          </div>
        </div>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <a href="#" className="btn btn-danger" onClick={toggle}>
                    Add Stream Master
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
              <span>S. No.</span>
            </DataTableRow>

            <DataTableRow>
              <span>Stream Name</span>
            </DataTableRow>

            <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>

          {loading && <Spinner size="sm" color="danger" />}
          {stream_list?.data.map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow size="md">
                <span className="tb-lead">{idx}</span>
              </DataTableRow>

              <DataTableRow size="md">
                <span className="tb-lead">{item.name}</span>
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
export default StramMasterList;
