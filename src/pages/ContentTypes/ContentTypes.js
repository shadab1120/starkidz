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
  const [modal, setModal] = useState(false);
  const [row, setRow] = useState("");
  const toggle = () => setModal(!modal);
  const { errors, handleSubmit, register, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [contestPic, setContestPic] = useState("");
  const [result, setResult] = useState('');
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
      contest_type_image: contestPic
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
    setRow(row);
    toggle();
  }

  useEffect(() => {
    if (contest_type) {
      setValue('contest_type_name', contest_type?.data[0]?.contest_type_name)
    }
  }, [setValue, contest_type, row]);


  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    setContestPic(base64)
  }

  const onSubmitFilter = ({ filter_type }) => {
    filter_type ? setResult(filter_type) : setResult('')
  };

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
                    Content Type :
                  </label>
                  <select
                    ref={register}
                    {...register('filter_type')}
                    name="filter_type"
                    id="filter_type"
                    placeholder="Prize Name"
                    className="form-select form-select-lg form-control"
                  >
                    <option key="-1" value="">Select Content Type </option>
                    {data?.data?.map((list, i) => <option key={i} value={list.id}>{list.contest_type_name}</option>)}
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
                    Add Content Type
                  </a>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <div className="card-title-group">
          <div className="card-title">
            <h6 className="title">Content Type</h6>

          </div>
        </div>

      </div>
      <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered modal-lg">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {row ? `Update` : `Add`} Content Type
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
                {/* <Col>
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
    </Col> */}

                <Col className="d-flex align-items-end">
                  <Button color="primary" size="md" bgColor="#D32F2F" bRadius="none" width="50%">
                    {id ? `Update` : `Save`}
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
              <span>ContentType Name</span>
            </DataTableRow>
            {/* <DataTableRow size="sm">
              <span> Image</span>
            </DataTableRow> */}

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
                <span className="tb-lead">{item.contest_type_name}</span>
              </DataTableRow>
              {/* <DataTableRow size="md">
                <img className="img-fluid" src={item.contest_type_image} width="100" height="70" alt={item.contest_type_name} />
              </DataTableRow> */}


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
    </Content>
  );
};
export default ContentType;
