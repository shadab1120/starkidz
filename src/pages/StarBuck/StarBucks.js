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
import { Row, Col, FormGroup, Spinner } from "reactstrap";
import { Button } from "../../components/Component";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useQuery, useMutation } from "react-query";
import Api from "../../http/api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function StarBucks() {
  const history = useHistory();
  const params = useParams();
  const { id } = params;
  const { errors, handleSubmit, register, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  const { data: starBucks } = useQuery(['getStarBucks', id], Api.getStarBucks);
  const { data, isLoading } = useQuery("getStarBucksList", Api.getStarBucksList);
  const manageMutation = useMutation(Api.manageStarBucks);

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
        toast.success("Starbucks deleted successfully");
      }
    });
  }
  const handleEdit = (row) => {
    const { id } = row;
    history.push(`${process.env.PUBLIC_URL}/starbucks/${id}`);
  }

  const onSubmit = (data) => {
    const event = id ? `update` : `insert`
    const message = id ? `update` : `created`

    if (id) {
      data.id = id;
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
    if (starBucks && id) {
      setValue('starbucks_from', starBucks?.data[0]?.starbucks_from)
      setValue('starbucks_to', starBucks?.data[0]?.starbucks_to)
      setValue('starbucks_rate', starBucks?.data[0]?.starbucks_rate)
      setValue('starbucks_code', starBucks?.data[0]?.starbucks_code)
    }
  }, [setValue, starBucks, id]);

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
            <Col className="d-flex align-items-end">
              <Button color="primary" size="lg" bgColor="#D32F2F" bRadius="none" width="100%">
                Submit
              </Button>
            </Col>
          </Row>
        </form>
      </div>
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
                {data?.data?.map((row, idx) => (
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
    </Content>
  );
}
