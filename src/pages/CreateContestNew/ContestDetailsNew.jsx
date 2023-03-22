import { Row, Col, FormGroup, Button, Label, Input } from "reactstrap";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { MultiSelect } from "primereact/multiselect";

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

const ContestDetailsNew = ({ handleStepChange }) => {
  const defaultValues = {
    entries: null,
  };
  const { control, setValue } = useForm({ defaultValues });
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
            <Select
              options={options}
              className="basic-single"
              styles={customStyles}
              placeholder="Enter Contest Name"
            ></Select>
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
          <form>
            <Row>
              <Col md={7}>
                <FormGroup>
                  <Label>Create New Contest</Label>
                  <Input className="input-box" placeholder="Enter Contest Name" />
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label>Contest short name (character max limit 20)</Label>
                  <Input className="input-box" placeholder="enter contest name for certification" />
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
                  <Input type="file" name="contest_image" hidden />
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
                    >
                      Add Image
                    </Button>
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
                      <Input className="input-box" placeholder="enter contest name for certification" />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label>Contest type</Label>
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
                        placeholder="Enter Contest Name"
                      ></Select>
                    </FormGroup>
                  </Col>
                  <Col md={12}>
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
                  </Col>
                </Row>
              </Col>
            </Row>
          </form>
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
            className="footerBtn"
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
        </Col>
      </Row>
    </>
  );
};

export default ContestDetailsNew;
