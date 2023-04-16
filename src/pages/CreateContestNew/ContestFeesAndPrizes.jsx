import React, { useEffect, useState } from "react";
import { Row, Card, Col, Table } from "reactstrap";
import { RiArrowLeftSLine } from "react-icons/ri";
import CopyIcon from "../../assets/icons/copy.svg";
import PlusIcon from "../../assets/icons/plus.svg";
import Checked from "../../assets/icons/checked.svg";
import Rocket from "../../assets/icons/rocket.svg";
import { Button, Form, Select, Input } from "antd";
import Trophy from "../../assets/icons/gold-winner-trophy-icon.svg";
import Api from "../../http/masterApis";
import "./styles/ContestFeesAndPrizes.css";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setContestDetails } from "../../store/CreateContestSlice";
import toast, { Toaster } from "react-hot-toast";
import mApi from "../../http/ContestApi";

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

const ContestFeesAndPrizes = ({ handleStepChange }) => {

  const params = useParams();
  const dispatch = useDispatch();
  const { id } = params;
  const [form] = Form.useForm();
  const contestDetails = useSelector((state) => state.contest);
  const manageMutation = useMutation(mApi.manageContest);

  const [prize, setPrize] = useState([]);
  const { age_bracket } = contestDetails;
  const { data: prize_list } = useQuery('getPrizeList', Api.getPrizeList);
  const [prizeLabel, setPrizeLabel] = useState([]);
  const [counterCounty, setCounterCountry] = useState(0)
  const [counterState, setCounterState] = useState(0)
  const [counterCity, setCounterCity] = useState(0)
  const [counterSchool, setCounterSchool] = useState(0)

  useEffect(() => {
    let { prize } = contestDetails;
    console.log('contestDetails', contestDetails)
    form.setFieldsValue({
      prize,

    });

  }, [contestDetails, form])


  const prizeOption = prize_list?.data?.map((c) => {
    return { value: c.id, label: c.prize_name };
  });

  const handleClick = (type) => {
    if (type === "Country level") {
      if (counterCounty < 1) {
        setCounterCountry(counterCounty + 1)
      }

    } else if (type === "State level") {
      if (counterState < 1) {
        setCounterState(counterState + 1)
      }
    } else if (type === "City level") {
      if (counterCity < 1) {
        setCounterCity(counterCity + 1)
      }
    } else if (type === "School level") {
      if (counterSchool < 1) {
        setCounterSchool(counterSchool + 1)
      }
    }

  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleNext = async () => {
    const event = id ? `update` : `insert`;
    let { judging_parameter, level_judging, qa, qa_form, select_judge_form } = form.getFieldsValue();
    let fe_data = form.getFieldsValue();


    const payload = {
      ...contestDetails,
      event: event,
      judging_parameter,
      level_judging,
      qa,
      qa_form,
      select_judge_form,
      contest_prizes: fe_data

    }
    console.log('payload', payload)
    dispatch(setContestDetails(payload));
    // handleStepChange("next");
  };


  const onFinish = async (data) => {

    const message = id ? `update` : `created`
    const event = id ? `update` : `insert`;
    const { contest_type, age_bracket, contest_type_2, contest_name, contest_short_name, contest_theme,
      district, state, contest_manager, start_date, contest_end_date, result_date, judge_level_data,
      judging_parameter, level_judging, qa, qa_form, select_judge_form } = contestDetails;

    let fe_data = form.getFieldsValue();

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
    formData.append('contest_prizes',fe_data);
    formData.append('prize', prize);

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
            {age_bracket?.map((item, index) => (
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
                      Fee for {item}
                    </Button>
                    <div className="mx-1 text-center">
                      <span className="f-9 text-nowrap">copy to all</span>
                      <img src={CopyIcon} alt="" />
                    </div>
                  </div>

                  <div className="mt-2 text-center w-100 total-score py-1">
                    <Form.Item
                      className="form-control input-fees "
                      name={`contest_fee_${index}`}
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
                    onChange={(value, index) => { setPrizeLabel(index); setPrize(value) }}
                    options={prizeOption}
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
                        onClick={(e) => handleClick(item[index])}
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
        {counterCounty > 0 &&
          <Row className="table-parameter p-2 mx-2 my-3">
            Prizes for Country
            <div
              className="w-100"
              style={{
                height: "190px",
                overflowY: "scroll",
              }}
            >
              <Table borderless>
                <thead>
                  <tr>
                    <th>Age / Prizes	</th>
                    {prizeLabel.map((item, index) => {
                      return <th className="vertical-align-middle" colSpan={prizeLabel.length}>
                        <span>{item.label}</span>
                      </th>
                    })}
                  </tr>
                </thead>
                <tbody>
                  {age_bracket?.map((item, index) => (<tr>
                    <th scope="row" className="f-14 vertical-align-middle">
                      {item.replace("-", " to ")}
                    </th>
                    {
                      prizeLabel?.map((label) => {
                        return <>
                          <td>
                            <Form.Item
                              name={`contest_prizes_district_name_${index}`}
                              rules={[
                                {
                                  required: true,
                                  message: "This field is required",
                                },
                              ]}

                            >
                              <Input placeholder="Name" className="p-2" />
                            </Form.Item>
                          </td>
                          <td>
                            <Form.Item
                              name={`contest_prizes_district_qty_${index}`}
                              rules={[
                                {
                                  required: true,
                                  message: "This field is required",
                                },
                              ]}

                            >
                              <Input placeholder="Qty" className="p-2" />
                            </Form.Item>
                          </td>
                          <td>
                            <Form.Item
                              name={`contest_prizes_district_item_${index}`}
                              rules={[
                                {
                                  required: true,
                                  message: "This field is required",
                                },
                              ]}

                            >
                              <Input placeholder="Item" className="p-2" />
                            </Form.Item>
                          </td></>
                      })
                    }

                  </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Row>
        }
        {counterState > 0 &&
          <Row className="table-parameter p-2 mx-2 my-3">
            Prizes for State

            <div
              className="w-100"
              style={{
                height: "190px",
                overflowY: "scroll",
              }}
            >
              <Table borderless>
                <thead>
                  <tr>
                    <th>Age / Prizes	</th>
                    {prizeLabel.map((item) => {
                      return <th className="vertical-align-middle" colSpan={prizeLabel.length}>
                        <span>{item.label}</span>
                      </th>
                    })}
                  </tr>
                </thead>
                <tbody>
                  {age_bracket?.map((item, l) => (<tr>
                    <th scope="row" className="f-14 vertical-align-middle">
                      {item.replace("-", " to ")}
                    </th>
                    {
                      prizeLabel?.map((label, index) => {
                        return <>
                          <td>
                            <Form.Item
                              name={`contest_prizes_state_name_${l}`}
                              rules={[
                                {
                                  required: true,
                                  message: "This field is required",
                                },
                              ]}

                            >
                              <Input placeholder="Name" className="p-2" />
                            </Form.Item>
                          </td>
                          <td>
                            <Form.Item
                              name={`contest_prizes_state_qty_${l}`}
                              rules={[
                                {
                                  required: true,
                                  message: "This field is required",
                                },
                              ]}

                            >
                              <Input placeholder="Qty" className="p-2" />
                            </Form.Item>
                          </td>
                          <td>
                            <Form.Item
                              name={`contest_prizes_state_item_${l}`}
                              rules={[
                                {
                                  required: true,
                                  message: "This field is required",
                                },
                              ]}

                            >
                              <Input placeholder="Item" className="p-2" />
                            </Form.Item>
                          </td></>
                      })
                    }

                  </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Row>
        }
        {counterCity > 0 &&
          <Row className="table-parameter p-2 mx-2 my-3">
            Prizes for City

            <div
              className="w-100"
              style={{
                height: "190px",
                overflowY: "scroll",
              }}
            >
              <Table borderless>
                <thead>
                  <tr>
                    <th>Age / Prizes	</th>
                    {prizeLabel.map((item) => {
                      return <th className="vertical-align-middle" colSpan={prizeLabel.length}>
                        <span>{item.label}</span>
                      </th>
                    })}
                  </tr>
                </thead>
                <tbody>
                  {age_bracket?.map((item, index) => (<tr>
                    <th scope="row" className="f-14 vertical-align-middle">
                      {item.replace("-", " to ")}
                    </th>
                    {
                      prizeLabel?.map((label) => {
                        return <>
                          <td>
                            <Form.Item
                              name={`contest_prize_city_name_${index}`}
                              rules={[
                                {
                                  required: true,
                                  message: "This field is required",
                                },
                              ]}

                            >
                              <Input placeholder="Name" className="p-2" />
                            </Form.Item>
                          </td>
                          <td>
                            <Form.Item
                              name={`contest_prize_city_qty_${index}`}
                              rules={[
                                {
                                  required: true,
                                  message: "This field is required",
                                },
                              ]}

                            >
                              <Input placeholder="Qty" className="p-2" />
                            </Form.Item>
                          </td>
                          <td>
                            <Form.Item
                              name={`contest_prize_city_item_${index}`}
                              rules={[
                                {
                                  required: true,
                                  message: "This field is required",
                                },
                              ]}

                            >
                              <Input placeholder="Item" className="p-2" />
                            </Form.Item>
                          </td></>
                      })
                    }

                  </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Row>
        }
        {counterSchool > 0 &&
          <Row className="table-parameter p-2 mx-2 my-3">
            Prizes for School

            <div
              className="w-100"
              style={{
                height: "190px",
                overflowY: "scroll",
              }}
            >
              <Table borderless>
                <thead>
                  <tr>
                    <th>Age / Prizes	</th>
                    {prizeLabel.map((item) => {
                      return <th className="vertical-align-middle" colSpan={prizeLabel.length}>
                        <span>{item.label}</span>
                      </th>
                    })}
                  </tr>
                </thead>
                <tbody>
                  {age_bracket?.map((item, index) => (<tr>
                    <th scope="row" className="f-14 vertical-align-middle">
                      {item.replace("-", " to ")}
                    </th>
                    {
                      prizeLabel?.map((label) => {
                        return <>
                          <td>
                            <Form.Item
                              name={`contest_prize_school_name_${index}`}
                              rules={[
                                {
                                  required: true,
                                  message: "This field is required",
                                },
                              ]}

                            >
                              <Input placeholder="Name" className="p-2" />
                            </Form.Item>
                          </td>
                          <td>
                            <Form.Item
                              name={`contest_prize_school_qty_${index}`}
                              rules={[
                                {
                                  required: true,
                                  message: "This field is required",
                                },
                              ]}

                            >
                              <Input placeholder="Qty" className="p-2" />
                            </Form.Item>
                          </td>
                          <td>
                            <Form.Item
                              name={`contest_prize_school_item_${index}`}
                              rules={[
                                {
                                  required: true,
                                  message: "This field is required",
                                },
                              ]}

                            >
                              <Input placeholder="Item" className="p-2" />
                            </Form.Item>
                          </td></>
                      })
                    }

                  </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Row>
        }
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

export default ContestFeesAndPrizes;
