import React, { useEffect, useState } from "react";
import Content from "../../layout/content/Content";
import { Card } from "reactstrap";
import { recentOrderData } from "../../components/partials/default/recent-orders/OrderData";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col, FormGroup, Spinner, Modal, ModalBody } from "reactstrap";
import {
  Button, Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle
} from "../../components/Component";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useQuery, useMutation } from "react-query";
import Api from "../../http/api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function SchoolCenter() {
  const history = useHistory();
  const [row, setRow] = useState("");
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);
  const { errors, handleSubmit, register, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const { data: schoolCenter } = useQuery(['getSchoolCenter', row?.id], Api.getSchoolCenter);
  const { data, isLoading } = useQuery("getSchoolCenterList", Api.getSchoolCenterList);
  const manageMutation = useMutation(Api.manageSchoolCenter);


  const onSubmitFilter = ({ filter_params }) => {
    filter_params ? setResult(filter_params) : setResult('')
  };

  const handleDelete = (row) => {
    setLoading(true);
    const payload = {
      id: row?.id,
      event: 'delete'
    }

    manageMutation.mutate(payload, {
      onSuccess: async (response) => {
        setLoading(false);
        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        toast.success("School Center deleted successfully");
      }
    });
  }
  const handleEdit = (row) => {
    setRow(row);
    toggle();
  }

  const onSubmit = (data) => {
    const event = row?.id ? `update` : `insert`
    const message = row?.id ? `update` : `created`

    if (row?.id) {
      data.id = row?.id;
    }
    const payload = {
      ...data,
      event: event,
    };

    manageMutation.mutate(payload, {
      onSuccess: (response) => {
        setLoading(false);
        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        toast.success(`School Center ${message} successfully`);
        history.push(`${process.env.PUBLIC_URL}/school_center`);
        reset();
      },
    });
  };
  useEffect(() => {
    if (schoolCenter) {
      setValue('school_centre_code', schoolCenter?.data?.[0]?.school_centre_code)
      setValue('school_centre_name', schoolCenter?.data?.[0]?.school_centre_name)
      setValue('incharge_person_name', schoolCenter?.data?.[0]?.incharge_person_name)
      setValue('incharge_mobile_no', schoolCenter?.data?.[0]?.incharge_mobile_no)
      setValue('incharge_email', schoolCenter?.data?.[0]?.incharge_email)
      setValue('incharge_address', schoolCenter?.data?.[0]?.incharge_address)
      setValue('school_address', schoolCenter?.data?.[0]?.school_address)
    }
  }, [setValue, schoolCenter]);

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
                  <label className="form-label" htmlFor="filter_params">
                    School Center :
                  </label>
                  <select
                    ref={register}
                    {...register('filter_params')}
                    name="filter_params"
                    id="filter_params"
                    placeholder="School Center Name"
                    className="form-select form-select-lg form-control"
                  >
                    <option key="-1" value="">Select School Center Name </option>
                    {data?.data?.map((list, i) => <option key={i} value={list.school_centre_code}>{list.school_centre_name}- ({list.school_centre_code}-{list.school_address})</option>)}
                  </select>
                  {errors.filter_params && <span className="error">{errors.filter_params.message}</span>}
                </div>
              </FormGroup>
            </Col>

            <Col className="d-flex align-items-end" md="3">
              <Button color="primary" type="submit" size="md" bgColor="#D32F2F" bRadius="none">
                Search
              </Button>
            </Col>
          </Row>
        </form>
      </div>
      <br />

      <div>
        <BlockHead size="sm" >

          <BlockBetween className="move-right">
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <a href="#" className="btn btn-danger" onClick={(e) => { toggle(); setRow(""); }}>
                    Add School Center
                  </a>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
          <h6 className="title">School Center</h6>

        </BlockHead>

      </div>
      <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered modal-lg">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {row ? `Update` : `Add`} School Center
          </h5>
          <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={(e) => { toggle(); setRow(""); }}>
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mt-4">
              <Col>
                <FormGroup className="form-group">
                  <label className="form-label" htmlFor="school_centre_code">
                    School Centre Code :
                  </label>
                  <div className="form-control-wrap">
                    <input
                      id="school_centre_code"
                      name="school_centre_code"
                      type="text"
                      className="form-control"
                      ref={register({ required: "This field is required" })}
                    />
                    {errors.school_centre_code && <span className="invalid">{errors.school_centre_code.message}</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="form-group">
                  <label className="form-label" htmlFor="school_centre_name">
                    School Centre Name :
                  </label>
                  <div className="form-control-wrap">
                    <input
                      id="school_centre_name"
                      name="school_centre_name"
                      type="text"
                      className="form-control"
                      ref={register({ required: "This field is required" })}
                    />
                    {errors.school_centre_name && <span className="invalid">{errors.school_centre_name.message}</span>}
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <FormGroup className="form-group">
                  <label className="form-label" htmlFor="incharge_person_name">
                    Incharge Person Name :
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="incharge_person_name"
                      name="incharge_person_name"
                      className="form-control"
                      ref={register({ required: "This field is required" })}
                    />
                    {errors.incharge_person_name && <span className="invalid">{errors.incharge_person_name.message}</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="form-group">
                  <label className="form-label" htmlFor="incharge_mobile_no">
                    Incharge Mobile No :
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="number"
                      id="incharge_mobile_no"
                      name="incharge_mobile_no"
                      className="form-control"
                      ref={register({ required: "This field is required" })}
                    />
                    {errors.incharge_mobile_no && <span className="invalid">{errors.incharge_mobile_no.message}</span>}
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <FormGroup className="form-group">
                  <label className="form-label" htmlFor="incharge_email">
                    Incharge Email :
                  </label>
                  <div className="form-control-wrap">
                    <input
                      className=" form-control"
                      type="text"
                      name="incharge_email"
                      id="incharge_email"
                      ref={register({
                        required: "Required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.incharge_email && <span className="invalid">{errors.incharge_email.message}</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="form-group">
                  <label className="form-label" htmlFor="incharge_address">
                    Incharge Address :
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="incharge_address"
                      name="incharge_address"
                      className="form-control"
                      ref={register({ required: "This field is required" })}
                    />
                    {errors.incharge_address && <span className="invalid">{errors.incharge_address.message}</span>}
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <FormGroup className="form-group">
                  <label className="form-label" htmlFor="school_address">
                  School Address :
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="school_address"
                      name="school_address"
                      className="form-control"
                      ref={register({ required: "This field is required" })}
                    />
                    {errors.school_address && <span className="invalid">{errors.school_address.message}</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col className="col-sm d-flex align-items-end col-4 move-right">
                <Button color="primary" size="lg" bgColor="#D32F2F" bRadius="none" width="30%">
                  {row?.id ? `Update` : `Add`}
                </Button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
      <Card className="card-full mt-4">
        <div className="nk-tb-list">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#d32f2f",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    S.No.
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    School Centre Code
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    School Centre Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    Incharge Person Name
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    Incharge Mobile No
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    Incharge Email
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading && <Spinner size="sm" color="danger" />}
                {data?.data?.filter((l) => !result || l.school_centre_code === result).map((row, idx) => (
                  <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row" align="center">
                      {idx + 1}
                    </TableCell>
                    <TableCell align="center">{row.school_centre_code}</TableCell>
                    <TableCell align="center">{row.school_centre_name}</TableCell>
                    <TableCell align="center">{row.incharge_person_name}</TableCell>
                    <TableCell align="center">{row.incharge_mobile_no}</TableCell>
                    <TableCell align="center">{row.incharge_email}</TableCell>
                    <TableCell align="center">
                      <FiEdit color="green" onClick={(e) => handleEdit(row)} />
                      <FiTrash2 className="ml-2" color="#d32f2f" onClick={(e) => handleDelete(row)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Card>
    </Content >
  );
}
