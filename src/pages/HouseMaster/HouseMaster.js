import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import {
  Button,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  DataTableHead, DataTableRow, DataTableItem, UserAvatar
} from "../../components/Component";
import Api from "../../http/masterApis";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import "../style.css";
import toast from "react-hot-toast";

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

const HouseMasterList = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState("");
  const history = useHistory();
  const toggle = () => setModal(!modal);
  const [result, setResult] = useState('');


  const { errors, handleSubmit, register, reset, setValue } = useForm();

  const { data: house_list } = useQuery(['getClassSectionHouseStreamList', 'house'], Api.getClassSectionHouseStreamList);
  const manageMutation = useMutation(Api.manageClassSectionHouseStream)

  const { data: house_details } = useQuery(
    ['getClassSectionHouseStream', row?.id, 'house'],
    Api.getClassSectionHouseStream,
    {
      enabled: !!row,
    }
  )
  useEffect(() => {
    if (house_details) {
      let { name } = house_details?.data[0]
      setValue('name', name);
    }
  }, [house_details])
  const onSubmitFilter = ({ house_name }) => {
    house_name ? setResult(house_name) : setResult('')
  };
  const onSubmit = (data) => {

    const event = row ? `update` : `insert`
    const message = row ? `update` : `created`
    if (row) {
      data.id = row.id;
    }
    const payload = {
      ...data,
      event: event,
      module: `house`
    };

    manageMutation.mutate(payload, {
      onSuccess: async (response) => {

        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        toast.success(`House ${message} successfully`);
        toggle();
        history.push(`${process.env.PUBLIC_URL}/house_master`);
        reset();
      }
    });
  };
  const handleDelete = (row) => {
    setLoading(true);
    const { id } = row;
    const payload = {
      module: `house`,
      event: 'delete',
      id: id
    }

    manageMutation.mutate(payload, {
      onSuccess: async (response) => {
        setLoading(false);
        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        toast.success(`House delete successfully`);
        history.push(`${process.env.PUBLIC_URL}/house_master`);
      }
    });
  }
  const handleEdit = (row) => {
    setRow(row);
    toggle();
  }



  return (
    <Content>
      <div>
        <form onSubmit={handleSubmit(onSubmitFilter)}>
          <Row className="mt-4">
            <Col md="4">
              <FormGroup className="form-group">
                <div className="form-control-wrap">
                  <label className="form-label" htmlFor="house_name">
                    House Master :
                  </label>
                  <select
                    ref={register}
                    {...register('house_name')}
                    name="house_name"
                    id="house_name"
                    placeholder="House Name"
                    className="form-select form-select-lg form-control"
                  >
                    <option key="-1" value="">House Master</option>
                    {house_list?.data?.map((list, i) => <option key={i} value={list.id}>{list.name}</option>)}
                  </select>
                  {errors.house_name && <span className="error">{errors.house_name.message}</span>}
                </div>
              </FormGroup>
            </Col>
            <Col className="d-flex align-items-end" md="4">
              <Button color="primary" size="md" bgColor="#D32F2F" bRadius="none" width="30%">
                Search
              </Button>
            </Col>
          </Row>
        </form>
      </div>
      <br />
      <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered modal-lg">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {row ? `Update` : `Add`} House
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
                    House Name
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
            <h6 className="title">HouseMaster List</h6>

          </div>
        </div>
        <BlockHead size="sm">
          <BlockBetween className="move-right">
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <a href="#" className="btn btn-danger" onClick={toggle}>
                    Add HouseMaster
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
              <span>House Name</span>
            </DataTableRow>

            <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {loading && <Spinner size="sm" color="danger" />}
          {
            house_list?.data.filter((l) => !result || l.id === result).map((item, idx) => (
              <DataTableItem key={idx}>
                <DataTableRow size="md">
                  <span className="tb-lead">{idx+1}</span>
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
export default HouseMasterList;
