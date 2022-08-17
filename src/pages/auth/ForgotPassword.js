import React from "react";
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle, Button, PreviewCard } from "../../components/Component";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import { FormGroup } from "reactstrap";
import LoginPageContainer from "../../layout/page-container/LoginPageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { Link,useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import api from "../../http/api";
import "./css.css";

const ForgotPassword = () => {
  const { errors, register, handleSubmit } = useForm();
  const mutation = useMutation(api.forgotPassword);

  const onFormSubmit = (formData) => {
    // convert yyyy-mm-dd to dd-mm-yyyy
    const date = formData.dob.split("-");
    formData.dob = `${date[2]}-${date[1]}-${date[0]}`;

    mutation.mutate(
      {
        firstname: formData.Fname,
        phone: formData.mobile,
        dob: formData.dob,
      },
      {
        onSuccess: (res) => {
          if (res.data.status === "Success") {
            // hash otp before saving to local storage
            sessionStorage.setItem("otp", res.data.otp);
            sessionStorage.setItem("userName", formData.username);
            window.location.href = "/otpVerify";
          }
        },
      }
    );
  };

  return (
    <React.Fragment>
      <Head title="Forgot-Password" />
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
                <BlockTitle tag="h5">Forget password</BlockTitle>
                <BlockDes>
                  {/* <p>If you forgot your password, well, then we’ll email you instructions to reset your password.</p> */}
                </BlockDes>
              </BlockContent>
            </BlockHead>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    First Name
                  </label>
                </div>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="Fname"
                  name="Fname"
                  ref={register({ required: "This field is required" })}
                  placeholder="Enter your First name"
                />
                {errors.Fname && <span className="invalid">{errors.Fname.message}</span>}
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    DOB
                  </label>
                </div>
                <input
                  type="date"
                  className="form-control form-control-lg"
                  id="dob"
                  name="dob"
                  ref={register({ required: "This field is required" })}
                  placeholder="Enter your dob"
                />
                {errors.dob && <span className="invalid">{errors.dob.message}</span>}
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Mobile Number
                  </label>
                </div>
                <input
                  type="number"
                  className="form-control form-control-lg"
                  id="mobile"
                  name="mobile"
                  ref={register({ required: "This field is required" })}
                  placeholder="Enter your mobile number"
                />
                {errors.mobile && <span className="invalid">{errors.mobile.message}</span>}
              </FormGroup>
              <FormGroup>
                <Button color="primary" size="lg" className="btn-block" type="submit">
                  Forget Password
                </Button>
              </FormGroup>
            </form>
            <div className="form-note-s2 text-center pt-4">
              <Link to={`${process.env.PUBLIC_URL}/login`}>
                <strong>Return to login</strong>
              </Link>
            </div>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </LoginPageContainer>
    </React.Fragment>
  );
};
export default ForgotPassword;
