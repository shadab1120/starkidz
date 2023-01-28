import React, { useState } from "react";
import { useMutation } from "react-query";
import { Block, BlockContent, BlockHead, BlockTitle, Button, PreviewCard, Icon } from "../../components/Component";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import { FormGroup } from "reactstrap";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Api from "../../http/masterApis"
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [passState, setPassState] = useState(false);
  const [oldPassState, setOldPassState] = useState(false);
  const [cPassState, setCPassState] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"))?.data;
  const { errors, handleSubmit, register, reset } = useForm();
  const manageMutation = useMutation(Api.changePassword);

  const handleUpdatePassword = (data) => {
    const payload = {
      ...data,
      username: user?.user_login
    };
    manageMutation.mutate(payload, {
      onSuccess: async (response) => {

        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        toast.success(`Password change successfully`);
        reset();
      }
    });
  };


  return (
    <React.Fragment>
      <Head title="Verify-Otp" />
      <PageContainer>
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
                <BlockTitle tag="h5">Change Password</BlockTitle>
                {/* <BlockDes>
                  <p>If you forgot your password, well, then we’ll email you instructions to reset your password.</p>
                </BlockDes> */}
              </BlockContent>
            </BlockHead>
            <form onSubmit={handleSubmit(handleUpdatePassword)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Old Password
                  </label>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#oldPassword"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setOldPassState(!oldPassState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${oldPassState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>

                  <input
                    ref={register({ required: "Please Enter old password" })}
                    {...register('old_password')}
                    type={oldPassState ? "text" : "password"}
                    id="old_password"
                    name="old_password"
                    placeholder="Enter your old password"
                    className={`form-control-lg form-control ${oldPassState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.old_password && <span className="invalid">{errors.old_password.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    New Password
                  </label>
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
                    ref={register({ required: "Please Enter password" })}
                    {...register('password')}
                    type={passState ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.password && <span className="invalid">{errors.password.message}</span>}
                </div>
              </FormGroup>

              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Confirm Password
                  </label>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setCPassState(!cPassState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${cPassState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>

                  <input
                    ref={register({ required: "Please Enter confirm password" })}
                    {...register('cnf_password')}
                    type={cPassState ? "text" : "password"}
                    id="cnf_password"
                    name="cnf_password"
                    placeholder="Enter your confirm password"
                    className={`form-control-lg form-control ${cPassState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.cnf_password && <span className="invalid">{errors.cnf_password.message}</span>}
                </div>
              </FormGroup>

              <FormGroup>
                <Button color="primary" size="lg" className="btn-block" type="submit"
                // onClick={(ev) => ev.preventDefault()}
                >
                  Verify
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
      </PageContainer>
    </React.Fragment>
  );
};
export default ChangePassword;
