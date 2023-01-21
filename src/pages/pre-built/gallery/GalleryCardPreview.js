import React, { useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import GalleryCard from "../../../components/partials/gallery/GalleryCard";
import { convertBase64 } from "./../../../utils/Utils"
import {
  BlockBetween,
  Block,
  BlockHeadContent,
  BlockHead,
  Col,
  Button

} from "../../../components/Component";
import {
  FormGroup,
  ModalBody,
  Modal,
  Row
} from "reactstrap";
import { useQuery, useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../http/api";

const GalleryCardPreview = () => {

  const history = useHistory();
  const params = useParams();
  const { id } = params;

  const { errors, handleSubmit, register, reset } = useForm();
  const { data, isLoading } = useQuery("gallery", api.getGallery);
  const [contestPic, setContestPic] = useState("");
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const manageMutation = useMutation(api.manageGallery);
  const onSubmit = (data) => {
    const event = id ? `update` : `insert`
    const message = id ? `update` : `created`

    if (id) {
      data.id = id;
    }
    const payload = {
      ...data,
      event: event,
      image: contestPic
    };

    manageMutation.mutate(payload, {
      onSuccess: (response) => {
        setLoading(false);
        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        toast.success(`Picture ${message} successfully`);
        reset();
      },
    });
  };
  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    setContestPic(base64)
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <React.Fragment>
      <Head title="Gallery"></Head>
      <Content>
        <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered modal-lg">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {row ? `Update` : `Add`} Picture
            </h5>
            <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={toggle}>
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="theme">
                      Theme
                    </label>
                    <input
                      type="text"
                      id="theme"
                      name="theme"
                      className="form-control"
                      placeholder="Theme"
                      ref={register({ required: "This field is required" })}
                    />
                    {errors.theme && <span className="error" style={{ color: 'red' }}>{errors.theme.message}</span>}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="category">
                      Category
                    </label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      className="form-control"
                      placeholder="Category"
                      ref={register({ required: "This field is required" })}
                    />
                    {errors.category && <span className="error" style={{ color: 'red' }}>{errors.category.message}</span>}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="Contest">
                      Contest
                    </label>
                    <input
                      type="text"
                      id="contest"
                      name="contest"
                      className="form-control"
                      placeholder="contest"
                      ref={register({ required: "This field is required" })}
                    />
                    {errors.contest && <span className="error" style={{ color: 'red' }}>{errors.contest.message}</span>}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="image">
                      Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      className="form-control"
                      onChange={handleFileRead}
                      encType="multipart/form-data"
                      ref={register({ required: "This field is required" })}
                    />
                    {errors.image && <span className="error" style={{ color: 'red' }}>{errors.image.message}</span>}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup style={{ 'marginTop': '38px' }}>
                    <Button type="submit" color="danger move-right" >
                      Submit
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </form>
          </ModalBody>
        </Modal>
        <div >
          <BlockHead size="sm">
            <BlockBetween className="move-right">
              <BlockHeadContent>
                <ul className="nk-block-tools g-3">
                  <li>
                    <a href="#" className="btn btn-danger" onClick={toggle}>
                      Add Image
                    </a>
                  </li>
                </ul>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
        </div>
        <br />
        <Block>
          <Row className="g-gs">
            {data?.data?.map((item) => {
              return (
                <Col sm={6} lg={3} xxl={3} key={item.id}>
                  <GalleryCard
                    img={item.image}
                    userName={item.category}
                    userEmail={item.contest}
                    theme={item.theme}
                    userImg={item.userImg}
                    heartCount={item.heart}
                    newGallery={true}
                  />
                </Col>
              );
            })}
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default GalleryCardPreview;
