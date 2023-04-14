import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";
import { Button, Form, Input } from "antd";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../http/masterApis";
import mApi from "../../http/ContestApi";
import { setContestDetails } from "../../store/CreateContestSlice";
import toast, { Toaster } from "react-hot-toast";
import { RiArrowLeftSLine } from "react-icons/ri";
import Rocket from "../../assets/icons/rocket.svg";
import "./styles/JudgingNew.css";
const { TextArea } = Input;
const customStyles = {
  control: (base, state) => ({
    ...base,
    width: "40%",
    borderRadius: "10px",
    height: "40px",
    minHeight: "40px",
    padding: "0 10px",
    textAllign: "center",
    backgroundColor: "#f6f6f6",
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: "#D32F2F",
  }),
  option: (base, state) => ({
    ...base,
    color: "#D32F2F",
    allignItems: "center",
    display: "flex",
    justifyContent: "center",
    fontWeight: "bold",
    borderBottom: "1px solid #DBD7D7",
    border: "70%",
    backgroundColor: state.isFocused ? "#DBD7D7" : "#fff",
  }),
  menu: (base, state) => ({
    ...base,
    width: "40%",
  }),
};

const About = ({ handleStepChange }) => {

  const params = useParams();
  const dispatch = useDispatch();
  const { id } = params;
  const [form] = Form.useForm();
  const contestDetails = useSelector((state) => state.contest);
  const manageMutation = useMutation(mApi.manageContest);

  useEffect(() => {
    const { about_contest } = contestDetails;
    form.setFieldsValue({
      about_contest

    });

  }, [contestDetails, form])

  const handleChange = ({ target: { value } }) => {
    console.log(`selected ${value}`);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleNext = async () => {
    const event = id ? `update` : `insert`;
    let { about_contest } = form.getFieldsValue();


    const payload = {
      ...contestDetails,
      event: event,
      about_contest

    }
    console.log('payload', payload)
    dispatch(setContestDetails(payload));
    handleStepChange("next");
  };


  const onFinish = async (data) => {

    const message = id ? `update` : `created`
    const event = id ? `update` : `insert`;
    const { contest_type, age_bracket, contest_type_2, contest_name, contest_short_name, contest_theme,
      district, state, contest_manager, start_date, contest_end_date, result_date, judge_level_data,
      judging_parameter, level_judging, qa, qa_form, select_judge_form, prize, contest_prizes } = contestDetails;

    let { about_contest } = form.getFieldsValue();

    const formData = new FormData();
    formData.append('age_bracket', age_bracket);
    formData.append('contest_name', contest_name);
    formData.append('contest_short_name', contest_short_name);
    formData.append('contest_type_2', contest_type_2);
    formData.append('contest_type', contest_type);
    formData.append('event', event);
    formData.append('contest_theme', contest_theme);
    formData.append('district', district);
    formData.append('state', state);
    formData.append('contest_manager', contest_manager);
    formData.append('start_date', start_date);
    formData.append('district', district);
    formData.append('contest_end_date', contest_end_date);
    formData.append('result_date', result_date);
    formData.append('judging_parameter', judging_parameter);
    formData.append('level_judging', level_judging);
    formData.append('qa', qa);
    formData.append('qa_form', qa_form);
    formData.append('select_judge_form', select_judge_form);
    formData.append('judge_level_data', judge_level_data);
    formData.append('contest_prizes', contest_prizes);
    formData.append('prize', prize);
    formData.append('about_contest', about_contest);

    manageMutation.mutate(formData, {

      onSuccess: (response) => {
        console.log('response', response)
        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        //toast.success(`Contest ${message} successfully`);
        //history.push(`${process.env.PUBLIC_URL}/monitor-contest`);
      },
    });
  };




  return (
    <>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" id="contestdetails">
        <Row
          style={{
            width: "100%",
            padding: "1rem 2rem 0 2rem",
          }}
        >
          <h1
            style={{
              color: "#D32F2F",
              fontSize: "2rem",
            }}
          >
            About Contest
          </h1>
        </Row>
        <hr
          style={{
            width: "100%",
            color: "#707070",
            opacity: "0.2",
          }}
        />
        <Row className="py-2 px-4 d-flex flex-column">
          <h4 className="f-18 grey-accent">Write About</h4>
          <Form.Item
            name="about_contest"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <TextArea
              rows={20}
              style={{
                backgroundColor: "#f6f6f6",
              }}
              placeholder="Write About"
              onChange={handleChange}
            />
          </Form.Item>
        </Row>


        {/* Button */}
        <Row className="mb-4 mt-5 d-flex px-4 justify-content-between">
          <div>
            <Button
              style={{
                backgroundColor: "#FF8383",
                height: "40px",
              }}
              className="d-flex align-items-center justify-content-center text-white"
              onClick={() => handleStepChange("prev")}
            >
              <RiArrowLeftSLine size={20} color="#fff" />
              <span
                style={{
                  fontSize: "1.2rem",
                }}
              >
                Back
              </span>
            </Button>
          </div>
          <div
            className="d-flex"
            style={{
              gap: "1rem",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="d-flex align-items-center justify-content-center text-white"
              style={{
                backgroundColor: "#918A8A",
                height: "40px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                style={{
                  marginRight: "5px",
                }}
              >
                <path
                  id="save_icon"
                  data-name="save icon"
                  d="M8,20H6a2,2,0,0,1-2-2V6A2,2,0,0,1,6,4H9M8,20V14a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v6M8,20h8m0,0h2a2,2,0,0,0,2-2V8.828a2,2,0,0,0-.586-1.414L16.586,4.586A2,2,0,0,0,15.172,4H15m0,0V7a1,1,0,0,1-1,1H10A1,1,0,0,1,9,7V4m6,0H9"
                  transform="translate(-3 -3)"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <span
                style={{
                  fontSize: "1.2rem",
                }}
              >
                Save Draft
              </span>
            </Button>
            <Button
              style={{
                backgroundColor: "#D32F2F",
                height: "40px",
              }}
              onClick={handleNext}
              className="d-flex align-items-center justify-content-center text-white"
            >
              <img src={Rocket} height="22" alt="" className="mr-2" />
              <span
                style={{
                  fontSize: "1.2rem",
                }}
              >
                Next
              </span>
            </Button>
          </div>
        </Row>
      </Form>
    </>
  );
};

export default About;
