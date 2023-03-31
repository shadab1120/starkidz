import React from "react";
import { Row, Card, Col } from "reactstrap";
import { RiArrowLeftSLine } from "react-icons/ri";
import EditIcon from "../../assets/icons/exclude-icon.svg";
import DeleteIcon from "./delete-icon.svg";
import { Table } from "reactstrap";
import { Button, Form, Select } from 'antd';

import "./styles/JudgingNew.css";


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
const options = [
  { value: "chocolate", label: "Contest short Name 1 --   Date of creation --  Contest Type" },
  { value: "strawberry", label: "Contest short Name 1 --   Date of creation --  Contest Type" },
  { value: "vanilla", label: "Contest short Name 1 --   Date of creation --  Contest Type" },
];

const JudgingNew = ({ handleStepChange }) => {
  const [form] = Form.useForm();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = async (data) => {
    const event = id ? `update` : `insert`
    const payload = {
      ...data,
      event: event
    };
  };


  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
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
            {Array(3)
              .fill(0)
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
                    <Button
                      style={{
                        backgroundColor: "#D32F2F",
                        borderRadius: "21px",
                        border: "none",
                        padding: "0.5rem 2rem",
                        width: "90%",
                        fontStyle: "italic",
                      }}
                    >
                      Total Marks for 4-6
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
                  message: 'This field is required',
                },
              ]}
            >
              <Select
                //defaultValue="lucy"
                placeholder="Judging Parameters"
                className="basic-single"
                styles={customStyles}

                onChange={handleChange}
                options={options}
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
                  <th>
                    weightage for <span className="red-accent">4-6</span>
                  </th>
                  <th>
                    weightage for <span className="red-accent">7-8</span>
                  </th>
                  <th>
                    weightage for <span className="red-accent">9-12 </span>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="f-14 vertical-align-middle">
                    1
                  </th>
                  <td>
                    <Select
                      options={options}
                      className="basic-single"
                      styles={customTableStyles}
                      placeholder="choose parameter 1"
                    ></Select>
                  </td>
                  <td className="text-center">
                    <div className=" d-flex justify-content-center align-items-center">
                      <div className="bg-white w-75 py-1 px-3 border-radius-10 position-relative">
                        <span>20</span>
                        <img className="edit-icon" src={EditIcon} alt="" />
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className=" d-flex justify-content-center align-items-center">
                      <div className="bg-white w-75 py-1 px-3 border-radius-10 position-relative">
                        <span>20</span>
                        <img className="edit-icon" src={EditIcon} alt="" />
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className=" d-flex justify-content-center align-items-center">
                      <div className="bg-white w-75 py-1 px-3 border-radius-10 position-relative">
                        <span>20</span>
                        <img className="edit-icon" src={EditIcon} alt="" />
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <img src={DeleteIcon} alt="" />
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="f-14 vertical-align-middle">
                    2
                  </th>
                  <td>
                    <Form.Item
                      name="district"
                      rules={[
                        {
                          required: true,
                          message: 'This field is required',
                        },
                      ]}
                    >
                      <Select
                        //defaultValue="lucy"
                        placeholder="choose parameter 2"
                        className="basic-single"
                        styles={customTableStyles}

                        onChange={handleChange}
                        options={options}
                      />
                    </Form.Item>
                  </td>

                  <td className="text-center">
                    <div className=" d-flex justify-content-center align-items-center">
                      <div className="bg-white w-75 py-1 px-3 border-radius-10 position-relative">
                        <span>20</span>
                        <img className="edit-icon" src={EditIcon} alt="" />
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className=" d-flex justify-content-center align-items-center">
                      <div className="bg-white w-75 py-1 px-3 border-radius-10 position-relative">
                        <span>20</span>
                        <img className="edit-icon" src={EditIcon} alt="" />
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className=" d-flex justify-content-center align-items-center">
                      <div className="bg-white w-75 py-1 px-3 border-radius-10 position-relative">
                        <span>20</span>
                        <img className="edit-icon" src={EditIcon} alt="" />
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <img src={DeleteIcon} alt="" />
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="f-14 vertical-align-middle">
                    3
                  </th>
                  <td>
                    <Form.Item
                      name="district"
                      rules={[
                        {
                          required: true,
                          message: 'This field is required',
                        },
                      ]}
                    >
                      <Select
                        //defaultValue="lucy"
                        placeholder="choose parameter 3"
                        className="basic-single"
                        styles={customTableStyles}

                        onChange={handleChange}
                        options={options}
                      />
                    </Form.Item>
                  </td>

                  <td className="text-center">
                    <div className=" d-flex justify-content-center align-items-center">
                      <div className="bg-white w-75 py-1 px-3 border-radius-10 position-relative">
                        <span>20</span>
                        <img className="edit-icon" src={EditIcon} alt="" />
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className=" d-flex justify-content-center align-items-center">
                      <div className="bg-white w-75 py-1 px-3 border-radius-10 position-relative">
                        <span>20</span>
                        <img className="edit-icon" src={EditIcon} alt="" />
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className=" d-flex justify-content-center align-items-center">
                      <div className="bg-white w-75 py-1 px-3 border-radius-10 position-relative">
                        <span>20</span>
                        <img className="edit-icon" src={EditIcon} alt="" />
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <img src={DeleteIcon} alt="" />
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="f-14 vertical-align-middle">
                    3
                  </th>
                  <td>
                    <Form.Item
                      name="district"
                      rules={[
                        {
                          required: true,
                          message: 'This field is required',
                        },
                      ]}
                    >
                      <Select
                        //defaultValue="lucy"
                        placeholder="choose parameter 3"
                        className="basic-single"
                        styles={customTableStyles}

                        onChange={handleChange}
                        options={options}
                      />
                    </Form.Item>
                  </td>

                  <td className="text-center">
                    <div className=" d-flex justify-content-center align-items-center">
                      <div className="bg-white w-75 py-1 px-3 border-radius-10 position-relative">
                        <span>20</span>
                        <img className="edit-icon" src={EditIcon} alt="" />
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className=" d-flex justify-content-center align-items-center">
                      <div className="bg-white w-75 py-1 px-3 border-radius-10 position-relative">
                        <span>20</span>
                        <img className="edit-icon" src={EditIcon} alt="" />
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className=" d-flex justify-content-center align-items-center">
                      <div className="bg-white w-75 py-1 px-3 border-radius-10 position-relative">
                        <span>20</span>
                        <img className="edit-icon" src={EditIcon} alt="" />
                      </div>
                    </div>
                  </td>
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
                name="district"
                rules={[
                  {
                    required: true,
                    message: 'This field is required',
                  },
                ]}
              >
                <Select
                  //defaultValue="lucy"
                  placeholder="choose parameter 2"
                  className="basic-single"
                  styles={customTableStyles}
                  mode="multiple"
                  onChange={handleChange}
                  options={options}
                />
              </Form.Item>
            </div>
          </Col>
          <Col md={6}>
            <p className="f-18 grey-accent m-0">Choose Quality Analytics</p>
            <div>
              <Form.Item
                name="district"
                rules={[
                  {
                    required: true,
                    message: 'This field is required',
                  },
                ]}
              >
                <Select
                  //defaultValue="lucy"
                  placeholder="choose parameter 2"
                  className="basic-single"
                  styles={customTableStyles}
                  mode="multiple"
                  onChange={handleChange}
                  options={options}
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
                name="district"
                rules={[
                  {
                    required: true,
                    message: 'This field is required',
                  },
                ]}
              >
                <Select
                  //defaultValue="lucy"
                  placeholder="choose parameter 2"
                  className="basic-single"
                  styles={customTableStyles}
                  mode="multiple"
                  onChange={handleChange}
                  options={options}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>
        {/* Button */}
        <Row className="mb-4 mt-5 d-flex px-4 justify-content-between">
          <div>
            <Button
              style={{
                backgroundColor: "#FF8383",
              }}
              className="footerBtn"
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
              className="footerBtn"
              style={{
                backgroundColor: "#918A8A",
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
              style={{
                backgroundColor: "#D32F2F",
              }}
              onClick={() => {
                handleStepChange("next");
              }}
              className="footerBtn"
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

export default JudgingNew;
