import { Row, Col, FormGroup, Button, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { setContestDetails } from "../../store/CreateContestSlice";

const DurationLocation = ({ handleStepChange }) => {
  const { errors, handleSubmit, register } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const payload = {
      ...data,
    };

    dispatch(setContestDetails(payload));
    handleStepChange("next");
  };
  return (
    <>
      <Row>
        <h3>
          <strong>Duration & Location :</strong>
        </h3>
      </Row>
      <Row className="mt-4">
        <Form className="w-100" onSubmit={handleSubmit(onSubmit)}>
          <Col xxl="6" md="6" sm="12">
            <FormGroup>
              <label className="form-label" htmlFor="contest_start_end_date">
                Select Contest Start & End Date
              </label>
              <input
                className="form-control datepicker"
                type="date"
                name="contest_start_end_date"
                id="contest_start_end_date"
                ref={register({ required: "This field is required" })}
              />

              {errors.contest_start_end_date && <span className="text-danger">This field is required</span>}
            </FormGroup>
          </Col>
          <Col xxl="6" md="6" sm="12">
            <FormGroup>
              <label className="form-label" htmlFor="result_date">
                Result Date:
              </label>
              <input
                className="form-control datepicker"
                type="date"
                id="result_date"
                name="result_date"
                ref={register({ required: "This field is required" })}
              />
              {errors.result_date && <span className="error">{errors.result_date.message}</span>}
            </FormGroup>
          </Col>

          <Col xxl="6" md="6" sm="12">
            <FormGroup>
              <label className="form-label" htmlFor="contest_manager">
                Contest Manager
              </label>
              <select
                className="form-select form-select-lg form-control"
                id="contest_manager"
                name="contest_manager"
                ref={register({ required: "This field is required" })}
              >
                <option value="1"></option>
                <option value="2">Two</option>
              </select>
              {errors.contest_manager && <span className="error">{errors.contest_manager.message}</span>}
            </FormGroup>
          </Col>
          <Col xxl="6" md="6" sm="12">
            <FormGroup>
              <label className="form-label" htmlFor="state">
                Select State
              </label>
              <select
                className="form-select form-select-lg form-control"
                id="state"
                name="state"
                ref={register({ required: "This field is required" })}
              >
                <option>Select State</option>
                <option value="1"></option>
                <option value="2">Two</option>
              </select>

              {errors.state && <span className="error">{errors.state.message}</span>}
            </FormGroup>
          </Col>
          <Col xxl="6" md="6" sm="12">
            <label className="form-label" htmlFor="district">
              Select District
            </label>
            <select
              className="form-select form-select-lg form-control"
              id="district"
              name="district"
              ref={register({ required: "This field is required" })}
            >
              <option value="1"></option>
              <option value="2">Two</option>
            </select>
            {errors.district && <span className="error">{errors.district.message}</span>}
          </Col>
          <Row className="mt-4">
            <Col xxl="12" md="12" sm="12">
              <div className="d-flex justify-content-between">
                <Button className="btn-primary" type="submit">
                  Next
                </Button>
                <Button className="btn-primary" type="submit" onClick={() => handleStepChange("prev")}>
                  Back
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Row>
    </>
  );
};

export default DurationLocation;
