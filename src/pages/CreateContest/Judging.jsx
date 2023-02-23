import React, { useEffect, useState } from "react"
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
  const [roleList, setRoleList] = useState([])
  const { errors, handleSubmit, register, setValue } = useForm();
  const { data: contest_data } = useQuery(['getContest', id], Api.getContest);
  const { data: user_list } = useQuery('getUsers', mApi.getUsers);

  const { data: judge_params } = useQuery('getJudgingParametersList', mApi.getJudgingParametersList);
  const { data: role_list } = useQuery('getRole', mApi.getRole);
  const { data: selected_role } = useQuery(['getRoleByName', id], mApi.getRoleByName);
  const { data: multi_selected_role } = useQuery(['getMultiSelectUsers', roleList?.join()], mApi.getMultiSelectUsers);
  const [judgeLevel, setJudgingLevel] = useState();
  console.log(judgeLevel)
  useEffect(() => {
    if (contest_data && id) {
      const contestDetails = contest_data[0] || []
      const { judging_parameter, qa_form, qa, level_judging, percentage_jugdge_level, select_judge_form } = contestDetails
      setValue('judging_parameter', judging_parameter || -1);
      setValue('qa_form', qa_form);
      setValue('qa', qa);
      setValue('level_judging', level_judging);
      setValue('percentage_jugdge_level', percentage_jugdge_level);
      setValue('select_judge_form', select_judge_form);
    }
  }, [id])

  const onSubmit = (data) => {
    const payload = {
      ...data,
    };

    dispatch(setContestDetails(payload));
    handleStepChange("next");
  };

  const onChangeMultiSelect = (evt) => {
    setRoleList([...evt.target.selectedOptions].map(o => o.value));
  }


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
                style={{ height: '100px' }}
                className="form-select form-select-lg form-control"
                name="qa_form"
                id="qa_form"
                multiple={true}
                onChange={onChangeMultiSelect}
                ref={register({ required: "This field is required" })}
              >
                {role_list?.data?.map((list, i) => <option key={i} value={list.role}>{list.role_name}</option>)}
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
              {multi_selected_role?.data?.map((item, idx) => <option key={idx} value={item.id}>{item.name}</option>)}
            </select>
            {errors.qa && <span className="text-danger">This field is required</span>}
          </Col>

          {/* <Col xxl="6" md="6" sm="12">
            <FormGroup className="w-100">
              <label className="form-label" htmlFor="percentage_jugdge_level">
                Percentage of entries judged at level
              </label>
              <textarea className="form-control" rows="3" name="percentage_jugdge_level" id="percentage_jugdge_level"></textarea>
            </FormGroup>
          </Col> */}
          <Col xxl="6" md="6" sm="12">
            <label className="form-label">Select a Judge From</label>
            <select
              className="form-select form-select-lg form-control"
              name="select_judge_form"
              id="select_judge_form"
              multiple={true}
            >
              <option key="-1" value="">Judge From</option>
              {user_list?.data?.map((item, idx) => <option key={idx} value={item.id}>{item.name}</option>)}
            </select>
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
              onChange={(ev) => setJudgingLevel(ev.target.value)}
            >
              <option key="-1" value="">State Judge</option>
              {Array.from({ length: 3 }, (_, i) => i + 1).map((list, i) => <option key={i} value={list}>{list}</option>)}
            </select>
            {errors.level_judging && <span className="text-danger">This field is required</span>}
          </Col>

        </Row>

        {Array.from({ length: judgeLevel }, (_, i) => i + 1).map((list, i) => {
          return <Row className="mt-4" key={i}>
            <Col xxl="3" md="3" sm="12">
              <FormGroup>
                <label className="form-label" htmlFor="judging_parameter">
                  Judges Level - {i}
                </label>
                <input
                  className="form-select form-select-lg form-control"
                  name={`judging_parameter_level_${i}`}
                  id={`judging_parameter_level_${i}`}
                  ref={register({ required: "This field is required" })}
                />
                {errors.judging_parameter && <span className="text-danger">This field is required</span>}
              </FormGroup>
            </Col>
            <Col xxl="6" md="6" sm="12">
              <FormGroup>
                <label className="form-label" htmlFor="judging_parameter">
                  Percentage of entries judged at level - {i}
                </label>
                <input
                  className="form-select form-select-lg form-control"
                  name={`judging_parameter_percentage_level_${i}`}
                  id={`judging_parameter_percentage_level_${i}`}
                  ref={register({ required: "This field is required" })}
                />
                {errors.judging_parameter && <span className="text-danger">This field is required</span>}
              </FormGroup>
            </Col>

            <Col xxl="3" md="3" sm="12">
              <FormGroup>
                <label className="form-label" htmlFor="judging_parameter">
                  Judging TAT [in days]-{i}
                </label>
                <input
                  className="form-select form-select-lg form-control"
                  name={`judging_tat_${i}`}
                  id={`judging_tat_${i}`}
                  ref={register({ required: "This field is required" })}
                />
                {errors.judging_parameter && <span className="text-danger">This field is required</span>}
              </FormGroup>
            </Col>
          </Row>

        })}
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
