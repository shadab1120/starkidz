import { useState } from "react";
import { Row, Col, FormGroup, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setContestDetails } from "../../store/CreateContestSlice";
const ContestDetails = ({ handleStepChange }) => {
  const [newContest, setNewContest] = useState(true);
  const { errors, handleSubmit, register } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const payload = {
      contest_type: newContest ? "New_Contest" : "existing",
      ...data,
    };

    // image to base64
    const reader = new FileReader();
    reader.readAsDataURL(data.contest_image?.[0]);
    reader.onloadend = () => {
      payload.contest_image = reader.result;
      dispatch(setContestDetails(payload));
      handleStepChange("next");
    };
  };

  return (
    <>
      <Row>
        <h3>
          <strong>Contest Details :</strong>
        </h3>
      </Row>
      <Row className="mt-4">
        <Col xxl="12" md="12" sm="12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="g-4">
              <div className="form-group">
                <div className="form-group col-md-12 p-0">
                  <label className="form-label">Contest Type:</label>
                  <div className="form-group d-flex">
                    <p className="radio-inline"></p>
                    <label className="radio-inline d-flex justify-content-center">
                      <input
                        className="radioButtonBig"
                        type="radio"
                        name="rbg6"
                        value="yes"
                        onChange={() => setNewContest(true)}
                      />
                      New Contest
                    </label>
                    <p className="radio-inline"></p>
                    <label className="radio-inline pl-2 d-flex justify-content-center">
                      <input
                        className="radioButtonBig"
                        type="radio"
                        name="rbg6"
                        value="no"
                        onChange={() => setNewContest(false)}
                      />
                      Copy From Existing
                    </label>
                  </div>
                </div>
              </div>
            </Row>
            <Row style={{ display: newContest ? "none" : "block" }}>
              <div className="form-row w-100">
                <div className="form-group col-md-12">
                  <select
                    className="form-select form-select-lg form-control"
                    style={{
                      maxWidth: "756px",
                      width: "100%",
                      height: "52px",
                    }}
                  >
                    <option value="1">Copy From Existing</option>
                    <option value="2">Two</option>
                  </select>
                </div>
              </div>
            </Row>
            <Row>
              <div className="form-row w-100">
                 <div className="form-group col-md-6 name-cls">
                  <label className="form-label" htmlFor="contest_image">
                    Contest Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="contest_image"
                    ref={register({ required: "This field is required" })}
                    name="contest_image"
                  />
                  {errors.contest_image && <span className="error">{errors.contest_image.message}</span>}
                </div>
                <div className="form-group col-md-6 name-cls">
                <label className="form-label" htmlFor="age_bracket">
                  Age Bracket
                </label>
                <input
                  name="age_bracket"
                  id="age_bracket"
                  className="form-control"
                  placeholder="Age Bracket"
                  ref={register({ required: "This field is required" })}
                />
                {errors.age_bracket && <span className="error">{errors.age_bracket.message}</span>}
              </div>
              </div>
              
            </Row>
            <Row>
              
              <div className="form-group col-md-6 name-cls">
                <label className="form-label" htmlFor="contest_type_2">
                  Contest Type
                </label>
                <select
                  className="form-select form-select form-control"
                  name="contest_type_2"
                  id="contest_type_2"
                  ref={register({ required: "This field is required" })}
                >
                  <option value="1">Copy From Existing</option>
                  <option value="2">Two</option>
                </select>
                {errors.contest_type_2 && <span className="error">{errors.contest_type_2.message}</span>}
              </div>
              <div className="form-group col-md-6 name-cls">
                <label className="form-label" htmlFor="contest_theme">
                Contest Theme
                </label>
                <input
                  name="contest_theme"
                  id="contest_theme"
                  className="form-control"
                  placeholder="Contest Theme"
                  ref={register({ required: "This field is required" })}
                />
                {errors.contest_theme && <span className="error">{errors.contest_theme.message}</span>}
              </div>
            </Row>
            <Row>
              <FormGroup className="w-100">
                <label className="form-label" htmlFor="contestDescription">
                About Contest
                </label>
                <textarea className="form-control" rows="3" name="description" id="contestDescription"></textarea>
                {errors.description && <span className="error">{errors.description.message}</span>}
              </FormGroup>
            </Row>
            <Row className="mt-4">
              <Col xxl="12" md="12" sm="12">
                <div
                  className="d-flex justify-content-start"
                  style={{
                    gap: "10px",
                  }}
                >
                  <Button className="btn-primary" type="submit">
                    Next
                  </Button>
                  <Button className="btn-primary" type="submit" onClick={() => handleStepChange("prev")}>
                    Back
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </>
  );
};

export default ContestDetails;
