import React, { useState } from "react";
import { Row, Card, Col, Table } from "reactstrap";
import { RiArrowLeftSLine } from "react-icons/ri";
import EditIcon from "../../assets/icons/exclude-icon.svg";
import DeleteIcon from "./delete-icon.svg";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Rocket from "../../assets/icons/rocket.svg";
import { Button, Form, Select, Input } from "antd";
import Api from "../../http/masterApis"
import "./styles/JudgingNew.css";
import { useDispatch, useSelector } from "react-redux";
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
  const [form] = Form.useForm();
  const { id } = params;
  const contestDetails = useSelector((state) => state.contest);
  const { age_bracket } = contestDetails;
  const [judgingParametersLabel, setJudgingParametersLabel] = useState('');
  const [judgingParameters, setJudgingParameters] = useState(0);
  const [judgingLabel, setJudgingLabel] = useState(0);

  const { data: user_list } = useQuery('getUsers', Api.getUsers);
  const [roleList, setRoleList] = useState([])
  const { data: judge_params } = useQuery('getJudgingParametersList', Api.getJudgingParametersList);
  const { data: role_list } = useQuery('getRole', Api.getRole);
  const { data: selected_role } = useQuery(['getRoleByName', id], Api.getRoleByName);
  const { data: multi_selected_role } = useQuery(['getMultiSelectUsers', roleList?.join()], Api.getMultiSelectUsers);
  const { data: multi_selected_judge_role } = useQuery(['getMultiSelectUsers', 'judge'], Api.getMultiSelectUsers);

  console.log('multi_selected_role', multi_selected_judge_role)

  const judgingParametersOption = judge_params?.data?.map((c) => {
    return { value: c.id, label: c.judging_para_name };
  });

  const userList = user_list?.data?.map((c) => {
    return { value: c.id, label: c.name };
  });
  const roleListOption = role_list?.data?.map((c) => {
    return { value: c.role, label: c.role_name };
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

  const onChangeMultiSelect = (evt) => {
    setRoleList([...evt])
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = async (data) => {
    // const event = id ? `update` : `insert`
    // const payload = {
    //   ...data,
    //   event: event
    // };
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
              name="district"
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
                onChange={(value, index) => { setJudgingParametersLabel(index?.label); setJudgingParameters(value) }}
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="f-14 vertical-align-middle">
                    1
                  </th>
                  <td>
                    {/* <Select className="w-100" options={options} placeholder="choose parameter 1"></Select> */}
                    <Form.Item
                      name="contest_name"
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
                        <div className="bg-white w-75 py-1 px-3 border-radius-10 position-relative">
                          <Form.Item
                            name="contest_name"
                            rules={[
                              {
                                required: true,
                                message: "This field is required",
                              },
                            ]}
                          >
                            <Input placeholder="Enter Contest Name" className="p-2" />
                          </Form.Item>
                          <img className="edit-icon" src={EditIcon} alt="" />
                        </div>
                      </div>
                    </td>
                  ))}
                  <td className="text-center">
                    <img src={DeleteIcon} alt="" />
                  </td>
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
                  onChange={onChangeMultiSelect}
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
                name="lable_judging"
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
                name="judge_name"
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
                name="contest_name"
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
                name="contest_name"
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
              onClick={() => {
                handleStepChange("next");
              }}
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
