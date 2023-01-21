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

export default function StarBucks() {
  const history = useHistory();
  const [row, setRow] = useState("");
  const params = useParams();
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);
  const { errors, handleSubmit, register, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const { data: starBucks } = useQuery(['getStarBucks', row?.id], Api.getStarBucks);
  const { data, isLoading } = useQuery("getStarBucksList", Api.getStarBucksList);
  const manageMutation = useMutation(Api.manageStarBucks);


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
        toast.success("Starbucks deleted successfully");
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
        toast.success(`Starbucks ${message} successfully`);
        history.push(`${process.env.PUBLIC_URL}/starbucks`);
        reset();
      },
    });
  };
  useEffect(() => {
    if (starBucks) {
      setValue('starbucks_from', starBucks?.data?.[0]?.starbucks_from)
      setValue('starbucks_to', starBucks?.data?.[0]?.starbucks_to)
      setValue('starbucks_rate', starBucks?.data?.[0]?.starbucks_rate)
      setValue('starbucks_code', starBucks?.data?.[0]?.starbucks_code)
    }
  }, [setValue, starBucks]);

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
                  <label className="form-label" htmlFor="contest_type_name">
                    Starbuck Price :
                  </label>
                  <select
                    ref={register}
                    {...register('filter_params')}
                    name="filter_params"
                    id="filter_params"
                    placeholder="Starbuck Rate"
                    className="form-select form-select-lg form-control"
                  >
                    <option key="-1" value="">Select Starbuck Rate </option>
                    {data?.data?.map((list, i) => <option key={i} value={list.starbucks_rate}>{list.starbucks_rate}</option>)}
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
                    Add Starbuck
                  </a>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
          <h6 className="title">Star Buck</h6>

        </BlockHead>

      </div>
      <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered modal-lg">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {row ? `Update` : `Add`} Starbuck
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
                  <label className="form-label" htmlFor="starbucks_from">
                    Star Bucks From :
                  </label>
                  <div className="form-control-wrap">
                    <input
                      id="starbucks_from"
                      name="starbucks_from"
                      type="date"
                      className="form-control"
                      ref={register({ required: "This field is required" })}
                    />
                    {errors.starbucks_from && <span className="invalid">{errors.starbucks_from.message}</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="form-group">
                  <label className="form-label" htmlFor="starbucks_to">
                    Star Bucks To :
                  </label>
                  <div className="form-control-wrap">
                    <input
                      id="starbucks_to"
                      name="starbucks_to"
                      type="date"
                      className="form-control"
                      ref={register({ required: "This field is required" })}
                    />
                    {errors.starbucks_to && <span className="invalid">{errors.starbucks_to.message}</span>}
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <FormGroup className="form-group">
                  <label className="form-label" htmlFor="starbucks_rate">
                    Star Bucks Rates :
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="number"
                      id="starbucks_rate"
                      name="starbucks_rate"
                      className="form-control"
                      ref={register({ required: "This field is required" })}
                    />
                    {errors.starbucks_rate && <span className="invalid">{errors.starbucks_rate.message}</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="form-group">
                  <label className="form-label" htmlFor="starbucks_code">
                    Star Bucks Code :
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="starbucks_code"
                      name="starbucks_code"
                      className="form-control"
                      ref={register({ required: "This field is required" })}
                    />
                    {errors.starbucks_code && <span className="invalid">{errors.starbucks_code.message}</span>}
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-4 w-20">
              <Col className="col-sm d-flex align-items-end col-4 move-right">
                <Button color="primary" size="lg" bgColor="#D32F2F" bRadius="none" width="100%">
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
                    StarBucks From
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    StarBucks To
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    Rate
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    StarBucks Code
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
                {data?.data?.filter((l) => !result || l.starbucks_rate === result).map((row, idx) => (
                  <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row" align="center">
                      {idx + 1}
                    </TableCell>
                    <TableCell align="center">{row.starbucks_from}</TableCell>
                    <TableCell align="center">{row.starbucks_to}</TableCell>
                    <TableCell align="center">{row.starbucks_rate}</TableCell>
                    <TableCell align="center">{row.starbucks_code}</TableCell>
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
