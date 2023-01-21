import React, { useState } from "react";
import Content from "../../layout/content/Content";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  PaginationComponent, Icon, DataTableHead, DataTableRow, DataTableItem, UserAvatar
} from "../../components/Component";
import toast from "react-hot-toast";
import { Data } from "./Data";
import Api from "../../http/masterApis";
import "../style.css";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "react-query";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  Card,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Progress,
  FormGroup,
  ModalBody,
  Modal,
  Label,
  Form,
  Row,
  Col,
  Spinner
} from "reactstrap";

const ChildrenList = () => {
  const { errors, handleSubmit, register, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState("");
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);
  const [stateId, setStateId] = useState(0);
  const [schoolStateId, setSchoolStateId] = useState(0)
  const { data: state_list } = useQuery('getStateList', Api.getStateList);
  const { data: district_list } = useQuery('getDistrictList', Api.getDistrictList);
  const { data: city_list } = useQuery(['getCity'], Api.getCityList);

  const manageMutation = useMutation(Api.manageChildrenEnroll);

  const onSubmit = (data) => {
    const event = row?.id ? `update` : `insert`
    const message = row?.id ? `update` : `created`

    if (row?.id) {
      data.id = row?.id;
    }
    const payload = {
      ...data,
      event: event,
    };

    manageMutation.mutate(payload, {
      onSuccess: (response) => {
        setLoading(false);
        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        toast.success(`Children Enroll ${message} successfully`);
        reset();
      },
    });
  };


  return (
    <Content>
      <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered modal-lg">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {row ? `Update` : `Add`} Children Enrollment
          </h5>
          <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={(e) => { toggle(); setRow(""); }}>
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <Form className="w-100" onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-2">
              <Col md={4}>
                <FormGroup>
                  <label className="form-label" htmlFor="firstname">
                    First Name<span className="text-danger">*</span>
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      placeholder="Enter your First name"
                      ref={register({ required: "This field is required" })}
                      className="form-control-lg form-control"
                    />
                    {errors.firstname && <p className="invalid">{errors.firstname.message}</p>}
                  </div>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <label className="form-label" htmlFor="lastname">
                    Last Name<span className="text-danger">*</span>
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      placeholder="Enter your last name"
                      ref={register({ required: "This field is required" })}
                      className="form-control-lg form-control"
                    />
                    {errors.lastname && <p className="invalid">{errors.lastname.message}</p>}
                  </div>
                </FormGroup>
              </Col>
              <Col md={4}>
                <Label htmlFor="email" className="form-label">
                  Email<span className="text-danger">*</span>
                </Label>
                <div className="form-control-wrap">
                  <input
                    className=" form-control"
                    type="text"
                    name="email"
                    id="email"
                    ref={register({
                      required: "This field is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Enter your email"
                  ></input>
                  {errors.email && <p className="invalid">{errors.email.message}</p>}
                </div>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md={4}>
                <Label htmlFor="Password" className="form-label">
                  Password <span className="text-danger">*</span>
                </Label>
                <div className="form-control-wrap">
                  <input
                    className=" form-control"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    ref={register({ required: "This field is required" })}
                  ></input>
                  {errors.password && <p className="invalid">{errors.password.message}</p>}
                </div>
              </Col>
              <Col md={4}>
                <Label htmlFor="gender" className="form-label">
                  Gender<span className="text-danger">*</span>
                </Label>
                <div className="form-control-wrap">
                  <select
                    className=" form-control"
                    type="select"
                    name="gender"
                    id="gender"
                    ref={register({ required: "This field is required" })}
                  >
                    <option>select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                {errors.gender && <p className="invalid">{errors.gender.message}</p>}

              </Col>
              <Col md={4}>
                <Label htmlFor="phone" className="form-label">
                  Mobile<span className="text-danger">*</span>
                </Label>
                <div className="form-control-wrap">
                  <input
                    className=" form-control"
                    type="text"
                    name="phone"
                    id="phone"
                     placeholder="Enter your mobile"
                    ref={register({
                      required: "Please Enter the Mobile Number",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Invalid Mobile Number",
                      },
                    })}
                  ></input>
                  {errors.phone && <p className="invalid">{errors.phone.message}</p>}
                </div>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={4}>
                <Label htmlFor="father_name" className="form-label">
                  Father Name <span className="text-danger">*</span>
                </Label>
                <div className="form-control-wrap">
                  <input
                    ref={register({ required: "This field is required" })}
                    className="form-control"
                    id="father_name"
                    name="father_name"
                    placeholder="Enter your father name"
                    type="text"
                  />
                </div>
                {errors.father_name && <p className="invalid">{errors.father_name.message}</p>}
              </Col>
              <Col md={4}>
                <Label htmlFor="mother_name" className="form-label">
                  Mother Name <span className="text-danger">*</span>
                </Label>
                <div className="form-control-wrap">
                  <input
                    ref={register({ required: "This field is required" })}
                    className="form-control"
                    id="mother_name"
                    name="mother_name"
                    placeholder="Enter your mother name"
                    type="text"
                  />
                </div>
                {errors.mother_name && <p className="invalid">{errors.mother_name.message}</p>}
              </Col>
              <Col md={4}>
                <Label htmlFor="mother_name" className="form-label">
                  School Name <span className="text-danger">*</span>
                </Label>
                <div className="form-control-wrap">
                  <input
                    ref={register({ required: "This field is required" })}
                    className="form-control"
                    id="school_name"
                    name="school_name"
                    placeholder="Enter your school name"
                    type="text"
                  />
                </div>
                {errors.school_name && <p className="invalid">{errors.school_name.message}</p>}
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={4}>
                <Label htmlFor="dob" className="form-label">
                  Date of Birth<span className="text-danger">*</span>
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    id="dob"
                    name="dob"
                    placeholder="Enter your dob"
                    type="date"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.dob && <p className="invalid">{errors.dob.message}</p>}
                </div>
              </Col>
              <Col md={4}>
                <Label htmlFor="mother_name" className="form-label">
                  Age Proof <span className="text-danger">*</span>
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    id="age_proof"
                    name="age_proof"
                    placeholder="Enter your age proof"
                    type="text"
                    ref={register({ required: "This field is required" })}
                  />
                </div>
                {errors.age_proof && <p className="invalid">{errors.age_proof.message}</p>}
              </Col>
              <Col md={4}>
                <Label htmlFor="pin" className="form-label">
                  Pin <span className="text-danger">*</span>
                </Label>
                <div className="form-control-wrap">
                  <input
                    className=" form-control"
                    type="text"
                    name="pin"
                    id="pin"
                    ref={register({
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Invalid Pin",
                      },
                    })}
                    placeholder="Enter your pin"
                  ></input>
                </div>
                {errors.pin && <p className="invalid">{errors.pin.message}</p>}
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={4}>
                <Label htmlFor="address" className="form-label">
                  Address<span className="text-danger">*</span>
                </Label>
                <div className="form-control-wrap">
                  <textarea
                    className="no-resize form-control"
                    type="textarea"
                    id="default-textarea"
                    name="address"
                    defaultValue="Address"
                    ref={register({ required: "This field is required" })}
                  ></textarea>
                  {errors.address && <p className="invalid">{errors.address.message}</p>}
                </div>
              </Col>
              <Col md={4}>
                <Label htmlFor="school_name" className="form-label">
                  State <span className="text-danger">*</span>
                </Label>
                <div className="form-control-wrap">
                  <select
                    ref={register({ required: "This field is required" })}
                    name="state_name"
                    id="state_name"
                    className="form-select form-select-lg form-control"
                    style={{
                      width: "100%",
                      height: "38px",
                    }}
                    onChange={(ev) => setStateId(ev.target.value)}
                  >
                    <option value="" >Select State</option>
                    {state_list?.data?.map((list, i) => <option key={i} value={list.state_name}>{list.state_name}</option>)}
                  </select>
                </div>
                {errors.state_name && <p className="invalid">{errors.state_name.message}</p>}
              </Col>
              <Col md={4}>
                <Label htmlFor="school_state" className="form-label">
                  City <span className="text-danger">*</span>
                </Label>
                <div className="form-control-wrap">
                  <div className="form-control-select">
                    <select
                      className="form-select form-select-lg form-control"
                      id="city"
                      name="city"
                      ref={register({ required: "This field is required" })}
                    >
                      <option key="-1" value="-1">Select City</option>
                      {city_list?.data?.filter((i) => i.state_name === stateId).map((list, i) => <option key={i} value={list.id}>{list.city_name}</option>)}
                    </select>
                    {errors.city && <p className="invalid">{errors.city.message}</p>}
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={4}>
                <Label htmlFor="school_state" className="form-label">
                  School State <span className="text-danger">*</span>
                </Label>
                <select
                  ref={register({ required: "This field is required" })}
                  {...register('school_state')}
                  name="school_state"
                  id="school_state"
                  className="form-select form-select-lg form-control"
                  style={{
                    width: "100%",
                    height: "38px",
                  }}
                  onChange={(ev) => setSchoolStateId(ev.target.value)}
                >
                  <option value="" >Select School State</option>
                  {state_list?.data?.map((list, i) => <option key={i} value={list.state_name}>{list.state_name}</option>)}
                </select>
                {errors.school_state && <p className="invalid">{errors.school_state.message}</p>}
              </Col>
              <Col md={4}>
                <Label htmlFor="school_district" className="form-label">
                  School District <span className="text-danger">*</span>
                </Label>
                <select
                  ref={register({ required: "This field is required" })}
                  {...register('school_district')}
                  name="school_district"
                  id="school_district"
                  className="form-select form-select-lg form-control"
                  style={{
                    width: "100%",
                    height: "38px",
                  }}
                >
                  <option value="" >Select School District</option>
                  {district_list?.data?.filter((i) => i.state_name === schoolStateId).map((list, i) => <option key={i} value={list.id}>{list.district_name}</option>)}
                </select>
                {errors.school_district && <p className="invalid">{errors.school_district.message}</p>}
              </Col>
              <Col md={4}>
                <Label htmlFor="country" className="form-label">
                  Country <span className="text-danger">*</span>
                </Label>
                <div className="form-control-wrap">
                  <input
                    ref={register({ required: "This field is required" })}
                    className="form-control"
                    id="country"
                    name="country"
                    placeholder="Enter your country"
                    type="text"
                  />
                  {errors.country && <p className="invalid">{errors.country.message}</p>}
                </div>
              </Col>
            </Row>
            <FormGroup className="col-md-5">
              <Button type="submit" color="primary" size="lg" className="btn-block" bgColor={"#D32F2F"}>
                {row?.id ? `Update` : `Save`}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      <div >
        <div className="card-title-group">
          <div className="card-title">
            <h6 className="title">Children Enrollment</h6>
          </div>
        </div>
        <BlockHead size="sm">
          <BlockBetween className="move-right">
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <a href="#" className="btn btn-danger" onClick={(e) => { toggle(); setRow(""); }}>
                    Add Children
                  </a>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
      </div>
      <Card className="card-full">




        <div className="nk-tb-list mt-n2">
          <DataTableHead>
            <DataTableRow>
              <span>SI No.</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span>Student Name</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span>Class </span>
            </DataTableRow>
            <DataTableRow size="md">
              <span>Section </span>
            </DataTableRow>
            <DataTableRow size="md">
              <span>House </span>
            </DataTableRow>
            <DataTableRow size="md">
              <span>Student id </span>
            </DataTableRow>
            <DataTableRow size="md">
              <span>Stream</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span>DOB</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span>Email</span>
            </DataTableRow>

            <DataTableRow size="md">
              <span>Mobile</span>
            </DataTableRow>
            <DataTableRow>
              <span className="d-none d-sm-inline">Status</span>
            </DataTableRow>
            <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {Data.map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow>
                <span className="tb-lead">
                  <a href="#order" onClick={(ev) => ev.preventDefault()}>
                    {idx}
                  </a>
                </span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="tb-lead">{item.name}</span>
              </DataTableRow>

              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {item.class_id}
                </span>
              </DataTableRow>

              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {item.section}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {item.house}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {item.id}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {item.stream}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {item.dob}
                </span>
              </DataTableRow>

              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {item.email_id}
                </span>
              </DataTableRow>

              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {item.mobile}
                </span>
              </DataTableRow>

              <DataTableRow>
                <span
                  className={`badge badge-dot badge-dot-xs badge-${item.status === "Paid" ? "success" : item.status === "Due" ? "warning" : "danger"
                    }`}
                >
                  {item.status}
                </span>
              </DataTableRow>
              <DataTableRow className="">
                <FiEdit color="green" />
                <FiTrash2 className="ml-2" color="#d32f2f" />
              </DataTableRow>
            </DataTableItem>
          ))}
        </div>
      </Card>
    </Content >
  );
};
export default ChildrenList;
