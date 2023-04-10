import React, { useState, Fragment } from "react";
import { Row, Col, Container, FormGroup, Label } from "reactstrap";
import { useQuery } from "react-query";
// import Select from "react-select";
import Rocket from "../../assets/icons/rocket.svg";
import "./styles/DurationLocation.css";
import { RiArrowLeftSLine } from "react-icons/ri";
import { Button, Form, Select, DatePicker, Checkbox } from "antd";
import Api from "../../http/masterApis";
const DurationLocation = ({ handleStepChange }) => {
  const defaultValues = {
    states: null,
    district: null,
  };

  const [form] = Form.useForm();
  const { data: state_list } = useQuery('getStateList', Api.getStateList);
  const { data: city_list } = useQuery('getCityList', Api.getCityList);
  const { data: district_list } = useQuery('getDistrictList', Api.getDistrictList);
  const { data: role_list } = useQuery('getRole', Api.getRole);
  const [stateName, setStateName] = useState("-1");
  const [districtName, setDistrictName] = useState([]);
  const [districtArrayList, setDistrictArrayList] = useState([]);
  const [stateLabel, setStateLabel] = useState("");


  const options = role_list?.data?.filter((r) => r.role === "contest_manager").map((c) => {
    return { value: c.id, label: `${c.role_name}` };
  })


  const stateList = state_list?.data?.map((c) => {
    return { value: c.id, label: `${c.state_name}` };
  });
  const districtList = district_list?.data?.filter((c) => stateName > 0 && c.state_name === stateName)?.map((c) => {
    return { value: c.id, label: `${c.district_name}` };
  });

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

  const handleReset = () => {
    setDistrictArrayList([]);
    setStateLabel("");
    form.resetFields(['district','states']);
  }

  return (
    <>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Row
          style={{
            width: "100%",
            padding: "2rem 2rem 0 2rem",
          }}
        >
          <h4
            style={{
              color: "#D32F2F",
            }}
          >
            Duration & Location
          </h4>
        </Row>
        <hr
          style={{
            width: "100%",
            color: "#707070",
            opacity: "0.2",
          }}
        />
        <Container
          style={{
            width: "100%",
          }}
          className="mb-3"
        >
          <Row>
            <Col md={5} className="d-flex flex-column">
              <div
                className="px-2 d-flex flex-column"
                style={{
                  outline: "1px solid #FF3333",
                  borderRadius: "25px",
                  paddingBottom: "2em",
                  paddingTop: "1.7em",
                }}
              >
                <span
                  className="w-100 mb-3"
                  style={{
                    color: "#928F8F",
                    fontSize: "18px",
                    textAlign: "center",
                  }}
                >
                  Select contents start and end date.
                </span>
                <div className="d-flex">
                  <div className="d-flex flex-column flex-fill">
                    <span
                      style={{
                        fontSize: "16px",
                        color: "#707070",
                      }}
                    >
                      Contest Start Date
                    </span>
                    <Form.Item
                      name="start_date"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                      style={{
                        backgroundColor: "#F6F6F6",
                        borderRadius: "10px",
                        display: "inline-block",
                      }}
                    >
                      <DatePicker
                        style={{
                          width: "100%",
                          padding: "0.5em",
                        }}
                        placeholder="Select start Date"
                      />
                    </Form.Item>
                  </div>
                  <div
                    style={{
                      width: "2em",
                      height: "5px",
                      backgroundColor: "#D32F2F",
                      marginTop: "40px",
                      opacity: "0.5",
                    }}
                    className="mx-2"
                  ></div>

                  <div className="d-flex flex-column flex-fill">
                    <span
                      style={{
                        fontSize: "16px",
                        color: "#707070",
                      }}
                    >
                      Contest End Date
                    </span>
                    <Form.Item
                      name="end_date"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                      style={{
                        backgroundColor: "#F6F6F6",
                        borderRadius: "10px",
                        display: "inline-block",
                      }}
                    >
                      <DatePicker
                        style={{
                          width: "100%",
                          padding: "0.5em",
                        }}
                        placeholder="Select End Date"
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <FormGroup className="mt-3">
                <Label>Select State</Label>
                <div>
                  <Form.Item
                    name="states"
                    rules={[
                      {
                        required: true,
                        message: "This field is required",
                      },
                    ]}
                  >
                    <Select
                      //defaultValue="lucy"
                      placeholder="State"
                      className="basic-single"
                      style={{
                        width: "100%",
                      }}
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                      options={stateList}
                      onChange={(value, index) => { setStateLabel(index.label); setStateName(value) }}
                    />
                  </Form.Item>
                </div>
              </FormGroup>
            </Col>
            <Col md={7} className="d-flex flex-column">
              <Label>Result Out Date</Label>

              <Form.Item
                name="date"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
                style={{
                  borderRadius: "10px",
                  display: "inline-block",
                }}
              >
                <DatePicker
                  style={{
                    width: "100%",
                    padding: "1em",
                  }}
                />
              </Form.Item>
              <Label>Contest Manager</Label>
              <Form.Item
                name="content_manager"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Select
                  //defaultValue="lucy"
                  placeholder="Contest Manager"
                  className="basic-single"
                  style={{
                    width: "100%",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                  onChange={handleChange}
                  options={options}
                />
              </Form.Item>
              <FormGroup className="">
                <Label>Select District</Label>
                <div>
                  <Form.Item
                    name="district"
                    rules={[
                      {
                        required: true,
                        message: "This field is required",
                      },
                    ]}
                  >
                    <Select
                      //defaultValue="lucy"
                      placeholder="District"
                      className="basic-single"
                      style={{
                        width: "100%",
                      }}
                      mode="multiple"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                      onChange={(value, index) => { setDistrictArrayList(index); setDistrictName(value) }}
                      options={districtList}
                    />
                  </Form.Item>
                </div>
              </FormGroup>
            </Col>
          </Row>
          {districtArrayList.length > 0 &&
            <Row className="mt-3 districtlist_section">
              <Col md={12} className="d-flex justify-content-between">
                <div  onClick={handleReset}>
                  <span>{stateLabel}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-2" width="23" height="22" viewBox="0 0 23 22">
                    <g id="Cross_button" data-name="Cross button" transform="translate(-309 -500)">
                      <g
                        id="Ellipse_73"
                        data-name="Ellipse 73"
                        transform="translate(309 500)"
                        fill="#d32f2f"
                        stroke="#707070"
                        strokeWidth="1"
                      >
                        <ellipse cx="11.5" cy="11" rx="11.5" ry="11" stroke="none" />
                        <ellipse cx="11.5" cy="11" rx="11" ry="10.5" fill="none" />
                      </g>
                      <line
                        id="Line_20"
                        data-name="Line 20"
                        x2="11"
                        y2="10"
                        transform="translate(315.5 506.5)"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="1"
                      />
                      <line
                        id="Line_21"
                        data-name="Line 21"
                        y1="10"
                        x2="11"
                        transform="translate(315.5 506.5)"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="1"
                      />
                    </g>
                  </svg>
                </div>
                <div onClick={handleReset}
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    gap: "10px",
                    cursor: "pointer",
                    backgroundColor: "#F6F6F6",
                    border: "1px solid #707070",
                    borderRadius: "10px",
                    paddingInline: "10px",
                  }}
                >
                  <i className="pi pi-times"></i>
                  <span
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    clear all district
                  </span>
                </div>
              </Col>

              <Col md={12} className="d-flex mt-3 overflow-auto">
                {districtArrayList?.map((item, index) => {
                  return (
                    <div
                      className="d-flex align-items-center"
                      style={{
                        gap: ".6rem",
                      }}
                      key={index}
                    >
                      <Button
                        htmlType="button"
                        className="text-white "
                        style={{
                          backgroundColor: "#D32F2F",
                          borderRadius: "21px",
                          border: "none",
                          // padding: "0.5rem 1rem",
                          width: "90%",
                          fontStyle: "italic",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.label}
                        {/* <Form.Item name={`remember_${index}`} className="mx-2" valuePropName="checked" noStyle>
                              <Checkbox className="mx-2"></Checkbox>
                            </Form.Item> */}
                      </Button>
                    </div>
                  );
                })}
              </Col>
            </Row>
          }

        </Container>

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

export default DurationLocation;
