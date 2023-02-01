import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import { useForm } from "react-hook-form";
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
import { Link, useHistory, useParams } from "react-router-dom";
import Api from "../../http/masterApis";
import avtar from "../../images/avatar/c-sm.jpg";
import toast from "react-hot-toast";
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
const JudgingParameters = () => {
  const history = useHistory();
  const params = useParams();
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);
  const { id } = params;
  const { errors, handleSubmit, register, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState("");
  const [result, setResult] = useState('');
  const { data: judge_param, } = useQuery(['getJudgingParameters', id], Api.getJudgingParameters);
  const { data, isLoading } = useQuery('getJudgingParameters', Api.getJudgingParametersList);

  const manageMutation = useMutation(Api.manageJudgingParameters);

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
        toast.success("Judging parameters deleted successfully");
      }
    });
  }
  // const handleEdit = (row) => {
  //   const { id } = row;
  //   setRow(row)
  //   history.push(`${process.env.PUBLIC_URL}/judging_parameters/${id}`);
  // }

  const handleEdit = (row) => {
    setRow(row);
    toggle();
  }

  const onSubmitFilter = ({ prize }) => {
    prize ? setResult(prize) : setResult('')
  };


  const onSubmit = (data) => {
    const event = id ? `update` : `insert`
    const message = id ? `update` : `created`

    if (id) {
      data.id = id;
    }
    const payload = {
      ...data,
      event: event,
    };

    manageMutation.mutate(payload, {
      onSuccess: (response) => {
        setLoading(false);
        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        toast.success(`Judging parameters ${message} successfully`);
        history.push(`${process.env.PUBLIC_URL}/judging_parameters`);
        reset();
      },
    });
  };
  useEffect(() => {
    if (judge_param) {
      setValue('judging_para_name', judge_param?.data[0]?.judging_para_name)
      setValue('contest_type', judge_param?.data[0]?.contest_type)
      setValue('parameter_weight', judge_param?.data[0]?.parameter_weight)
      setValue('parameter_desc', judge_param?.data[0]?.parameter_desc)
    }
  }, [setValue, judge_param]);

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
                  <label className="form-label" htmlFor="contest_type_name">
                  Judging parameters :
                  </label>
                  <select
                    ref={register}
                    {...register('filter_params')}
                    name="filter_params"
                    id="filter_params"
                    placeholder="Judge Parameters"
                    className="form-select form-select-lg form-control"
                  >
                    <option key="-1" value="">Select Judge Parameters </option>
                    {data?.data?.map((list, i) => <option key={i} value={list.id}>{list.judging_para_name}</option>)}
                  </select>
                  {errors.filter_params && <span className="error">{errors.filter_params.message}</span>}
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
      <div>
        <BlockHead size="sm" >

          <BlockBetween className="move-right">
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <a href="#" className="btn btn-danger" onClick={(e) => { toggle(); setRow(""); }}>
                    Add Judge Parameters
                  </a>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
          <h6 className="title">Judge Parameters</h6>

        </BlockHead>

      </div>
      <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered modal-lg">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {row ? `Update` : `Add`} Judging Parameter
          </h5>
          <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={(e) => { toggle(); setRow(""); }}>
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mt-4">
              <Col>
                <FormGroup className="form-group">
                  <label className="form-label" htmlFor="judging_para_name">
                    Judging Parameter Name :
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="judging_para_name"
                      name="judging_para_name"
                      className="form-control"
                      ref={register({ required: "This field is required" })}
                    />
                    {errors.judging_para_name && <span className="error" style={{ color: 'red' }}>{errors.judging_para_name.message}</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="form-group">
                  <label className="form-label" htmlFor="contest_type">
                    Contest Type :
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="contest_type"
                      name="contest_type"
                      className="form-control"
                      ref={register({ required: "This field is required" })}
                    />
                    {errors.contest_type && <span className="error" style={{ color: 'red' }}>{errors.contest_type.message}</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="form-group">
                  <label className="form-label" htmlFor="parameter_weight">
                    Judging Parameter Weight :
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="parameter_weight"
                      name="parameter_weight"
                      className="form-control"
                      ref={register({ required: "This field is required" })}
                    />
                    {errors.parameter_weight && <span className="error" style={{ color: 'red' }}>{errors.parameter_weight.message}</span>}

                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <FormGroup className="form-group">
                  <label className="form-label" htmlFor="parameter_desc">
                    Judging Parameter Description :
                  </label>
                  <div className="form-control-wrap">
                    <textarea
                      type="text"
                      id="parameter_desc"
                      name="parameter_desc"
                      className="form-control"
                      ref={register({ required: "This field is required" })}
                    ></textarea>
                    {errors.parameter_desc && <span className="error" style={{ color: 'red' }}>{errors.parameter_desc.message}</span>}

                  </div>
                </FormGroup>
              </Col>
              <Col className="d-flex align-items-end">
                <Button color="primary" size="md" bgColor="#D32F2F" bRadius="none" width="50%">
                  {id ? `Update` : `Save`}
                </Button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>

      <Card className="card-full mt-4">
        <div className="nk-tb-list">
          <DataTableHead>
            <DataTableRow>
              <span>Sr No.</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span>Parameter</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span> Contest Type</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span> Weight</span>
            </DataTableRow>

            <DataTableRow>
              <span className="d-none d-sm-inline">Description</span>
            </DataTableRow>
            <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {loading && <Spinner size="sm" color="danger" />}
          {data?.data?.filter((l) => !result || l.id === result).map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow>
                <span className="tb-lead">
                  <a href="#order" onClick={(ev) => ev.preventDefault()}>
                    {idx + 1}
                  </a>
                </span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="tb-lead">{item.judging_para_name}</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="tb-lead">{item.contest_type}</span>
              </DataTableRow>
              <DataTableRow size="md">
                {item.parameter_weight}
              </DataTableRow>

              <DataTableRow size="md">
                {item.parameter_desc}
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
export default JudgingParameters;
