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
import Api from "../../http/api";
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

const Help = () => {

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reFetech, setReFetch] = useState(false);
  const [row, setRow] = useState("");
  const history = useHistory();
  const toggle = () => setModal(!modal);
  const [result, setResult] = useState('');
  const { errors, handleSubmit, register, reset, setValue } = useForm();

  const { data: helpdesk_list } = useQuery(['manageHelpDesk'], Api.manageHelpDesk);
  const manageMutation = useMutation(Api.manageHelpDesk)

  const { data: helpdesk_details } = useQuery(
    ['manageHelpDesk', row?.id, 'class'],
    Api.manageHelpDesk,
    {
      enabled: !!row,
    }
  )

  const onSubmitFilter = ({ class_name }) => {
    class_name ? setResult(class_name) : setResult('')
  };


  useEffect(() => {
    if (helpdesk_details) {
      let { name } = helpdesk_details?.data[0]
      setValue('name', name);
    }
  }, [helpdesk_details])

  const onSubmit = (data) => {

    const event = row ? `update` : `insert`
    const message = row ? `update` : `created`
    if (row) {
      data.id = row.id;
    }
    const payload = {
      ...data,
      event: event,
    };

    manageMutation.mutate(payload, {
      onSuccess: async (response) => {

        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        setReFetch(true);
        toast.success(`Helpdesk entry ${message} successfully`);
        history.push(`${process.env.PUBLIC_URL}/help`);
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
        toast.success(`Helpdesk entry delete successfully`);
        history.push(`${process.env.PUBLIC_URL}/help`);
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
        {/* <form onSubmit={handleSubmit(onSubmitFilter)}>
          <Row className="mt-4">
            <Col md="4">
              <FormGroup className="form-group">
                <div className="form-control-wrap">
                  <label className="form-label" htmlFor="name">
                    Name :
                  </label>
                  <select
                    ref={register}
                    {...register('name')}
                    name="name"
                    id="name"
                    placeholder="Name"
                    className="form-select form-select-lg form-control"
                  >
                    <option key="-1" value="">Helpdek Name</option>
                    {helpdesk_list?.data?.map((list, i) => <option key={i} value={list.id}>{list.name}</option>)}
                  </select>
                  {errors.name && <span className="error">{errors.name.message}</span>}
                </div>
              </FormGroup>
            </Col>
            <Col className="d-flex align-items-end" md="4">
              <Button color="primary" size="md" bgColor="#D32F2F" bRadius="none" width="30%">
                Search
              </Button>
            </Col>
          </Row>
        </form> */}
      </div>
      <br />
      <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered modal-lg">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {row ? `Update` : `Add`} Help Desk Entry
          </h5>
          <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={toggle}>
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <FormGroup>
                  <label className="form-control-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.name && <span className="error" style={{ color: 'red' }}>{errors.name.message}</span>}
                </FormGroup>

              </Col>
              <Col>
                <FormGroup>
                  <label className="form-control-label" htmlFor="name">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.email && <span className="error" style={{ color: 'red' }}>{errors.email.message}</span>}
                </FormGroup>

              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <label className="form-control-label" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control"
                    placeholder="Phone"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.phone && <span className="error" style={{ color: 'red' }}>{errors.phone.message}</span>}
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label className="form-control-label" htmlFor="reason">
                    Reason
                  </label>
                  <input
                    type="text"
                    id="reason"
                    name="reason"
                    className="form-control"
                    placeholder="Reason"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.reason && <span className="error" style={{ color: 'red' }}>{errors.reason.message}</span>}
                </FormGroup>

              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup style={{ 'marginTop': '38px', float: 'right' }}>
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
            <h6 className="title">HelpDesk Entry</h6>

          </div>
        </div>
        <BlockHead size="sm">
          <BlockBetween className="move-right">
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <a href="#" className="btn btn-danger" onClick={toggle}>
                    Add Entry
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
              <span>Helpdesk Entry Name</span>
            </DataTableRow>

            <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {loading && <Spinner size="sm" color="danger" />}
          {/* {helpdesk_list?.data?.filter((l) => !result || l.id === result).map((item, idx) => (
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
          ))} */}
        </div>
      </Card>
    </Content>
  );
};
export default Help;
