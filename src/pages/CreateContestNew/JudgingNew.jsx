import React, { useEffect, useState } from "react";
import { Row, Card, Col, Table } from "reactstrap";
import { RiArrowLeftSLine } from "react-icons/ri";
import EditIcon from "../../assets/icons/exclude-icon.svg";
import DeleteIcon from "./delete-icon.svg";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import Rocket from "../../assets/icons/rocket.svg";
import { Button, Form, Select, Input } from "antd";
import Api from "../../http/masterApis";
import mApi from "../../http/ContestApi";
import "./styles/JudgingNew.css";
import { setContestDetails } from "../../store/CreateContestSlice";
import toast, { Toaster } from "react-hot-toast";
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
const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    width: "80%",
    borderRadius: "10px",
    height: "40px",
    minHeight: "40px",
    padding: "0 10px",
    textAllign: "center",
    backgroundColor: "#f6f6f6",
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: "#707070",
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
    width: "80%",
  }),
};

const customTableStyles = {
  control: (base, state) => ({
    ...base,
    width: "100%",
    borderRadius: "10px",
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
    backgroundColor: state.isFocused ? "#DBD7D7" : "#fff",
  }),
};

const JudgingNew = ({ handleStepChange }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { id } = params;
  const [form] = Form.useForm();
  const contestDetails = useSelector((state) => state.contest);
  const manageMutation = useMutation(mApi.manageContest);

  const { age_bracket } = contestDetails;
  const [judgingParametersLabel, setJudgingParametersLabel] = useState("");
  const [judgingParameters, setJudgingParameters] = useState(0);
  const [judgingLabel, setJudgingLabel] = useState(0);
  const [qualityAnalyticsLabel,setQualityAnalyticsLabel] = useState([])
  const [qualityAnalytics,setQualityAnalytics] = useState([])

  const { data: user_list } = useQuery('getUsers', Api.getUsers);

  const { data: judge_params } = useQuery('getJudgingParametersList', Api.getJudgingParametersList);
  const { data: role_list } = useQuery('getRole', Api.getRole);
  const { data: selected_role } = useQuery(['getRoleByName', id], Api.getRoleByName);
  const { data: multi_selected_role } = useQuery(['getMultiSelectUsers', qualityAnalyticsLabel], Api.getMultiSelectUsers);
  const { data: multi_selected_judge_role } = useQuery(['getMultiSelectUsers', 'judge'], Api.getMultiSelectUsers);


  useEffect(() => {
    let { district, state, contest_manager, start_date, contest_end_date, result_date } = contestDetails;
    form.setFieldsValue({
      district,
      state,
      contest_manager: contest_manager,
      //start_date: start_date,
      // contest_end_date: contest_end_date,
      //result_date

    });

  }, [contestDetails, form])


  const judgingParametersOption = judge_params?.data?.map((c) => {
    return { value: c.id, label: c.judging_para_name };
  });

  const userList = user_list?.data?.map((c) => {
    return { value: c.id, label: c.name };
  });
  const roleListOption = role_list?.data?.map((c) => {
    return { value: c.id, label: c.role_name };
  });

  const multiSelectedRole = multi_selected_role?.data?.map((c) => {
    return { value: c.id, label: c.name };
  });
  const judgeLabel = [1, 2, 3].map((c) => {
    return { value: c, label: c };
  });

  const judgeList = multi_selected_judge_role?.data?.map((c) => {
    return { value: c.id, label: c.name };
  });


  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleNext = async () => {
    const event = id ? `update` : `insert`;
    let { judging_parameter, level_judging, qa, qa_form, select_judge_form } = form.getFieldsValue();
    let qa_data = form.getFieldsValue();
    qa_data = _.omit(qa_data, ["judging_parameter", "level_judging", "qa", "qa_form", "select_judge_form"])


    const payload = {
      ...contestDetails,
      event: event,
      judging_parameter,
      level_judging,
      qa,
      qa_form,
      select_judge_form,
      judge_level_data:qa_data

    }
    console.log('payload', payload)
    dispatch(setContestDetails(payload));
    handleStepChange("next");
  };


  const onFinish = async (data) => {

    const message = id ? `update` : `created`
    const event = id ? `update` : `insert`;
    const { contest_type, age_bracket, contest_type_2, contest_name, contest_short_name, contest_theme,
      district, state, contest_manager, start_date, contest_end_date, result_date } = contestDetails;

    let { judging_parameter, level_judging, qa, qa_form, select_judge_form } = form.getFieldsValue();
    let qa_data = form.getFieldsValue();
    qa_data = _.omit(qa_data, ["judging_parameter", "level_judging", "qa", "qa_form", "select_judge_form"])


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
    formData.append('judge_level_data',qa_data);

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
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
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
            Judging
          </h1>
        </Row>
        <hr
          style={{
            width: "100%",
            color: "#707070",
            opacity: "0.2",
          }}
        />
        <Row className="d-flex px-2 flex-column">
          <h5 className="font-weight-normal">Total Marks</h5>
          <Row
            className="d-flex"
            style={{
              gap: "1rem",
            }}
          >
            {age_bracket?.map((item, index) => (
              <Card
                key={index}
                className="mt-0"
                style={{
                  width: "18rem",
                }}
              >
                <div
                  className="d-flex align-center flex-column"
                  style={{
                    gap: "0.6rem",
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: "#D32F2F",
                      borderRadius: "21px",
                      border: "none",
                      padding: "0.5rem 2rem",
                      width: "90%",
                      fontStyle: "italic",
                    }}
                    className="d-flex align-items-center justify-content-center text-white"
                  >
                    Total Marks for {item}
                  </Button>
                  <div className="mt-2 text-center w-100 total-score py-1">
                    <span>100</span>
                  </div>
                </div>
              </Card>
            ))}
          </Row>
        </Row>
        <Row className="table-parameter p-2 mx-2 my-3">
          <div className="px-2 w-100">
            <h5 className="font-weight-normal" style={{ fontSize: "18px" }}>
              Select Judging Parameters
            </h5>

            <Form.Item
              name="judging_parameter"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
              className="w-50"
            >
              <Select
                placeholder="Judging Parameters"
                className="basic-single"
                styles={customStyles}
                onChange={(value, index) => {
                  setJudgingParametersLabel(index?.label);
                  setJudgingParameters(value);
                }}
                options={judgingParametersOption}
              />
            </Form.Item>
          </div>
          <div
            className="w-100"
            style={{
              height: "190px",
              overflowY: "scroll",
            }}
          >
            <Table borderless className="judge-parameter">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Judging Paramerters</th>
                  {age_bracket?.map((item, index) => (
                    <th>
                      Weightage for <span className="red-accent">{item}</span>
                    </th>
                  ))}
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="f-14 vertical-align-middle">
                    1
                  </th>
                  <td>
                    <Form.Item
                      name={`judging_parameter`}
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Contest Name" className="p-2" />
                    </Form.Item>
                  </td>
                  {age_bracket?.map((item, index) => (
                    <td className="text-center">
                      <div className=" d-flex justify-content-center align-items-center">
                        <div className="bg-white w-75  border-radius-10 position-relative">
                          <Form.Item
<<<<<<< HEAD
                            name={`judging_parameter_weightage_${index}`}
=======
                            name="contest_name"
                            className="m-0"
>>>>>>> 7998aeb620eab507828fb38229d41ecf5607ce47
                            rules={[
                              {
                                required: true,
                                message: "This field is required",
                              },
                            ]}
                          >
                            <Input placeholder="Enter Contest Name" className="p-2" />
                            <img className="edit-icon" src={EditIcon} alt="" />
                          </Form.Item>
                        </div>
                      </div>
                    </td>
                  ))}
                  {/* <td className="text-center">
                    <img src={DeleteIcon} alt="" />
                  </td> */}
                </tr>
              </tbody>
            </Table>
          </div>
        </Row>
        <hr
          style={{
            width: "100%",
            color: "#707070",
            opacity: "0.2",
          }}
        />
        <Row>
          <Col md={6}>
            <p className="f-18 grey-accent m-0">Select Quality Analytics From</p>
            <div>
              <Form.Item
                name="qa_form"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Select
                  placeholder="Quality Analytics From"
                  className="basic-single"
                  mode="multiple"
                  //onChange={onChangeMultiSelect}
                  onChange={(value, index) => { setQualityAnalyticsLabel(index?.map((l)=>l.label)); setQualityAnalytics(value) }}
                  options={roleListOption}
                  //maxTagCount={2}
                />
              </Form.Item>
            </div>
          </Col>
          <Col md={6}>
            <p className="f-18 grey-accent m-0">Choose Quality Analytics</p>
            <div>
              <Form.Item
                name="qa"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Select
                  placeholder="Quality Analytics"
                  className="basic-single"
                  styles={customTableStyles}
                  mode="multiple"
                  onChange={handleChange}
                  //maxTagCount={2}
                  options={multiSelectedRole}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={6}>
            <p className="f-18 grey-accent m-0">Select Judges From</p>
            <div>
              <Form.Item
                name="select_judge_form"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Select
                  placeholder="Judges From"
                  className="basic-single"
                  styles={customTableStyles}
                  mode="multiple"
                  onChange={handleChange}
                  options={userList}
                  //  maxTagCount={2}
                />
              </Form.Item>
            </div>
          </Col>
          <Col md={6}>
            <p className="f-18 grey-accent m-0">Level of Judging</p>
            <div>
              <Form.Item
                name="level_judging"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Select
                  placeholder="Level of Judging"
                  className="basic-single"
                  styles={customTableStyles}
                  onChange={(value) => setJudgingLabel(value)}
                  options={judgeLabel}
                  //  maxTagCount={2}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>
        {[...Array(judgingLabel).keys()].map((item, index) => (<Row className="mt-2">
          <Col md={3}>
            <p className="f-18 grey-accent m-0">Judges Level - {item + 1}</p>
            <div className="mt-2 text-center w-100 total-score py-1">
              <Form.Item
                name={`judge_name_${item}_${index}`}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
                className="w-50"
              >
                <Select
                  placeholder="Judging Parameters"
                  className="basic-single"
                  styles={customStyles}
                  onChange={handleChange}
                  options={judgeList}
                />
              </Form.Item>
            </div>
          </Col>
          <Col md={5}>
            <p className="f-18 grey-accent m-0">Percentage of entries judged at level - {item + 1}</p>
            <div className="mt-2 text-center w-100 total-score py-1">
              <Form.Item
                name={`percentage_of_judge_level_${item}_${index}`}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Input placeholder="Enter Contest Name" className="p-2" />
              </Form.Item>
            </div>
          </Col>
          <Col md={4}>
            <p className="f-18 grey-accent m-0">Judging TAT [in days]</p>
            <div className="mt-2 text-center w-100 total-score py-1">
              <Form.Item
                name={`judging_tat_${item}_${index}`}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Input placeholder="Enter Contest Name" className="p-2" />
              </Form.Item>
            </div>
          </Col>
        </Row>
        ))}
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

export default JudgingNew;
