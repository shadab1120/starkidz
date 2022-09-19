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
import { useForm } from "react-hook-form";
import Api from "../../http/masterApis";
import toast from "react-hot-toast";
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
  Col,
  Row,
  Spinner
} from "reactstrap";
import { convertBase64 } from "./../../utils/Utils"
const ContentType = () => {
  const history = useHistory();
  const params = useParams();
  const { id } = params;

  const { errors, handleSubmit, register, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [contestPic, setContestPic] = useState("");

  const { data, error, isLoading } = useQuery('getContestTypeList', Api.getContestTypeList);
  const { data: contest_type } = useQuery(['getContestTypeList', id], Api.getContestType);
  const manageMutation = useMutation(Api.manageContestType);



  const handleDelete = (row) => {
    setLoading(true);
    const { id } = row;
    const payload = {
      id: id,
      event: 'delete'
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
      contest_type_image:contestPic
    };

    manageMutation.mutate(payload, {
      onSuccess: (response) => {
        setLoading(false);
        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        toast.success(`Content types ${message} successfully`);
        history.push(`${process.env.PUBLIC_URL}/content_types`);
        reset();
      },
    });
  };
  const handleEdit = (row) => {
    const { id } = row;
    history.push(`${process.env.PUBLIC_URL}/content_types/${id}`);
  }

  useEffect(() => {
    if (contest_type && id) {
      setValue('contest_type_name', contest_type?.data[0]?.contest_type)
    }
  }, [setValue, contest_type, id]);


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
                <label className="form-label" htmlFor="contest_type_name">
                  ContentType Name :
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="contest_type_name"
                    name="contest_type_name"
                    className="form-control"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.contest_type_name && <span className="invalid">{errors.contest_type_name.message}</span>}
                </div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="form-group">
                <label className="form-label" htmlFor="bucksFrom">
                  ContentType Image :
                </label>
                <div className="form-control-wrap">
                  <input
                    type="file"
                    id="category_name"
                    name="category_name"
                    className="form-control"
                    onChange={handleFileRead}
                    encType="multipart/form-data"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.category_name && <span className="invalid">{errors.category_name.message}</span>}
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
              <span>ContentType Name</span>
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
          {data?.data && Object.values(data?.data)?.map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow>
                <span className="tb-lead">
                  <a href="#order" onClick={(ev) => ev.preventDefault()}>
                    {idx}
                  </a>
                </span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="tb-lead">{item.contest_type_name}</span>
              </DataTableRow>
              <DataTableRow size="md">
                <img className="img-fluid" src={item.contest_type_image} alt="njkl" />
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
export default ContentType;
