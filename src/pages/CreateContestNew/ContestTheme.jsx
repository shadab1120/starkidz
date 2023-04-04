import { useEffect, useState, Fragment } from "react";
import { Row, Col, FormGroup, Button, Label, Input, Form } from "reactstrap";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { setContestDetails } from "../../store/CreateContestSlice";
import Api from "../../http/ContestApi";
import mApi from "../../http/masterApis";
import DeleteIcon from "./delete-icon.svg";
import "./styles/createTheme.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiArrowLeftSLine } from "react-icons/ri";

const customStyles = {
  control: (base, state) => ({
    ...base,
    width: "100%",
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

    // change background color if the option is active
    backgroundColor: state.isFocused ? "#DBD7D7" : "#fff",
  }),
};

const ContestTheme = ({ handleStepChange }) => {
  const prizeLevel = [
    { label: "Country Level", id: 1, type: "Prize for Country", name: "country_level" },
    { label: "State Level", id: 2, type: "Prize for State", name: "state_level" },
    { label: "District Level", id: 3, type: "Prize for District", name: "district_level" },
    { label: "City Level", id: 4, type: "Prize for City", name: "city_level" },
    { label: "School Level", id: 5, type: "Prize for School", name: "school_level" },
  ];

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
          Contest Theme
        </h4>
        <Col md={12} className="d-flex flex-column align-center">
          <div
            style={{
              width: "60%",
            }}
          >
            <h4
              style={{
                color: "#707070",
                fontSize: "16px",
                fontWeight: "normal",
              }}
            >
              Copy From Previous Contest Theme
            </h4>
            <Select
              options={options}
              className="basic-single"
              styles={customStyles}
              placeholder="Enter Contest Name"
            ></Select>
          </div>
        </Col>
      </Row>
      <hr
        style={{
          width: "100%",
          color: "#707070",
          opacity: "0.2",
        }}
      />
      {Array(3)
        .fill(0)
        .map((item, index) => (
          <Fragment key={index}>
            <Row
              style={{
                width: "100%",
                padding: "0 2rem 2rem 2rem",
              }}
            >
              <Col md={12} className="">
                <span className="mx-2">Theme 1</span>
                <img src={DeleteIcon} alt="" width={20} height={20} />
              </Col>
              <Row className="w-100 mt-4">
                {Array(3)
                  .fill(0)
                  .map((item, index) => (
                    <Col md={4} lg={4} className="d-flex flex-column" key={index}>
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
                          }}
                        >
                          Theme for {index + 1} + {index + 2} + {index + 3}
                        </Button>
                        <input type="checkbox" name="" id="" />
                      </div>
                      <input type="text" className="mt-3 themeText form-control" placeholder="Type in Theme" />
                    </Col>
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
          </Fragment>
        ))}
      <Row className="mb-4 ">
        <Col md={12} className="d-flex justify-content-center">
          <Button
            style={{
              backgroundColor: "#A15353",
              borderRadius: "9px",
              border: "none",
              padding: "0.5rem 1rem",
            }}
          >
            <AiOutlinePlusCircle size={20} color="#fff" />
            Add More Theme
          </Button>
        </Col>
      </Row>
      <Row className="mb-4 d-flex px-4 justify-content-between">
        <div>
          <Button
            style={{
              backgroundColor: "#FF8383",
            }}
            className="d-flex align-center justify-content-center text-white"
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
            Save Draft
          </Button>
          <Button
            onClick={() => {
              handleStepChange("next");
            }}
            className="d-flex align-center justify-content-center text-white"
            style={{
              backgroundColor: "#D32F2F",
              height: "40px",
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
    </>
  );
};

export default ContestTheme;
