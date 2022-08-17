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
        <form>
          <Row className="mt-4">
            <Col>
              <FormGroup className="form-group">
                <label className="form-label" htmlFor="Name">
                  Name :
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="Name"
                    name="Name"
                    className="form-control"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.Name && <span className="invalid">{errors.Name.message}</span>}
                </div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="form-group">
                <label className="form-label" htmlFor="Email">
                  Email :
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="Email"
                    name="Email"
                    className="form-control"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.Email && <span className="invalid">{errors.Email.message}</span>}
                </div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="form-group">
                <label className="form-label" htmlFor="phone">
                  Phone :
                </label>
                <div className="form-control-wrap">
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    className="form-control"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.phone && <span className="invalid">{errors.phone.message}</span>}
                </div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="form-group">
                <label className="form-label" htmlFor="reason">
					Reason :
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="reason"
                    name="reason"
                    className="form-control"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.reason && <span className="invalid">{errors.reason.message}</span>}
                </div>
              </FormGroup>
            </Col>
            <Col className="d-flex align-items-end">
              <Button color="primary" size="lg" bgColor="#D32F2F" bRadius="none" width="34%">
                Submit
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    
    </Content>
  );
}
