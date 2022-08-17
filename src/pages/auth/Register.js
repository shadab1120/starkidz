import React, { useState } from "react";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import { Spinner, FormGroup, Row, Col, Label } from "reactstrap";
import LoginPageContainer from "../../layout/page-container/LoginPageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import api from "../../http/api";
import toast, { Toaster } from "react-hot-toast";
import "./css.css";
const Register = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const histor = useHistory();
  const mutation = useMutation(api.registerUser, {
    onSuccess: ({ data }) => {
      toast.success("Registration Successful");
      setLoading(false);
      histor.push("/login");
    },
  });

  const handleFormSubmit = (formData) => {
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    mutation.mutate({
      ...formData,
    });
  };

  return (
    <React.Fragment>
      <Head title="Register" />
      <LoginPageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xl">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>
          <PreviewCard className="card-bordered">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Register</BlockTitle>
                <BlockDes>
                  <p>The Star Kidz Registration</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
              <Row>
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
                        ref={register({ required: true })}
                        className="form-control-lg form-control"
                      />
                      {errors.firstname && <p className="invalid">This field is required</p>}
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
                        ref={register({ required: true })}
                        className="form-control-lg form-control"
                      />
                      {errors.lastname && <p className="invalid">This field is required</p>}
                    </div>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <Label htmlFor="gender" className="form-label">
                    Gender<span className="text-danger">*</span>
                  </Label>
                  <div className="form-control-wrap">
                    <div className="form-control-select">
                      <select
                        className=" form-control"
                        type="select"
                        name="gender"
                        id="gender"
                        ref={register({ required: true })}
                      >
                        <option value="">select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      {errors.gender && <p className="invalid">This field is required</p>}
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={8}>
                  <label className="form-label" htmlFor="Fname">
                    Address
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Enter your Address"
                      className="form-control-lg form-control"
                    />
                  </div>
                </Col>
                <Col md={4}>
                  <Label htmlFor="dob" className="form-label">
                    Date of Birth<span className="text-danger">*</span>
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      id="dob"
                      name="dob"
                      placeholder="date placeholder"
                      type="date"
                      ref={register({ required: true })}
                    />
                    {errors.dob && <p className="invalid">This field is required</p>}
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Label htmlFor="father_name" className="form-label">
                    Father Name
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      id="father_name"
                      name="father_name"
                      placeholder="Enter your father name"
                      type="text"
                    />
                  </div>
                </Col>
                <Col md={4}>
                  <Label htmlFor="mother_name" className="form-label">
                    Mother Name
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      id="mother_name"
                      name="mother_name"
                      placeholder="Enter your mother name"
                      type="text"
                    />
                  </div>
                </Col>
                <Col md={4}>
                  <Label htmlFor="state" className="form-label">
                    State
                  </Label>
                  <div className="form-control-wrap">
                    <div className="form-control-select">
                      <select className=" form-control" type="select" name="state" id="state">
                        <option value="">select State</option>
                        <option value="male">Delhi</option>
                      </select>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Label htmlFor="city" className="form-label">
                    City
                  </Label>
                  <div className="form-control-wrap">
                    <div className="form-control-select">
                      <select className=" form-control" type="select" name="city" id="city">
                        <option value="">select State</option>
                        <option value="male">New Delhi</option>
                      </select>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <Label htmlFor="email" className="form-label">
                    Parents Email<span className="text-danger">*</span>
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      className=" form-control"
                      type="text"
                      name="email"
                      id="email"
                      ref={register({
                        required: "Required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    ></input>
                    {errors.email && <p className="invalid">{errors.email.message}</p>}
                  </div>
                </Col>
                <Col md={4}>
                  <Label htmlFor="pin" className="form-label">
                    Pin
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      className=" form-control"
                      type="text"
                      name="pin"
                      id="pin"
                      placeholder="Enter your pin"
                    ></input>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Label htmlFor="phone" className="form-label">
                    Parent Mobile<span className="text-danger">*</span>
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      className=" form-control"
                      type="text"
                      name="phone"
                      id="phone"
                      ref={register({
                        required: "This field is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                        },
                      })}
                    ></input>
                    {errors.phone && <p className="invalid">This field is required</p>}
                  </div>
                </Col>
                <Col md={4}>
                  <Label htmlFor="school_name" className="form-label">
                    School/College Name
                  </Label>
                  <div className="form-control-wrap">
                    <input className=" form-control" type="text" name="school_name" id="school_name"></input>
                  </div>
                </Col>
                <Col md={4}>
                  <Label htmlFor="school_state" className="form-label">
                    School State
                  </Label>
                  <div className="form-control-wrap">
                    <div className="form-control-select">
                      <select className=" form-control" type="select" name="school_state" id="school_state">
                        <option value="">select State</option>
                        <option value="male">New Delhi</option>
                      </select>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Label htmlFor="school_district" className="form-label">
                    School/ college District
                  </Label>
                  <div className="form-control-wrap">
                    <div className="form-control-select">
                      <select
                        className=" form-control"
                        type="select"
                        name="school_district"
                        id="school_district"
                        ref={register({ required: "This Field is required" })}
                      >
                        <option value="">select District</option>
                        <option value="1">New Delhi</option>
                      </select>
                      {errors.school_district && <p className="invalid">This field is required</p>}
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <Label htmlFor="password" className="form-label">
                    Password
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      className=" form-control"
                      type="text"
                      name="password"
                      id="password"
                      ref={register({ required: true })}
                    ></input>
                    {errors.password && <p className="invalid">This field is required</p>}
                  </div>
                </Col>
                <Col md={4}>
                  <Label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      className=" form-control"
                      type="text"
                      name="confirmPassword"
                      id="confirmPassword"
                      ref={register({ required: true })}
                    ></input>
                    {errors.confirmPassword && <p className="invalid">This field is required</p>}
                  </div>
                </Col>
              </Row>

              <Row></Row>
			  <FormGroup className="col-md-3">
			  <input type="checkbox" required></input> I Agree  Term & condition 
			  </FormGroup>
              <FormGroup className="col-md-5">
                <Button type="submit" color="primary" size="lg" className="btn-block" bgColor={"#D32F2F"}>
                  {loading ? <Spinner size="sm" color="light" /> : "Register"}
                </Button>
              </FormGroup>
            </form>
            <div className="form-note-s2 text-center pt-4">
              {" "}
              Already have an account?{" "}
              <Link to={`${process.env.PUBLIC_URL}/login`}>
                <strong>Sign in instead</strong>
              </Link>
            </div>
          </PreviewCard>
        </Block>
        <Toaster />
        <AuthFooter />
      </LoginPageContainer>
    </React.Fragment>
  );
};
export default Register;
