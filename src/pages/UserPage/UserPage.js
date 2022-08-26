import React, { useEffect } from "react";
import Content from "../../layout/content/Content";
import { Row, Col, FormGroup } from "reactstrap";
import { Button } from "../../components/Component";
import "./UserPage.css";
import { FiTwitter, FiFacebook } from "react-icons/fi";
import avtar from "../../images/avatar/c-sm.jpg";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import Api from "../../http/userApis";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

const UserPage = () => {
  const data = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();
  const userMutaion = useMutation(Api.getUser, {
    mutationKey: "userDetail",
  });
  const mutation = useMutation(Api.updateUser);
  const { errors, register, handleSubmit } = useForm();
  const [userDetails, setUserDetails] = React.useState({});

  const onFormSubmit = (formData) => {
    const { FullName, email, phone, ageProof, address, state, pinCode, user_image } = formData;
    let ageImage, userpic;

    let objToUpdate = {
      username: data.user_login,
      firstname: FullName.split(" ")?.[0],
      lastname: FullName.split(" ")?.[1],
      email,
      phone,
      gender: "",
      address,
      pin: pinCode,
      state,
    };

    // image to base64
    if (ageProof.length > 0) {
      console.log(ageProof);
      const reader = new FileReader();
      const image = ageProof?.[0];
      reader.readAsDataURL(image);
      reader.onloadend = (ev) => {
        ageImage = ev.target.result.split(",")[1];
        objToUpdate = {
          ...objToUpdate,
          ageProof: ageImage,
        };
      };
    }

    if (user_image) {
      const userImageReader = new FileReader();
      const userImage = user_image?.[0];
      userImageReader.readAsDataURL(userImage);
      userImageReader.onloadend = (e) => {
        userpic = e.target.result.split(",")[1];
        objToUpdate = {
          ...objToUpdate,
          user_image: userpic,
        };
      };
    }

    setTimeout(() => {
      mutation.mutate(objToUpdate, {
        onSuccess: (res) => {
          toast.success("user Update");

          userMutaion.mutate(
            {
              username: data.user_nicename,
            },
            {
              onSuccess: (res) => {
                setUserDetails(res.data.msg);
              },
            }
          );
        },
      });
    }, 2000);
  };

  useEffect(() => {
    if (!data) return;
    userMutaion.mutate(
      {
        username: data.user_nicename,
      },
      {
        onSuccess: (res) => {
          setUserDetails(res.data.msg);
        },
      }
    );
  }, [data]);

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <React.Fragment>
      <Content>
        <Row className="mt-4">
          <Col xxl="4" md="3">
            <div className="our-team">
              <div className="picture">
                <img
                  className="img-fluid"
                  src={userDetails?.user_image ? `data:image/png;base64,${userDetails?.user_image}` : avtar}
                  alt="njkl"
                />
              </div>
              <div className="mt-4">
                <h3 className="name">{userDetails?.first_name}</h3>
                <h4 className="title">{data?.user_email}</h4>
                <div className="mt-2">
                  <Button txtColor="#D32F2F" size="sm" bgColor="#fff" bRadius="none">
                    Edit Profile
                  </Button>
                </div>
              </div>
              <div className="user-divider"></div>
              <div className="user-card-footer">
                <div className="user-card-footer">
                  <h6>Follow On :</h6>
                </div>
                <div className="d-flex">
                  <div className="user-icon">
                    <FiFacebook />
                  </div>
                  <div className="user-icon">
                    <FiTwitter />
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xxl="8" md="8" sm="12">
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-4">
                <Col lg="6">
                  <FormGroup className="form-group">
                    <label className="form-label" htmlFor="FullName">
                      Full Name
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="FullName"
                        name="FullName"
                        ref={register({
                          required: "This field is required",
                        })}
                        className="form-control"
                        defaultValue={userDetails?.first_name}
                      />
                      {errors.FullName && <span className="invalid">{errors.FullName.message}</span>}
                    </div>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email address
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        ref={register({ required: "This field is required" })}
                        className="form-control"
                        defaultValue={data?.user_email}
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </div>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup className="form-group">
                    <label className="form-label" htmlFor="ageProof">
                      Upload Profile picture
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="file"
                        id="user_image"
                        name="user_image"
                        ref={register({ required: "This field is required" })}
                        className="form-control"
                      />
                      {errors.user_image && <span className="invalid">{errors.user_image.message}</span>}
                    </div>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup className="form-group">
                    <label className="form-label" htmlFor="ageProof">
                      Upload Age Proof
                    </label>
                    <div className="form-control-wrap">
                      <input type="file" id="ageProof" name="ageProof" ref={register()} className="form-control" />
                      {errors.ageProof && <span className="invalid">{errors.ageProof.message}</span>}
                    </div>
                  </FormGroup>
                </Col>
                <Col lg="12">
                  <FormGroup className="form-group">
                    <label className="form-label" htmlFor="address">
                      Address
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        ref={register({ required: "This field is required" })}
                        className="form-control"
                        defaultValue={userDetails?.address}
                      />
                      {errors.address && <span className="invalid">{errors.address.message}</span>}
                    </div>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup className="form-group">
                    <label className="form-label" htmlFor="state">
                      State
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="state"
                        name="state"
                        ref={register({ required: "This field is required" })}
                        className="form-control"
                        defaultValue={userDetails?.state}
                      />
                      {errors.state && <span className="invalid">{errors.state.message}</span>}
                    </div>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup className="form-group">
                    <label className="form-label" htmlFor="pinCode">
                      Pin Code
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="pinCode"
                        name="pinCode"
                        ref={register({ required: "This field is required", pattern: /^[0-9]{6}$/ })}
                        className="form-control"
                        defaultValue={userDetails?.pincode}
                      />
                      {errors.pinCode && <span className="invalid">{errors.pinCode.message}</span>}
                    </div>
                  </FormGroup>
                </Col>
                <Col xl="12" className="mt-2">
                  <Button color="primary" size="md" bgColor="#D32F2F" bRadius="none" type="submit">
                    Edit Profile
                  </Button>
                </Col>
              </Row>
            </form>
          </Col>
          <Col xxl="12" md="1" sm="12"></Col>
        </Row>
        <Toaster position="top-right" />
      </Content>
    </React.Fragment>
  );
};

export default UserPage;
