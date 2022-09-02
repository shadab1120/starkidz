import { Row, Col, FormGroup, Button, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setContestDetails } from "../../store/CreateContestSlice";

const Judging = ({ handleStepChange }) => {
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
          <strong>Judging :</strong>
        </h3>
      </Row>
      <Form className="w-100" onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-4">
          <Col xxl="6" md="6" sm="12">
            <FormGroup>
              <label className="form-label" htmlFor="judging_parameter">
                Select Judging Parameters
              </label>
              <select
                className="form-select form-select-lg form-control"
                name="judging_parameter"
                id="judging_parameter"
                ref={register({ required: "This field is required" })}
              >
                <option value="1"></option>
                <option value="2">Two</option>
              </select>
              {errors.judging_parameter && <span className="text-danger">This field is required</span>}
            </FormGroup>
          </Col>
          <Col xxl="6" md="6" sm="12">
            <FormGroup>
              <label className="form-label" htmlFor="qa_form">
                Select Quality Analyst Form
              </label>
              <select
                className="form-select form-select-lg form-control"
                name="qa_form"
                id="qa_form"
                ref={register({ required: "This field is required" })}
              >
                <option value="1"></option>
                <option value="2">Two</option>
              </select>
              {errors.qa_form && <span className="text-danger">This field is required</span>}
            </FormGroup>
          </Col>
          <Col xxl="6" md="6" sm="12">
            <label className="form-label" htmlFor="qa">
              Choose Quality Analyst
            </label>
            <select
              className="form-select form-select-lg form-control"
              name="qa"
              id="qa"
              ref={register({ required: "This field is required" })}
            >
              <option value="1"></option>
              <option value="2">Two</option>
            </select>
            {errors.qa && <span className="text-danger">This field is required</span>}
          </Col>
          <Col xxl="6" md="6" sm="12">
            <label className="form-label" htmlFor="level_judging">
              Level Judging
            </label>
            <select
              className="form-select form-select-lg form-control"
              name="level_judging"
              id="level_judging"
              ref={register({ required: "This field is required" })}
            >
              <option value="1"></option>
              <option value="2">Two</option>
            </select>
            {errors.level_judging && <span className="text-danger">This field is required</span>}
          </Col>
         
          <Col xxl="6" md="6" sm="12">
           <FormGroup className="w-100">
                <label className="form-label" htmlFor="percentage_jugdge_level">
                Percentage of entries judged at level
                </label>
                <textarea className="form-control" rows="3" name="percentage_jugdge_level" id="percentage_jugdge_level"></textarea>
                {errors.percentage_jugdge_level && <span className="error">{errors.percentage_jugdge_level.message}</span>}
              </FormGroup>
          </Col> 
          <Col xxl="6" md="6" sm="12">
            <label className="form-label">Select a Judge From</label>
            <select className="form-select form-select-lg form-control">
              <option value="1"></option>
              <option value="2">Two</option>
            </select>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xxl="12" md="12" sm="12">
            <div className="d-flex justify-content-between">
              <Button className="btn-primary" type="submit">
                Next
              </Button>
              <Button className="btn-primary" onClick={() => handleStepChange("prev")}>
                Back
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Judging;
