import React, { useEffect } from "react"
import { Row, Col, FormGroup, Button, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setContestDetails } from "../../store/CreateContestSlice";
import mApi from "../../http/masterApis"
import { useQuery } from "react-query";
import Api from "../../http/ContestApi";

const Judging = ({ handleStepChange }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { id } = params;
  const { errors, handleSubmit, register, setValue } = useForm();
  const { data: contest_data } = useQuery(['getContest', id], Api.getContest);

  const { data: judge_params } = useQuery('getJudgingParametersList', mApi.getJudgingParametersList);
  const { data: role_list } = useQuery('getRole', mApi.getRole);

  useEffect(() => {
    if (contest_data) {
      const contestDetails = contest_data[0] || []
      const { judging_parameter, qa_form, qa, level_judging, percentage_jugdge_level, select_judge_form } = contestDetails
      setValue('judging_parameter', judging_parameter || -1);
      setValue('qa_form', qa_form);
      setValue('qa', qa);
      setValue('level_judging', level_judging);
      setValue('percentage_jugdge_level', percentage_jugdge_level);
      setValue('select_judge_form', select_judge_form);
    }
  }, [contest_data])

  const onSubmit = (data) => {
    const payload = {
      ...data,
    };

    dispatch(setContestDetails(payload));
    handleStepChange("next");
  };
console.log('role_list',role_list)
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
                <option key="-1" value="-1">Select Judging Parameters </option>
                {judge_params?.data?.map((list, i) => <option key={i} value={list.id}>{list.judging_para_name}</option>)}
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
                multiple={true}
                ref={register({ required: "This field is required" })}
              >
                {role_list?.data?.map((list, i) => <option key={i} value={list.id}>{list.name}</option>)}
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
              multiple={true}
              ref={register({ required: "This field is required" })}
            >
              {[
                { id: '0', name: 'One' },
                { id: '1', name: 'Two' },
                { id: '2', name: 'Three' }
              ].map((list, i) => <option key={i} value={list.id}>{list.name}</option>)}
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
              {[
                { id: '0', name: 'One' },
                { id: '1', name: 'Two' },
                { id: '2', name: 'Three' }
              ].map((list, i) => <option key={i} value={list.id}>{list.name}</option>)}
            </select>
            {errors.level_judging && <span className="text-danger">This field is required</span>}
          </Col>

          <Col xxl="6" md="6" sm="12">
            <FormGroup className="w-100">
              <label className="form-label" htmlFor="percentage_jugdge_level">
                Percentage of entries judged at level
              </label>
              <textarea className="form-control" rows="3" name="percentage_jugdge_level" id="percentage_jugdge_level"></textarea>
            </FormGroup>
          </Col>
          <Col xxl="6" md="6" sm="12">
            <label className="form-label">Select a Judge From</label>
            <select
              className="form-select form-select-lg form-control"
              name="select_judge_form"
              id="select_judge_form"
              multiple={true}
            >
              {[
                { id: '0', name: 'One' },
                { id: '1', name: 'Two' },
                { id: '2', name: 'Three' }
              ].map((list, i) => <option key={i} value={list.id}>{list.name}</option>)}
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
