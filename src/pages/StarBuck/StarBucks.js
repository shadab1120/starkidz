import React, { useEffect } from "react";
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

export default function StarBucks() {
  const { data } = useQuery("starBucks", Api.getStarBucks);
  const mutation = useMutation(Api.manageStarBucks);
  const [starBucks, setStarBucks] = React.useState([]);
  const { errors, register, handleSubmit, reset } = useForm({
    reValidateMode: "onChange",
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      const { data: bucks } = data;
      const mainBucks = Object.values(bucks);
      if (mainBucks.length > 0) {
        setStarBucks(mainBucks);
      }
    }
  }, [data]);

  const onFormSubmit = (formData) => {
    ["bucksFrom", "bucksTo", "bucksRate", "bucksCode"].forEach((key) => {
      if (formData[key] === "") {
        return toast.error(`${key} is required`);
      }
    });
    mutation.mutate(
      {
        starbucks_from: formData.bucksFrom,
        starbucks_to: formData.bucksTo,
        starbucks_rate: formData.bucksRate,
        starbucks_code: formData.bucksCode,
      },
      {
        onSuccess: () => {
          toast.success("StarBucks added successfully");
          reset();
          queryClient.invalidateQueries("starBucks");
        },
      }
    );
  };

  return (
    <Content>
      <div>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Row className="mt-4">
            <Col>
              <FormGroup className="form-group">
                <label className="form-label" htmlFor="bucksFrom">
                  Star Bucks From :
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="bucksFrom"
                    name="bucksFrom"
                    className="form-control"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.bucksFrom && <span className="invalid">{errors.bucksFrom.message}</span>}
                </div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="form-group">
                <label className="form-label" htmlFor="bucksTo">
                  Star Bucks To :
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="bucksTo"
                    name="bucksTo"
                    className="form-control"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.bucksTo && <span className="invalid">{errors.bucksTo.message}</span>}
                </div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="form-group">
                <label className="form-label" htmlFor="bucksRate">
                  Star Bucks Rates :
                </label>
                <div className="form-control-wrap">
                  <input
                    type="number"
                    id="bucksRate"
                    name="bucksRate"
                    className="form-control"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.bucksRate && <span className="invalid">{errors.bucksRate.message}</span>}
                </div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="form-group">
                <label className="form-label" htmlFor="bucksCode">
                  Star Bucks Code :
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="bucksCode"
                    name="bucksCode"
                    className="form-control"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.bucksCode && <span className="invalid">{errors.bucksCode.message}</span>}
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
                {starBucks.map((row, idx) => (
                  <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row" align="center">
                      {idx + 1}
                    </TableCell>
                    <TableCell align="center">{row.starbucks_from}</TableCell>
                    <TableCell align="center">{row.starbucks_to}</TableCell>
                    <TableCell align="center">{row.starbucks_rate}</TableCell>
                    <TableCell align="center">{row.starbucks_code}</TableCell>
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
