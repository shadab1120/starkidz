import React from "react";
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
import { Row, Col, FormGroup } from "reactstrap";
import { Button } from "../../components/Component";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Api from "../../http/api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function Judging() {
  const { data } = useQuery("judging", Api.getJudgingParameters);
  const mutation = useMutation(Api.manageJudgingParameters);
  const [judging, setJudging] = React.useState([]);
  const queryClient = useQueryClient();
  const { errors, register, handleSubmit, reset } = useForm({
    reValidateMode: "onChange",
  });

  React.useEffect(() => {
    if (data) {
      const { data: params } = data;
      const mainParams = Object.values(params);
      if (mainParams.length > 0) {
        setJudging(mainParams);
      }
    }
  }, [data]);

  const onFormSubmit = (formData) => {
    ["jpName", "jpWeight", "jpDescription", "contestType"].forEach((key) => {
      if (formData[key] === "") {
        return toast.error(`${key} is required`);
      }
    });
    mutation.mutate(
      {
        judging_para_name: formData.jpName,
        contest_type: formData.contestType,
        parameter_weight: formData.jpWeight,
        parameter_desc: formData.jpDescription,
      },
      {
        onSuccess: () => {
          toast.success("Judging added successfully");
          reset();
          queryClient.invalidateQueries("judging");
        },
      }
    );
  };

  return (
    <Content>
      <div>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Row className="mt-4">
            <Col lg="5">
              <Row>
                <Col lg="12">
                  <FormGroup className="form-group">
                    <label className="form-label" htmlFor="jpName">
                      Judging Parameter Name
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="jpName"
                        name="jpName"
                        className="form-control"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.jpName && <span className="invalid">{errors.jpName.message}</span>}
                    </div>
                  </FormGroup>
                </Col>
                <Col lg="12">
                  <FormGroup className="form-group mt-2">
                    <label className="form-label" htmlFor="contestType">
                      Contest Type
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="contestType"
                        name="contestType"
                        className="form-control"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.contestType && <span className="invalid">{errors.contestType.message}</span>}
                    </div>
                  </FormGroup>
                </Col>
                <Col lg="12">
                  <FormGroup className="form-group mt-2">
                    <label className="form-label" htmlFor="jpWeight">
                      Judging Parameter Weight
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="jpWeight"
                        name="jpWeight"
                        className="form-control"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.jpWeight && <span className="invalid">{errors.jpWeight.message}</span>}
                    </div>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col lg="5">
              <Row>
                <Col lg="12">
                  <FormGroup className="form-group">
                    <label className="form-label" htmlFor="jpDescription">
                      Judging Parameter Description
                    </label>
                    <div className="form-control-wrap">
                      <textarea
                        type="text"
                        className="form-control"
                        id="jpDescription"
                        name="jpDescription"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.jpDescription && <span className="invalid">{errors.jpDescription.message}</span>}
                    </div>
                  </FormGroup>
                </Col>
                <Col lg="6" className="mt-4">
                  <Button color="primary" size="lg" bgColor="#D32F2F" bRadius="none" width="100%">
                    Add Judging Parameter
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col lg="2"></Col>
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
                    Parameter
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    Contest Type
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    Weight
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    Description
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
                {judging.map((row, idx) => (
                  <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row" align="center">
                      {idx + 1}
                    </TableCell>
                    <TableCell align="center">{row.judging_para_name}</TableCell>
                    <TableCell align="center">{row.contest_type}</TableCell>
                    <TableCell align="center">{row.parameter_weight}</TableCell>
                    <TableCell align="center">{row.parameter_desc}</TableCell>
                    <TableCell align="center">
                      <FiEdit color="green" />
                      <FiTrash2 className="ml-2" color="#d32f2f" />
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
