import React from "react";
import { Row, Card, Col } from "reactstrap";
import { RiArrowLeftSLine } from "react-icons/ri";
import CopyIcon from "../../assets/icons/copy.svg";
import PlusIcon from "../../assets/icons/plus.svg";
import Checked from "../../assets/icons/checked.svg";
import { Button, Form, Select, Input } from "antd";

import Trophy from "../../assets/icons/gold-winner-trophy-icon.svg";

import "./styles/ContestFeesAndPrizes.css";

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
    width: "40%",
  }),
};

const options = [
  { value: "chocolate", label: "Contest short Name 1 --   Date of creation --  Contest Type" },
  { value: "strawberry", label: "Contest short Name 1 --   Date of creation --  Contest Type" },
  { value: "vanilla", label: "Contest short Name 1 --   Date of creation --  Contest Type" },
];

const ContestFeesAndPrizes = ({ handleStepChange }) => {
  const [form] = Form.useForm();

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
          <h1 className="primary-red text-lg f-18">Contest Fees &#38; Prizes</h1>
        </Row>
        <hr
          style={{
            width: "100%",
            color: "#707070",
            opacity: "0.2",
          }}
        />
        <Row className="d-flex px-2 flex-column">
          <h5 className="font-weight-normal">Contest Fees</h5>
          <Row
            className="d-flex pl-5"
            style={{
              gap: "1rem",
            }}
          >
            {Array(4)
              .fill(0)
              .map((item, index) => (
                <Card key={index} className="mt-0">
                  <div
                    className="d-flex align-center flex-column"
                    style={{
                      gap: "0.6rem",
                    }}
                  >
                    <div className="w-100 d-flex">
                      <Button
                        style={{
                          backgroundColor: "#D32F2F",
                          borderRadius: "21px",
                          border: "none",
                          padding: "0.5rem 2rem",
                          width: "90%",
                          fontStyle: "italic",
                        }}
                        className="text-white"
                      >
                        Total Marks for 4-6
                      </Button>
                      <div className="mx-1 text-center">
                        <span className="f-9 text-nowrap">copy to all</span>
                        <img src={CopyIcon} alt="" />
                      </div>
                    </div>

                    <div className="mt-2 text-center w-100 total-score py-1">
                      <Form.Item
                        className="form-control input-fees "
                        name="contest_name"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Input placeholder="Enter Fees" />
                      </Form.Item>
                    </div>
                  </div>
                </Card>
              ))}
          </Row>
        </Row>
        <hr
          style={{
            width: "100%",
            color: "#707070",
            opacity: "0.2",
          }}
        />
        <Row className="d-flex px-2 mb-5">
          <Col md={12} className="d-flex">
            <img src={Trophy} alt="" />
            <div className="w-75 ml-2">
              <h5 className="font-weight-normal mx-2">Select Prizes</h5>
              <div>
                <Form.Item
                  name="prize"
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <Select
                    placeholder="Prize"
                    className="w-75"
                    styles={customStyles}
                    mode="multiple"
                    onChange={handleChange}
                    options={options}
                  />
                </Form.Item>
              </div>
            </div>
          </Col>
          <Col md={12} className="d-flex mt-4 pl-5">
            {Array(4)
              .fill(["Country level", "State level", "City level", "School level"])
              .map((item, index) => (
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
                    <div className="w-100 d-flex">
                      <Button
                        style={{
                          backgroundColor: "#D32F2F",
                          borderRadius: "21px",
                          border: "none",
                          padding: "1.2rem 2rem",
                          width: "90%",
                          fontStyle: "italic",
                        }}
                        className="d-flex align-items-center justify-content-center  text-white"
                      >
                        <img src={PlusIcon} alt="" className="mx-2" />
                        <span className="mr-2"> {item[index]}</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </Col>
        </Row>
        <hr
          style={{
            width: "100%",
            color: "#707070",
            opacity: "0.2",
          }}
        />

        {/* Button */}
        <Row className="mb-4 mt-5 d-flex px-4 justify-content-between">
          <div>
            <Button
              style={{
                backgroundColor: "#FF8383",
                fontSize: "28px",
                height: "40px",
              }}
              className="d-flex align-items-center justify-content-center text-white"
              onClick={() => handleStepChange("prev")}
            >
              <RiArrowLeftSLine size={20} color="#fff" />
              Back
            </Button>
          </div>
          <div
            className="d-flex"
            style={{
              gap: "1rem",
            }}
          >
            <Button
              htmlType="submit"
              className="d-flex align-items-center justify-content-center text-white"
              style={{
                backgroundColor: "#918A8A",
                fontSize: "28px",
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
              Save Draft
            </Button>
            <Button
              htmlType="submit"
              style={{
                backgroundColor: "#D32F2F",
                fontSize: "28px",
                height: "40px",
              }}
              className="d-flex align-items-center justify-content-center text-white"
              onClick={() => {
                handleStepChange("next");
              }}
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16.36"
                height="28.485"
                viewBox="0 0 16.36 28.485"
                style={{
                  marginLeft: "5px",
                  height: "15px",
                }}
              >
                <g
                  id="Iconly_Light-outline_Arrow_-_Up_2"
                  data-name="Iconly Light-outline Arrow - Up 2"
                  transform="matrix(-0.017, -1, 1, -0.017, 0.492, 21.485)"
                >
                  <g id="Arrow_-_Up_2-6" data-name="Arrow - Up 2-6" transform="translate(21.214 15.748) rotate(180)">
                    <path
                      id="Arrow_-_Up_2-7"
                      data-name="Arrow - Up 2-7"
                      d="M27.788,15.436a1.429,1.429,0,0,1-1.89.143l-.162-.143L14.107,3.574,2.478,15.436a1.429,1.429,0,0,1-1.89.143l-.162-.143a1.5,1.5,0,0,1-.141-1.927l.141-.166L13.081.434a1.43,1.43,0,0,1,1.89-.143l.162.143L27.788,13.343A1.5,1.5,0,0,1,27.788,15.436Z"
                      transform="translate(0)"
                      fill="#fff"
                    />
                  </g>
                </g>
              </svg>
            </Button>
          </div>
        </Row>
      </Form>
    </>
  );
};

export default ContestFeesAndPrizes;
