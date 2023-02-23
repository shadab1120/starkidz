import React, { useEffect, useState } from "react"
import { Row, Col, FormGroup, Button, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import moment from "moment"
import { DATE_FORMAT } from "./../../utils/Utils"
import { setContestDetails } from "../../store/CreateContestSlice";
import { useQuery } from "react-query";
import Api from "../../http/ContestApi";
import mApi from "../../http/masterApis";
import { useParams } from "react-router-dom";

const DurationLocation = ({ handleStepChange }) => {

  const params = useParams();
  const dispatch = useDispatch();
  const { id } = params;
  const { errors, handleSubmit, register, setValue } = useForm();
  const { data: state_list } = useQuery('getStateList', mApi.getStateList);
  const { data: city_list } = useQuery('getCityList', mApi.getCityList);
  const { data: district_list } = useQuery('getDistrictList', mApi.getDistrictList);
  const { data: contest_data } = useQuery(['getContest', id], Api.getContest);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    if (contest_data && id) {
      const contestDetails = contest_data?.data[0] || []
      const { contest_start_end_date, contest_start_date, result_date, contest_manager, state, district } = contestDetails
      setValue('contest_start_end_date', moment(contest_start_end_date).format(DATE_FORMAT));
      setValue('contest_start_date', moment(contest_start_date).format(DATE_FORMAT));
      setValue('result_date', moment(result_date).format(DATE_FORMAT));
      setValue('contest_manager', contest_manager);
      setValue('state', state || -1);
      setValue('district', district || -1);
    }
  }, [id])



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
              <label className="form-label" htmlFor="contest_start_date">
                Contest Start Date
              </label>
              <input
                className="form-control datepicker"
                type="date"
                name="contest_start_date"
                id="contest_start_date"
                ref={register({ required: "This field is required" })}
              />

              {errors.contest_start_date && <span className="text-danger">This field is required</span>}
            </FormGroup>
          </Col>
          <Col xxl="6" md="6" sm="12">
            <FormGroup>
              <label className="form-label" htmlFor="contest_start_end_date">
                Contest End Date
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
                {[
                  { id: '0', name: 'One' },
                  { id: '1', name: 'Two' },
                  { id: '2', name: 'Three' }
                ].map((list, i) => <option key={i} value={list.id}>{list.name}</option>)}
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
                ref={register}
                {...register('state')}
                name="state"
                id="state"
                className="form-select form-select-lg form-control"
                style={{
                  width: "100%",
                  height: "38px",
                }}
                onChange={(ev) => setSelectedState(ev.target.value)}
              >
                <option key="-1" value="-1">Select State</option>
                {state_list?.data?.map((list, i) => <option key={i} value={list.id}>{list.state_name}</option>)}
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
              onChange={(ev) => setSelectedDistrict(ev.target.value)}
            >

              <option key="-2" value="-2">Select District</option>
              <option key="-1" value="-1">All</option>
              {district_list?.data?.filter((d) => d.state_name === selectedState).map((list, i) => <option key={i} value={list.id}>{list.district_name}</option>)}
            </select>
            {errors.district && <span className="error">{errors.district.message}</span>}
          </Col>
          <Col xxl="6" md="6" sm="12">
            <label className="form-label" htmlFor="city">
              Select City
            </label>
            <select
              className="form-select form-select-lg form-control"
              id="city"
              name="city"
              multiple={true}
              ref={register({ required: "This field is required" })}
              onChange={(ev) => setSelectedCity(ev.target.value)}
            >
              <option key="-1" value="-1">Select City</option>
              {city_list?.data?.filter((l) => l. district === selectedDistrict).map((list, i) => <option key={i} value={list.id}>{list.city_name}</option>)}
            </select>
            {errors.city && <span className="error">{errors.city.message}</span>}
          </Col>
          <Row className="mt-4">
            <Col xxl="12" md="12" sm="12">
              <div className="d-flex justify-content-between">
                 <Button className="btn-primary" type="submit" onClick={() => handleStepChange("prev")}>
                  Back
                </Button>
                <Button className="btn-primary" type="submit">
                  Next
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
