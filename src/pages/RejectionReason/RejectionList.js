import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import {
  Button,
  Block,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  DataTableHead, DataTableRow, DataTableItem
} from "../../components/Component";
import Api from "../../http/masterApis";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import "../style.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import {
  Card,
  FormGroup,
  ModalBody,
  Modal,
  Row,
  Col,
  Spinner
} from "reactstrap";

const RejectionList = () => {

  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [_, setReFetch] = useState(false);
  const [row, setRow] = useState("");
  const toggle = () => setModal(!modal);
  const [result, setResult] = useState('');


  const { errors, handleSubmit, register, reset, setValue } = useForm();

  const { data } = useQuery(['getRejectionReasonList'], Api.getRejectionReasonList);

  const manageMutation = useMutation(Api.manageRejectionReason)

  const { data: rejection_list } = useQuery(
    ['getRejectionReason', row?.id],
    Api.getRejectionReason,
    {
      enabled: !!row,
    }
  )
  useEffect(() => {
    setLoading(false)
    if (rejection_list) {
      let { rejecting_reason } = rejection_list?.data[0]
      setValue('rejecting_reason', rejecting_reason);
    }
  }, [rejection_list, setValue])


  const onSubmit = (data) => {

    const event = row ? `update` : `insert`
    const message = row ? `update` : `created`
    if (row) {
      data.id = row.id;
    }
    const payload = {
      ...data,
      event: event
    };
    manageMutation.mutate(payload, {
      onSuccess: async (response) => {

        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        setReFetch(true);
        setRow('');
        toast.success(`Rejection reason ${message} successfully`);
        toggle();
        history.push(`${process.env.PUBLIC_URL}/rejection_reason`);
        reset();
      }
    });
  };
  const handleDelete = (row) => {
    setLoading(true);
    const { id } = row;
    const payload = {
      event: 'delete',
      id: id
    }

    manageMutation.mutate(payload, {
      onSuccess: async (response) => {
        setLoading(false);
        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        setReFetch(true);
        toast.success(`Rejection reason delete successfully`);
        history.push(`${process.env.PUBLIC_URL}/rejection_reason`);
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
            {row ? `Update` : `Add`} Rejection Reason
          </h5>
          <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={toggle}>
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md="6">
                <FormGroup className="form-group">
                  <div className="form-control-wrap">
                    <label className="form-label" htmlFor="contest_type_name">
                      Rejection Reason Name :
                    </label>
                    <textarea
                      rows="4"
                      className="form-control "
                      ref={register({ required: "This field is required" })}
                      name="rejecting_reason"
                      id="rejecting_reason"
                    ></textarea>
                    {errors.rejecting_reason && <span className="error">{errors.rejecting_reason.message}</span>}
                  </div>
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
            <h6 className="title">Rejection Reason List</h6>

          </div>
        </div>
        <BlockHead size="sm" >
          <BlockBetween className="move-right">
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <a href="#" className="btn btn-danger" onClick={toggle}>
                    Add Rejection Reason
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
              <span>Rejection Name</span>
            </DataTableRow>

            <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {loading && <Spinner size="sm" color="danger" />}
          {data?.data?.filter((l) => !result || l.id === result).map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow size="md">
                <span className="tb-lead">{idx+1}</span>
              </DataTableRow>

              <DataTableRow size="md">
                <span className="tb-lead">{item.rejecting_reason}</span>
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
export default RejectionList;
