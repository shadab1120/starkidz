import React, { useState, useEffect } from "react";
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
import { useQuery, useMutation } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import Api from "../../http/masterApis";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import avtar from "../../images/avatar/c-sm.jpg";
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
  DropdownItem,
  Form,
  Col, Row,
  Spinner
} from "reactstrap";
import { convertBase64 } from "./../../utils/Utils"
const CatestCategories = () => {

  const history = useHistory();
  const params = useParams();
  const { id } = params;

  const { errors, handleSubmit, register, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [contestPic, setContestPic] = useState("");

  const manageMutation = useMutation(Api.manageCategoriesContest);
  const { data: category_contest, error, isLoading } = useQuery(['getCategoriesContest', id], Api.getCategoriesContest);
  const { data } = useQuery('getCategoriesContestList', Api.getCategoriesContestList);

  const handleDelete = (row) => {
    setLoading(true);
    const { id } = row;
    const payload = {
      id: id,
      event: 'delete',
    }

    manageMutation.mutate(payload, {
      onSuccess: async (response) => {
        setLoading(false);
        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        toast.success("Contest categories deleted successfully");
      }
    });
  }
  const onSubmit = (data) => {
    const event = id ? `update` : `insert`
    const message = id ? `update` : `created`

    if (id) {
      data.id = id;
    }
    const payload = {
      ...data,
      event: event,
      category_image: contestPic
    };

    manageMutation.mutate(payload, {
      onSuccess: (response) => {
        setLoading(false);
        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        toast.success(`Contest categories ${message} successfully`);
        history.push(`${process.env.PUBLIC_URL}/contest_categories`);
        reset();
      },
    });
  };
  const handleEdit = (row) => {
    const { id } = row;
    history.push(`${process.env.PUBLIC_URL}/contest_categories/${id}`);
  }

  useEffect(() => {
    if (category_contest && id) {
      setValue('category', category_contest?.data[0]?.category)
    }
  }, [setValue, category_contest, id]);


  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    setContestPic(base64)
  }

  if (isLoading) {
    return (
      <>
        <Content>loading...</Content>
      </>
    );
  }

  return (
    <Content>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mt-4">
            <Col>
              <FormGroup className="form-group">
                <label className="form-label" htmlFor="category">
                  Category Name :
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="category"
                    name="category"
                    className="form-control"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.category && <span className="invalid">{errors.category.message}</span>}
                </div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="form-group">
                <label className="form-label" htmlFor="category_image">
                  Category Image :
                </label>
                <div className="form-control-wrap">
                  <input
                    type="file"
                    id="category_image"
                    name="category_image"
                    className="form-control"
                    onChange={handleFileRead}
                    encType="multipart/form-data"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.category_image && <span className="invalid">{errors.category_image.message}</span>}
                </div>
              </FormGroup>
            </Col>

            <Col className="d-flex align-items-end">
              <Button color="primary" size="md" bgColor="#D32F2F" bRadius="none" width="50%">
                Submit
              </Button>
            </Col>
          </Row>
        </form>
      </div>
      <Card className="card-full mt-4">


        <div className="nk-tb-list">
          <DataTableHead>
            <DataTableRow>
              <span>Sr No.</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span>Category Name</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span> Image</span>
            </DataTableRow>

            <DataTableRow>
              <span className="d-none d-sm-inline">Status</span>
            </DataTableRow>
            <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {loading && <Spinner size="sm" color="danger" />}
          {data?.data?.map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow>
                <span className="tb-lead">
                  <a href="#order" onClick={(ev) => ev.preventDefault()}>
                    {idx}
                  </a>
                </span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="tb-lead">{item.category}</span>
              </DataTableRow>
              <DataTableRow size="md">
                <img className="img-fluid" src={item.category_image ? item.category_image : UserAvatar} width="100" height="70" />
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
                <FiEdit color="green" onClick={(e) => handleEdit(item)} />
                <FiTrash2 className="ml-2" color="#d32f2f" onClick={(e) => handleDelete(item)} />

              </DataTableRow>
            </DataTableItem>
          ))}
        </div>
      </Card>
    </Content>
  );
};
export default CatestCategories;
