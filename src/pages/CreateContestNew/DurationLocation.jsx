import React from "react";
import { Row, Col, Container, FormGroup, Label, Input, Button } from "reactstrap";
import Select from "react-select";
import "./styles/DurationLocation.css";
import { RiArrowLeftSLine } from "react-icons/ri";

const DurationLocation = ({ handleStepChange }) => {
  const options = [
    { value: "chocolate", label: "Contest short Name 1 --   Date of creation --  Contest Type" },
    { value: "strawberry", label: "Contest short Name 1 --   Date of creation --  Contest Type" },
    { value: "vanilla", label: "Contest short Name 1 --   Date of creation --  Contest Type" },
  ];

  return (
    <>
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
        <form>
          <Row>
            <Col md={5} className="d-flex flex-column">
              <div
                className="px-2 d-flex flex-column"
                style={{
                  outline: "1px solid #FF3333",
                  borderRadius: "25px",
                  paddingBottom: "3em",
                  paddingTop: "1em",
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
                    <input type="date" name="" id="" className="form-control" />
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
                    <input type="date" name="" id="" className="form-control" />
                  </div>
                </div>
              </div>
              <FormGroup className="mt-3">
                <Label>Select State</Label>
                <Select
                  options={options}
                  className="basic-single"
                  isMulti
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      width: "100%",
                      borderRadius: "10px",
                      height: "40px",
                      minHeight: "40px",
                      padding: "0 10px",
                      textAllign: "center",
                      backgroundColor: "#F6F6F6",
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
                    }),
                  }}
                  placeholder="Select State"
                ></Select>
              </FormGroup>
            </Col>
            <Col md={7} className="d-flex flex-column">
              <FormGroup className="">
                <Label>Result Out Date</Label>
                <Input
                  type="date"
                  name="date"
                  id="exampleDate"
                  style={{
                    backgroundColor: "#F6F6F6",
                    borderRadius: "10px",
                    height: "40px",
                  }}
                />
              </FormGroup>
              <FormGroup className="">
                <Label>Content Manager</Label>
                <Select
                  options={options}
                  className="basic-single"
                  isMulti
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      width: "100%",
                      borderRadius: "10px",
                      height: "40px",
                      minHeight: "40px",
                      padding: "0 10px",
                      textAllign: "center",
                      backgroundColor: "#F6F6F6",
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
                    }),
                  }}
                  placeholder="Select State"
                ></Select>
              </FormGroup>
              <FormGroup className="">
                <Label>Select District</Label>
                <Select
                  options={options}
                  className="basic-single"
                  isMulti
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      width: "100%",
                      borderRadius: "10px",
                      height: "40px",
                      minHeight: "40px",
                      padding: "0 10px",
                      textAllign: "center",
                      backgroundColor: "#F6F6F6",
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
                    }),
                  }}
                  placeholder="Select State"
                ></Select>
              </FormGroup>
            </Col>
          </Row>
        </form>

        {Array.from({ length: 2 }).map((item, index) => {
          return (
            <Row className="mt-3 districtlist_section">
              <Col md={12} className="d-flex justify-content-between">
                <div>
                  <span>Assam</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-2" width="23" height="22" viewBox="0 0 23 22">
                    <g id="Cross_button" data-name="Cross button" transform="translate(-309 -500)">
                      <g
                        id="Ellipse_73"
                        data-name="Ellipse 73"
                        transform="translate(309 500)"
                        fill="#d32f2f"
                        stroke="#707070"
                        stroke-width="1"
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
                        stroke-width="1"
                      />
                      <line
                        id="Line_21"
                        data-name="Line 21"
                        y1="10"
                        x2="11"
                        transform="translate(315.5 506.5)"
                        fill="none"
                        stroke="#fff"
                        stroke-width="1"
                      />
                    </g>
                  </svg>
                </div>
                <div
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
                {Array.from({ length: 5 }).map((item, index) => {
                  return (
                    <div
                      className="d-flex align-center"
                      style={{
                        gap: ".6rem",
                      }}
                    >
                      <Button
                        style={{
                          backgroundColor: "#D32F2F",
                          borderRadius: "21px",
                          border: "none",
                          padding: "0.5rem 1rem",
                          width: "90%",
                          fontStyle: "italic",
                          whiteSpace: "nowrap",
                        }}
                      >
                        display result
                        <input type="checkbox" name="" id="" className="mx-2" />
                      </Button>
                    </div>
                  );
                })}
              </Col>
            </Row>
          );
        })}
      </Container>

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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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
    </>
  );
};

export default DurationLocation;
