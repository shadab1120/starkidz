import { useEffect, useState,Fragment } from "react";
import { Row, Col, FormGroup, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { setContestDetails } from "../../store/CreateContestSlice";
import Api from "../../http/ContestApi";
import mApi from "../../http/masterApis";

const ContestDetails = ({ handleStepChange }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { id } = params;
  const [newContest, setNewContest] = useState(true);
  const { errors, handleSubmit, register, setValue } = useForm();
  const { data: contest_data, error, isLoading } = useQuery(['getContest', id], Api.getContest);
  const { data: age_bracket_list } = useQuery('getAgeBracketsList', mApi.getAgeBracketsList);
  const { data: contest_category } = useQuery('getContestTypeList', mApi.getContestTypeList);
  const [level, setLevel] = useState([]);
  const [ageGroup,setAgeGroup] = useState([]);
  const prizeLevel = [
    { "label": "Country Level", "id": 1 ,"type" :"Prize for Country","name":"country_level"},
    { "label": "State Level", "id": 2 ,"type" :"Prize for State","name":"state_level"},
    { "label": "District Level", "id": 3 ,"type" :"Prize for District","name":"district_level"},
    { "label": "City Level", "id": 4 ,"type" :"Prize for City","name":"city_level"},
    { "label": "School Level", "id": 5 ,"type" :"Prize for School","name":"school_level"}]

  useEffect(() => {
    if (id && contest_data) {
      const contestDetails = contest_data?.data[0] || []
      const { age_bracket, contest_name, contest_short_name, contest_theme, contest_type_2, contest_type, copy_from, about_contest } = contestDetails
      setValue('contest_type', contest_type);
      setValue('contest_name', contest_name);
      setValue('contest_short_name', contest_short_name);
      setValue('contest_type', contest_type);
      setValue('contest_type_2', contest_type_2);
      setValue('contest_theme', contest_theme);
      setValue('age_bracket', age_bracket);
      setValue('about_contest', about_contest);
      setValue('copy_from', copy_from);
    }
  }, [id])

  const onSubmit = (data) => {
    const event = id ? `update` : `insert`
    const payload = {
      contest_type: newContest ? "New_Contest" : "existing",
      ...data,
      event: event,
      contest_image: data.contest_image?.[0]
    };
    // image to base64
    // const reader = new FileReader();
    // reader.readAsDataURL(data.contest_image?.[0]);
    // reader.onloadend = () => {
    //   payload.contest_image = reader.result;
    dispatch(setContestDetails(payload));
    handleStepChange("next");
    //};
  };

  const handleAgeGroup=(e)=>{
    setAgeGroup(new Set([...ageGroup,e.target.value]))
  }
  const handleAddLevel = (id) => {
    setLevel(new Set([...level, id]))
  }
  console.log("ageGroup", ageGroup)
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
              <div className="form-group col-md-12 p-0" style={{ marginLeft: '15px' }}>
                <label className="form-label">Contest Type:</label>
                <div className="form-group d-flex">
                  <p className="radio-inline"></p>
                  <label className="radio-inline d-flex justify-content-center">
                    <input
                      className="radioButtonBig"
                      type="radio"
                      name="contest_type"
                      value="yes"
                      onChange={() => setNewContest(true)}
                    />
                    &nbsp;New Contest
                  </label>
                  <p className="radio-inline"></p>
                  <label className="radio-inline pl-2 d-flex justify-content-center">
                    <input
                      className="radioButtonBig"
                      type="radio"
                      name="contest_type"
                      value="no"
                      onChange={() => setNewContest(false)}
                    />&nbsp;
                    Copy From Existing
                  </label>
                </div>
              </div>
            </Row>
            <Row>

              <div className="form-group col-md-6 name-cls">
                <label className="form-label" htmlFor="contest_name">
                  Contest Name
                </label>
                <input
                  name="contest_name"
                  id="contest_name"
                  className="form-control"
                  placeholder="Contest Name"
                  ref={register({ required: "This field is required" })}
                />
                {errors.contest_name && <span className="error">{errors.contest_name.message}</span>}
              </div>
              <div className="form-group col-md-6 name-cls">
                <label className="form-label" htmlFor="contest_short_name">
                  Contest Short Name
                </label>
                <input
                  name="contest_short_name"
                  id="contest_short_name"
                  className="form-control"
                  placeholder="Contest Short Name"
                  ref={register({ required: "This field is required" })}
                />
                {errors.contest_short_name && <span className="error">{errors.contest_short_name.message}</span>}
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
                    {contest_data?.data?.map((list, i) => <option key={i} value={list.id}>{list.copy_from} - {list.copy_from}</option>)}
                  </select>
                  {errors.age_bracket && <span className="error">{errors.age_bracket.message}</span>}
                </div>
              </div>
            </Row>
            <Row>
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
                <select
                  ref={register}
                  {...register('age_bracket')}
                  name="age_bracket"
                  id="age_bracket"
                  multiple={true}
                  placeholder="Age Bracket"
                  className="form-select form-select-lg form-control"
                  style={{
                    width: "100%",
                    height: "80px",
                  }}
                  onChange={(ev) => handleAgeGroup(ev)}
                >
                  {age_bracket_list?.data?.map((list, i) => <option key={i} value={`${list.age_from}-${list.age_to}`}>{list.age_from} - {list.age_to}</option>)}
                </select>
                {errors.age_bracket && <span className="error">{errors.age_bracket.message}</span>}
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
                  {contest_category?.data?.map((list, i) => <option key={i} value={list.id}>{list.contest_type_name}</option>)}

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
              <div className="form-group col-md-12 name-cls">
                <label className="form-label" htmlFor="about_contest">
                  About Contest
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  col="5"
                  ref={register({ required: "This field is required" })}
                  {...register('about_contest')}
                  name="about_contest"
                  id="about_contest"
                ></textarea>
                {errors.about_contest && <span className="error">{errors.about_contest.message}</span>}
              </div>
            </Row>
            <Row className="mt-4">
              <Col xxl="12" md="12" sm="12">
                <div
                  className="d-flex justify-content-start"
                  style={{
                    gap: "10px",
                  }}
                >
                  {prizeLevel?.map((l) => <Button key={id} className="btn-primary" type="button" onClick={(e) => handleAddLevel(l.id)}>{l.label}</Button>)}
                </div>
              </Col>
            </Row>
            <br />

            {Array.from(level)?.map((l,i) => {

              return <Row key={l}>
                <div className="form-group col-md-12 name-cls">
                  <label className="form-label" htmlFor="contest_name">
                    {prizeLevel[i].type}
                  </label>
                  <hr />
                </div>
                <div className="form-group col-md-6 name-cls">
                  <label className="form-label" htmlFor="contest_name">
                    Age / Prizes
                  </label>
                  <hr />
                </div>
                <div className="form-group col-md-6 name-cls">
                  <label className="form-label" htmlFor="prizes">
                    Prizes
                  </label>
                  <hr />
                </div>
               
                {Array.from(ageGroup).map((age,a)=>{
                  return  <Fragment key={a}> 
                   <div className="form-group col-md-2 name-cls">
                   <label className="form-label" htmlFor="name">
                    {age} Years
                  </label>
                </div>
                  <div className="form-group col-md-8 name-cls">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    name={`name_${age}_${prizeLevel[i].name}`}
                    className="form-control"
                    placeholder="Name"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors[`name_${age}_${prizeLevel[i].name}`] && <span className="error">{errors[`name_${age}_${prizeLevel[i].name}`].message}</span>}
                </div>
                <div className="form-group col-md-6 name-cls">
                  <label className="form-label" htmlFor="contest_type_2">
                    Qty
                  </label>
                  <input
                     name={`qty_${age}_${prizeLevel[i].name}`}
                    className="form-control"
                    placeholder="Qty"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors[`qty_${age}_${prizeLevel[i].name}`] && <span className="error">{errors[`qty_${age}_${prizeLevel[i].name}`].message}</span>}
                </div>
                <div className="form-group col-md-6 name-cls">
                  <label className="form-label" htmlFor="contest_theme">
                    Item
                  </label>
                  <input
                     name={`item_${age}_${prizeLevel[i].name}`}
                    className="form-control"
                    placeholder="Item"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors[`item_${age}_${prizeLevel[i].name}`] && <span className="error">{errors[`item_${age}_${prizeLevel[i].name}`].message}</span>}
                </div>
                  <hr/>
                  </Fragment>
                 
                })}
              

              </Row>
            })}
            <Row className="mt-4">
              <Col xxl="12" md="12" sm="12">
                <div
                  className="d-flex justify-content-start"
                  style={{
                    gap: "10px",
                  }}
                >
                 <Button className="btn-primary" type="submit" onClick={() => handleStepChange("prev")}>
                    Back
                  </Button>
                  <Button className="btn-primary" type="submit">
                    Next
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
