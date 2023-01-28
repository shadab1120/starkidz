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
import { Form, FormGroup, Spinner, Alert } from "reactstrap";
import LoginPageContainer from "../../layout/page-container/LoginPageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import api from "../../http/api";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../store/AuthSlice";
import {toastOptions} from "./../../utils/Utils"
import "./css.css";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
  const dispatch = useDispatch();
  const mutation = useMutation(api.login, {
    onSuccess: ({ data }, variables, context) => {
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
        return;
      }
      localStorage.setItem("accessToken", "token");
      toast.success("Login Successful",toastOptions);
      dispatch(login(data));
      localStorage.setItem("user", JSON.stringify(data));
      if (data.data.role === "administrator") {
        setTimeout(() => {
          // history.push("dashboard");
          // window.location.href = "create-contest";
          window.location.href = "admin_dashboard";
        }, 1000);
      } else if (data.data.role === "editor") {
        setTimeout(() => {
          window.location.href = "dashboard";
        }, 1000);
      } else if (data.data.role === "judge") {
        setTimeout(() => {
          // history.push("dashboard");
          // window.location.href = "create-contest";
          window.location.href = "judge_dashboard";
        }, 1000);
      } else if (data.data.role === "client_admin") {
        setTimeout(() => {
          // history.push("dashboard");
          // window.location.href = "create-contest";
          window.location.href = "client_dashboard";
        }, 1000);
      } else if (data.data.role === "quality_analyst") {
        setTimeout(() => {
          // history.push("dashboard");
          // window.location.href = "create-contest";
          window.location.href = "content_dashboard";
        }, 1000);
      } else {
        setTimeout(() => {
          // history.push("dashboard");
          window.location.href = "dashboard";
        }, 1000);
      }

      setLoading(false);
    },
  });

  const onFormSubmit = (formData) => {
    setLoading(true);

    if (formData.name && formData.passcode) {
      mutation.mutate({
        username: formData.name,
        password: formData.passcode,
      });
    } else {
      setTimeout(() => {
        setError("Cannot login with credentials");
        setLoading(false);
      }, 2000);
    }
  };

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Login" />
      <LoginPageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>

          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Sign-In</BlockTitle>
                <BlockDes>
                  <p>Access dashboard using your email and password.</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> Unable to login with credentials{" "}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    {/* Email or Username */}
                    Username
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="default-01"
                    name="name"
                    ref={register({ required: "Please Enter username" })}
                    placeholder="Enter your username"
                    className="form-control-lg form-control"
                  />
                  {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/reset`}>
                    Forgot Code?
                  </Link>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="passcode"
                    ref={register({ required: "Please Enter password" })}
                    placeholder="Enter your passcode"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <Button size="lg" className="btn-block" type="submit" color="primary" bgColor={"#D32F2F"}>
                  {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
                </Button>
              </FormGroup>
            </Form>
            <div className="form-note-s2 text-center pt-4">
              {" "}
              New on our platform? <Link to={`${process.env.PUBLIC_URL}/register`}>Create an account</Link>
            </div>
          </PreviewCard>
        </Block>
        <AuthFooter />
        <Toaster position="top-right" />
      </LoginPageContainer>
    </React.Fragment>
  );
};
export default Login;
