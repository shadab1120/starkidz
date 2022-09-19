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

const ClassDataList = () => {

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reFetech, setReFetch] = useState(false);
  const [row, setRow] = useState("");
  const history = useHistory();
  const toggle = () => setModal(!modal);
  const { errors, handleSubmit, register, reset, setValue } = useForm();

  const { data: class_list } = useQuery(['getClassSectionHouseStreamList', 'class'], Api.getClassSectionHouseStreamList);
  const manageMutation = useMutation(Api.manageClassSectionHouseStream)

  const { data: class_details } = useQuery(
    ['getClassSectionHouseStream', row?.id, 'class'],
    Api.getClassSectionHouseStream,
    {
      enabled: !!row,
    }
  )
  useEffect(() => {
    if (class_details) {
      let { name } = class_details?.data[0]
      setValue('name', name);
    }
  }, [class_details])

  const onSubmit = (data) => {

    const event = row ? `update` : `insert`
    const message = row ? `update` : `created`
    if (row) {
      data.id = row.id;
    }
    const payload = {
      ...data,
      event: event,
      module: `class`
    };

    manageMutation.mutate(payload, {
      onSuccess: async (response) => {

        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        setReFetch(true);
        toast.success(`Class ${message} successfully`);
        history.push(`${process.env.PUBLIC_URL}/class_master`);
        reset();
      }
    });
  };
  const handleDelete = (row) => {
    setLoading(true);
    const { id } = row;
    const payload = {
      module: `class`,
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
        toast.success(`Class delete successfully`);
        history.push(`${process.env.PUBLIC_URL}/class_master`);
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
            {row ? `Update` : `Add`} Class
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
                  <label className="form-control-label" htmlFor="name">
                    Class Name
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
            <h6 className="title">Class List</h6>

          </div>
        </div>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <a href="#" className="btn btn-danger" onClick={toggle}>
                    Add Class
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
              <span>Class Name</span>
            </DataTableRow>

            <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {loading && <Spinner size="sm" color="danger" />}
          {class_list?.data.map((item, idx) => (
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
export default ClassDataList;
