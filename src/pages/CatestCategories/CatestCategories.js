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
  const [modal, setModal] = useState(false);
  const [row, setRow] = useState("");
  const toggle = () => setModal(!modal);
  const { errors, handleSubmit, register, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [contestPic, setContestPic] = useState("");
  const [result, setResult] = useState('');
  const manageMutation = useMutation(Api.manageCategoriesContest);
  const { data: category_contest, error, isLoading } = useQuery(['getCategoriesContest', row?.id], Api.getCategoriesContest);
  const { data } = useQuery('getCategoriesContestList', Api.getCategoriesContestList);

  const onSubmitFilter = ({ filter_type }) => {
    filter_type ? setResult(filter_type) : setResult('')
  };


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
    const { id } = row;
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
    setRow(row);
    toggle();
  }

  useEffect(() => {
    if (category_contest) {
      setValue('category', category_contest?.data[0]?.category)
    }
  }, [setValue, category_contest]);


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
        <form onSubmit={handleSubmit(onSubmitFilter)}>
          <Row className="mt-4">
            <Col md="4">
              <FormGroup className="form-group">
                <div className="form-control-wrap">
                  <label className="form-label" htmlFor="filter_type">
                    Contest Categories :
                  </label>
                  <select
                    ref={register}
                    {...register('filter_type')}
                    name="filter_type"
                    id="filter_type"
                    placeholder="Contest Categories"
                    className="form-select form-select-lg form-control"
                  >
                    <option key="-1" value="">Select Contest Categories </option>
                    {data?.data?.map((list, i) => <option key={i} value={list.id}>{list.category}</option>)}
                  </select>
                </div>
              </FormGroup>
            </Col>

            <Col className="d-flex align-items-end" md="3">
              <Button color="primary" size="md" bgColor="#D32F2F" bRadius="none">
                Search
              </Button>
            </Col>
          </Row>
        </form>
      </div>
      <br />
      <div >
        <BlockHead size="sm" >
          <BlockBetween className="move-right">
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <a href="#" className="btn btn-danger" onClick={toggle}>
                    Add Contest Categories
                  </a>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <div className="card-title-group">
          <div className="card-title">
            <h6 className="title">Contest Categories</h6>

          </div>
        </div>

      </div>
      <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered modal-lg">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {row ? `Update` : `Add`} Contest Categories
          </h5>
          <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={(e) => { toggle(); setRow(""); }}>
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
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
                    {row?.id ? `Update` : `Save`}
                  </Button>
                </Col>
              </Row>
            </form>
          </div>
        </ModalBody>
      </Modal>

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

            {/* <DataTableRow>
              <span className="d-none d-sm-inline">Status</span>
            </DataTableRow> */}
            <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {loading && <Spinner size="sm" color="danger" />}
          {data?.data?.filter((l) => !result || l.id === result)?.map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow>
                <span className="tb-lead">
                  <a href="#order" onClick={(ev) => ev.preventDefault()}>
                    {idx + 1}
                  </a>
                </span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="tb-lead">{item.category}</span>
              </DataTableRow>
              <DataTableRow size="md">
                <img className="img-fluid" src={item.category_image ? item.category_image : UserAvatar} width="100" height="70" />
              </DataTableRow>


              {/* <DataTableRow>
                <span
                  className={`badge badge-dot badge-dot-xs badge-${item.status === "Paid" ? "success" : item.status === "Due" ? "warning" : "danger"
                    }`}
                >
                  {item.status}
                </span>
              </DataTableRow> */}
              <DataTableRow className="">
                <FiEdit color="green" onClick={(e) => handleEdit(item)} />
                <FiTrash2 className="ml-2" color="#d32f2f" onClick={(e) => handleDelete(item)} />

              </DataTableRow>
            </DataTableItem>
          ))}
        </div>
      </Card>
    </Content >
  );
};
export default CatestCategories;
