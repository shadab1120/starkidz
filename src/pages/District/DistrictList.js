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

const DistrictList = () => {

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reFetech, setReFetch] = useState(false);
  const [row, setRow] = useState("");
  const history = useHistory();
  const toggle = () => setModal(!modal);
  const { errors, handleSubmit, register, reset, setValue } = useForm();

  const { data: district_list } = useQuery(['getDistrictList'], Api.getDistrictList);
  const { data: state_list } = useQuery('getStateList', Api.getStateList);

  const manageMutation = useMutation(Api.manageDistrict)

  const { data: district_details } = useQuery(
    ['getDistrict', row?.id],
    Api.getDistrict,
    {
      enabled: !!row,
    }
  )
  useEffect(() => {
    if (district_details) {
      let { district_name, state_name } = district_details?.data[0]
      setValue('district_name', district_name);
      setValue('state_name', state_name);
    }
  }, [district_details, setValue])

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
        toast.success(`District ${message} successfully`);
        history.push(`${process.env.PUBLIC_URL}/district`);
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
        toast.success(`District delete successfully`);
        history.push(`${process.env.PUBLIC_URL}/district`);
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
            {row ? `Update` : `Add`} District
          </h5>
          <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={toggle}>
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={6}>

                <label className="form-label" htmlFor="state_name">
                  State Name :
                </label>
                <div className="form-control-wrap">
                  <select
                    ref={register}
                    {...register('state_name')}
                    name="state_name"
                    id="state_name"
                    className="form-select form-select-lg form-control"
                    style={{
                      width: "100%",
                      height: "38px",
                    }}
                  >
                    {state_list?.data?.map((list, i) => <option key={i} value={list.state_name}>{list.state_name}</option>)}
                  </select>
                  {errors.state_name && <span className="error" style={{ color: 'red' }}>{errors.state_name.message}</span>}

                </div>

              </Col>
              <Col md="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="district_name">
                    District Name
                  </label>
                  <input
                    type="text"
                    id="district_name"
                    name="district_name"
                    className="form-control"
                    placeholder="Section Name"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.district_name && <span className="error" style={{ color: 'red' }}>{errors.district_name.message}</span>}
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
            <h6 className="title">District List</h6>

          </div>
        </div>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <a href="#" className="btn btn-danger" onClick={toggle}>
                    Add District
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
              <span>District Name</span>
            </DataTableRow>

            <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {loading && <Spinner size="sm" color="danger" />}
          {district_list?.data.map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow size="md">
                <span className="tb-lead">{idx}</span>
              </DataTableRow>

              <DataTableRow size="md">
                <span className="tb-lead">{item.district_name}</span>
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
export default DistrictList;
