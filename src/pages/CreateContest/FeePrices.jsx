import { Row, Col, FormGroup, Form } from "reactstrap";
import { Button } from "../../components/Component";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import Api from "../../http/ContestApi";
import toast, { Toaster } from "react-hot-toast";

const FeePrices = () => {
  const { errors, handleSubmit, register, reset } = useForm();
  const contestDeatils = useSelector((state) => state.contest);
  const mutation = useMutation(Api.createContest);
  const histor = useHistory();
  const onSubmit = (data) => {
    const payload = {
      ...contestDeatils,
      ...data,
    };
    mutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Contest created successfully");
        histor.push("/monitor-contest");
        reset();
      },
    });
  };

  return (
    <>
      <Row>
        <h3>
          <strong>Contest Fee & Prices :</strong>
        </h3>
      </Row>
      <Form className="w-100" onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-4">
          <Col xxl="6" md="6" sm="12">
            <FormGroup>
              <label className="form-label" htmlFor="contest_fee">
                Contest Fee
              </label>
              <select
                className="form-select form-select-lg form-control"
                name="contest_fee"
                id="contest_fee"
                ref={register({ required: "This field is required" })}
              >
                <option value="1"></option>
                <option value="2">Two</option>
              </select>
              {errors.contest_fee && <span className="text-danger">This field is required</span>}
            </FormGroup>
          </Col>
          <Col xxl="6" md="6" sm="12">
            <FormGroup>
              <label className="form-label">Select </label>
              <select
                className="form-select form-select-lg form-control"
                name="prize"
                id="prize"
                ref={register({ required: "This field is required" })}
              >
                <option value="1"></option>
                <option value="2">Two</option>
              </select>
              {errors.prize && <span className="text-danger">This field is required</span>}
            </FormGroup>
          </Col>
          <Col xxl="12" md="12" sm="12">
            <FormGroup>
              <label className="form-label ">Terms & Condition</label>
              <textarea
                rows="4"
                className="form-control "
                ref={register({ required: "This field is required" })}
                name="terms_conditions"
                id="terms_conditions"
              ></textarea>
            </FormGroup>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xxl="12" md="12" sm="12">
            <div
              className="d-flex"
              style={{
                gap: "10px",
              }}
            >
              <Button className="btn-primary" type="submit" bgColor="#D32F2F">
                Create Contest
              </Button>
              <Button className="btn-primary" type="submit">
                Draft
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
      <Toaster position="top-right" />
      {/* save and draft button */}
    </>
  );
};

export default FeePrices;
