import React from "react";
import { Row, Button, FormGroup, Label, Input } from "reactstrap";
import { RiArrowLeftSLine } from "react-icons/ri";
import Rocket from "../../assets/icons/rocket.svg";

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

const options = [
  { value: "chocolate", label: "Contest short Name 1 --   Date of creation --  Contest Type" },
  { value: "strawberry", label: "Contest short Name 1 --   Date of creation --  Contest Type" },
  { value: "vanilla", label: "Contest short Name 1 --   Date of creation --  Contest Type" },
];

const Terms = ({ handleStepChange }) => {
  return (
    <>
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
          Terms &#38; Conditions
        </h1>
      </Row>
      <hr
        style={{
          width: "100%",
          color: "#707070",
          opacity: "0.2",
        }}
      />
      <Row className="py-2 px-4">
        <h4 className="f-18 grey-accent">Write T&C</h4>
        <Input
          type="textarea"
          name="text"
          id="exampleText"
          style={{
            backgroundColor: "#f6f6f6",
          }}
          rows="20"
          placeholder="Text Editor for T&C"
        />
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
            <img src={Rocket} height="22" alt="" className="mr-2" />
            Launch Contest
          </Button>
        </div>
      </Row>
    </>
  );
};

export default Terms;
