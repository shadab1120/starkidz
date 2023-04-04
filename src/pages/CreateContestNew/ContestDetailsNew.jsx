import { useEffect, useState, Fragment } from "react";
import { Row, Col, FormGroup, Label } from "reactstrap";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import {
  CheckCircleFilled,
  CheckSquareOutlined,
  CloseSquareOutlined,
  DownOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Input, Button, Form, Select, Upload, Checkbox } from "antd";
import { setContestDetails } from "../../store/CreateContestSlice";
import Api from "../../http/ContestApi";
import mApi from "../../http/masterApis";
import "./styles/ContestDetailsNew.css";

const customStyles = {
  control: (base, state) => ({
    ...base,
    width: "80%",
    borderRadius: "10px",
    height: "40px",
    minHeight: "40px",
    padding: "0 10px",
    textAllign: "center",
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
    width: "80%",
  }),
};

const customeSelect = () => {
  return (
    <>
      <Select.Option value="1">1</Select.Option>
      <Select.Option value="2">2</Select.Option>
    </>
  );
};

const ContestDetailsNew = ({ handleStepChange }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [imageData, setImageData] = useState({});

  const [form] = Form.useForm();

  const { id } = params;

  const { data: contest_list } = useQuery("getContestList", Api.getContestList);
  const { data: age_bracket_list } = useQuery("getAgeBracketsList", mApi.getAgeBracketsList);
  const { data: contest_category_type } = useQuery("getContestTypeList", mApi.getContestTypeList);

  // const prizeLevel = [
  //   { label: "Country Level", id: 1, type: "Prize for Country", name: "country_level" },
  //   { label: "State Level", id: 2, type: "Prize for State", name: "state_level" },
  //   { label: "District Level", id: 3, type: "Prize for District", name: "district_level" },
  //   { label: "City Level", id: 4, type: "Prize for City", name: "city_level" },
  //   { label: "School Level", id: 5, type: "Prize for School", name: "school_level" },
  // ];

  const options = contest_list?.data?.map((c) => {
    return { value: c.id, label: c.about_contest?.substr(0, 50) };
  });
  const ageOptionsList = age_bracket_list?.data?.map((c) => {
    return { value: c.id, label: `${c.age_from} - ${c.age_to}` };
  });

  const contest_category_options = contest_category_type?.data?.map((c) => {
    return { value: c.id, label: c.contest_type_name?.substr(0, 50) };
  });

  const props = {
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log("uploading", info?.file?.originFileObj, "====", info.file, info.fileList);
        setImageData(info?.file?.originFileObj);
      }
      if (info.file.status === "done") {
        console.log("done", info.file, info.fileList);
        //message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        console.log("error", info.file, info.fileList);
        //message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = async (data) => {
    const event = id ? `update` : `insert`;
    const payload = {
      ...data,
      event: event,
      contest_image: imageData,
    };

    console.log("payload", payload);
    dispatch(setContestDetails(payload));
    handleStepChange("next");
  };

  return (
    <>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" id="contestdetails">
        <Row>
          <Col md={12} className="d-flex copyBox">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="43" viewBox="0 0 36 43">
              <g id="Group_345" data-name="Group 345" transform="translate(-549 -216)">
                <g
                  id="Rectangle_832"
                  data-name="Rectangle 832"
                  transform="translate(549 216)"
                  fill="#fff"
                  stroke="#707070"
                  strokeWidth="1"
                >
                  <rect width="29" height="35" rx="9" stroke="none" />
                  <rect x="0.5" y="0.5" width="28" height="34" rx="8.5" fill="none" />
                </g>
                <g
                  id="Rectangle_833"
                  data-name="Rectangle 833"
                  transform="translate(556 224)"
                  fill="#fff"
                  stroke="#707070"
                  strokeWidth="1"
                >
                  <rect width="29" height="35" rx="9" stroke="none" />
                  <rect x="0.5" y="0.5" width="28" height="34" rx="8.5" fill="none" />
                </g>
              </g>
            </svg>
            <div
              style={{
                width: "100%",
              }}
            >
              <h4
                style={{
                  color: "#707070",
                  fontSize: "16px",
                  fontWeight: "normal",
                }}
              >
                Copy From Existing
              </h4>
              <Form.Item
                name="contest_type"
                style={{
                  width: "50%",
                  height: "40px",
                  marginBottom: "0px",
                }}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Select
                  placeholder="Contest Type"
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                  onChange={handleChange}
                >
                  {[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "Yiminghe",
                      label: "yiminghe",
                    },
                  ]?.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      <span className="type_option">{option.label}</span>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </Col>
          <hr
            style={{
              width: "100%",
              color: "#707070",
              opacity: "0.2",
            }}
          />
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <Col md={12}>
            <Row>
              <Col md={7}>
                <FormGroup>
                  <Label>Create New Contest</Label>
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
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label>Contest short name (character max limit 20)</Label>
                  <Form.Item
                    name="contest_short_name"
                    rules={[
                      {
                        required: true,
                        message: "This field is required",
                      },
                    ]}
                  >
                    <Input placeholder="Contest short name" className="p-2" />
                  </Form.Item>
                </FormGroup>
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col md={3}>
                <FormGroup
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Label>Contest Image</Label>
                  {/* <Input type="file" name="contest_image" hidden /> */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <img
                      src="https://www.w3schools.com/howto/img_avatar.png"
                      style={{ width: "200px", height: "200px", borderRadius: "30px" }}
                      alt="contest"
                      lazy="loading"
                    ></img>
                    <Upload {...props}>
                      <Button
                        style={{
                          width: "180px",
                          height: "45px",
                          marginTop: "10px",
                          marginLeft: "8px",
                          borderRadius: "8px",
                          backgroundColor: "#FFFFFF",
                          color: "#7A7A7A",
                          fontSize: "18px",
                          border: "1px solid #707070",
                        }}
                        className="shadow"
                        icon={<UploadOutlined />}
                      >
                        Click to Upload
                      </Button>
                    </Upload>

                    {/* <Input
                      // {...register("contest_image", { required: `This field is required` })}
                      type="file"
                      style={{
                        width: "180px",
                        height: "45px",
                        marginTop: "10px",
                        marginLeft: "8px",
                        borderRadius: "8px",
                        backgroundColor: "#FFFFFF",
                        color: "#7A7A7A",
                        fontSize: "18px",
                        border: "1px solid #707070",
                      }}
                      className="shadow"
                    >
                      Add Image
                    </Input> */}
                  </div>
                </FormGroup>
              </Col>
              <Col md={9}>
                <Row
                  style={{
                    gap: "20px",
                  }}
                >
                  <Col md={12}>
                    <FormGroup>
                      <Label>Age brackets</Label>
                      <Form.Item
                        name="age_bracket"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Age Brackets"
                          className="basic-single"
                          mode="multiple"
                          style={{
                            width: "100%",
                          }}
                          styles={customStyles}
                          onChange={handleChange}
                          menuItemSelectedIcon={
                            <CheckSquareOutlined
                              style={{
                                color: "#d32f2f",
                              }}
                            />
                          }
                        >
                          {[
                            {
                              value: "jack",
                              label: "Jack",
                            },
                            {
                              value: "lucy",
                              label: "Lucy",
                            },
                            {
                              value: "Yiminghe",
                              label: "yiminghe",
                            },
                          ]?.map((option) => (
                            <Select.Option key={option.value} value={option.value}>
                              <span className="type_option">{option.label}</span>
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label>Contest type</Label>
                      <Form.Item
                        name="contest_type_2"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Select
                          mode="multiple"
                          placeholder="Contest Type"
                          className="basic-single"
                          style={{
                            width: "100%",
                          }}
                          onChange={handleChange}
                          menuItemSelectedIcon={
                            <CheckSquareOutlined
                              style={{
                                color: "#d32f2f",
                              }}
                            />
                          }
                          removeIcon={<CloseSquareOutlined style={{ color: "#d32f2f" }} />}
                          // options={contest_category_options}
                        >
                          {[
                            {
                              value: "jack",
                              label: "Jack",
                            },
                            {
                              value: "lucy",
                              label: "Lucy",
                            },
                            {
                              value: "Yiminghe",
                              label: "yiminghe",
                            },
                          ]?.map((option) => (
                            <Select.Option key={option.value} value={option.value}>
                              <span className="type_option">{option.label}</span>
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      {/* <Select
                        options={contest_category_options}
                        className="basic-single"
                        isMulti
                        // {...register("contest_category", { required: `This field is required` })}
                        placeholder="Enter Contest Name"
                      ></Select> */}
                    </FormGroup>
                  </Col>
                  {/* <Col md={12}>
                    <FormGroup>
                      <Label>Type of entry</Label>
                      <div>
                        <Controller
                          name="entries"
                          control={control}
                          rules={{ required: "This is required" }}
                          render={(props) => {
                            return (
                              <MultiSelect
                                name="entries"
                                display="chip"
                                options={[
                                  {
                                    value: "images",
                                    label: "Images",
                                  },
                                  {
                                    value: "videos",
                                    label: "Videos",
                                  },
                                ]}
                                style={{
                                  width: "100%",
                                  borderRadius: "10px",
                                  height: "40px",
                                  backgroundColor: "#F6F6F6",
                                }}
                                optionLabel="label"
                                placeholder="select the multiple type of entries"
                                maxSelectedLabels={3}
                                value={props.value}
                                onChange={(e) => {
                                  props.onChange(e.value);
                                }}
                              />
                            );
                          }}
                        />
                      </div>
                    </FormGroup>
                  </Col> */}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col
            md={12}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
              margin: "50px -8px",
              gap: "20px",
            }}
          >
            <Button
              ype="primary"
              htmlType="submit"
              className="d-flex align-center justify-content-center text-white"
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
              <span className="f-20">Save Draft</span>
            </Button>
            <Button
              htmlType="submit"
              className="d-flex align-center justify-content-center text-white"
              style={{
                backgroundColor: "#D32F2F",
                height: "40px",
              }}
              onClick={() => {
                handleStepChange("next");
              }}
            >
              <span className="f-20">Next</span>
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
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ContestDetailsNew;
