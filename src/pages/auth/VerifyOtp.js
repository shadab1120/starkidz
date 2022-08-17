import React from "react";
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle, Button, PreviewCard } from "../../components/Component";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import { FormGroup } from "reactstrap";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { Link, useHistory } from "react-router-dom";

const VerifyOtp = () => {
  let history = useHistory();
  const formSubmit = (event) => {
    event.preventDefault();
    history.push("/change-password");
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
                <BlockTitle tag="h5">Otp Verify</BlockTitle>
                {/* <BlockDes>
                  <p>If you forgot your password, well, then we’ll email you instructions to reset your password.</p>
                </BlockDes> */}
              </BlockContent>
            </BlockHead>
            <form>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Otp Verify
                  </label>
                </div>
                <input
                  type="number"
                  className="form-control form-control-lg"
                  id="default-01"
                  placeholder="Enter your otp number"
                />
              </FormGroup>
              <FormGroup>
                <Button color="primary" size="lg" className="btn-block" onClick={formSubmit}>
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
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default VerifyOtp;
