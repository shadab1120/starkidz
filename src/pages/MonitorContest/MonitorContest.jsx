import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment"
import { DATE_AND_TIME_FORMAT } from "./../../utils/Utils"
import Api from "../../http/ContestApi";
import mApi from "../../http/masterApis"
import Content from "../../layout/content/Content";
import { useForm } from "react-hook-form";
import { Icon, DataTableHead, DataTableRow, DataTableItem, UserAvatar, Button } from "../../components/Component";
import "./downloads.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  Card,
  FormGroup,
  ModalBody,
  Modal,
  Row,
  Col,
  Spinner
} from "reactstrap";
import toast from "react-hot-toast";

const MonitorContest = () => {
  const history = useHistory();
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);
  const [role, setRole] = useState(false);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState("");
  const { errors, handleSubmit, register, reset, setValue } = useForm();

  const users = useSelector((state) => state.auth.user);
  const { data, isLoading } = useQuery('getContestList', Api.getContestList);
  const manageMutation = useMutation(Api.manageContest);
  const manageAssignmentMutation = useMutation(mApi.manageJudgingAssignment);
  const { data: role_list } = useQuery(['getMultiSelectUsers', role], mApi.getMultiSelectUsers);

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
        toast.success("Contest deleted successfully");
      }
    });
  }
  const handleEdit = (row) => {
    const { id } = row;
    history.push(`${process.env.PUBLIC_URL}/create-contest/${id}`);
  }

  const handleOpenModelAssignment = (row) => {
    toggle();
    setRow(row);
    setType('');
  }

  const handleAssignment = (role, type) => {
    setRole(role)
    setType(type);
  }
  console.log(role)

  const onSubmit = (data) => {
    const payload = {
      ...data,
      role: role,
      id: row?.id
    };

    manageAssignmentMutation.mutate(payload, {
      onSuccess: async (response) => {

        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        toast.success(`${role} assignment successfully`);
        history.push(`${process.env.PUBLIC_URL}/monitor-contest`);
        reset();
      }
    });
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
      <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered modal-lg">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Entry Assignment
          </h5>
          <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={toggle}>
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          Select Role
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={9}>
                <ul className="custom-control-group">
                  <li>
                    <div className="custom-control custom-control-sm custom-radio custom-control-pro checked">
                      <input type="radio" className="custom-control-input" id="btnRadioControl1" name="type" onChange={(e) => handleAssignment('quality_analyst', 'Quality Analyst')} />
                      <label className="custom-control-label" htmlFor="btnRadioControl1">
                        Qa Assignment
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="custom-control custom-control-sm custom-radio custom-control-pro checked">
                      <input type="radio" className="custom-control-input" id="btnRadioControl2" name="type" onChange={(e) => handleAssignment('judge', 'Judge')} />
                      <label className="custom-control-label" htmlFor="btnRadioControl2">
                        Judge Assignment
                      </label>
                    </div>
                  </li>
                </ul>
              </Col>
            </Row>
            {type &&
              <Row>
                <Col md={6}>
                  <div className="form-control-wrap">
                    <label className="form-label" htmlFor="state_name">
                      {type} List :
                    </label>

                    <select
                      ref={register}
                      {...register('role_member_id')}
                      name="role_member_id"
                      id="role_member_id"
                      className="form-select form-select-lg form-control"
                      style={{
                        width: "100%",
                        height: "38px",
                      }}
                    >
                      {role_list?.data?.map((list, i) => <option key={i} value={list.id}>{list.name}</option>)}
                    </select>
                    {errors.role_member_id && <span className="error" style={{ color: 'red' }}>{errors.role_member_id.message}</span>}

                  </div>
                </Col>
                <Col md="6">
                  <FormGroup style={{ 'marginTop': '31px' }}>
                    <Button type="submit" color="danger" >
                      Submit
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            }
          </form>
        </ModalBody>
      </Modal>
      <Card className="card-full">
        <div className="card-inner">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">MonitorContest</h6>
            </div>
          </div>
        </div>
        <div className="nk-tb-list mt-n2">
          <DataTableHead>
            <DataTableRow>
              <span>S. No.</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span>Contest Name</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span>Image</span>
            </DataTableRow>
            <DataTableRow>
              <span>Contest Type</span>
            </DataTableRow>
            <DataTableRow>
              <span>Start Date</span>
            </DataTableRow>
            <DataTableRow>
              <span>End Date</span>
            </DataTableRow>
            <DataTableRow>
              <span>Result Date</span>
            </DataTableRow>
            <DataTableRow>
              <span>Created By</span>
            </DataTableRow>
            <DataTableRow>
              <span>Created On</span>
            </DataTableRow>
            <DataTableRow>
              <span className="d-none d-sm-inline">Status</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span className="d-none d-md-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {loading && <Spinner size="sm" color="danger" />}
          {data?.data?.map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow>
                <span className="tb-lead">
                  <a href="#order" onClick={(ev) => ev.preventDefault()}>
                    {idx+1}
                  </a>
                </span>
              </DataTableRow>
              <DataTableRow size="md">
                <div className="user-name">
                  <span className="tb-lead">{item.contest_short_name}</span>
                </div>
              </DataTableRow>
              <DataTableRow size="sm">
                <div className="user-card">
                  <img className="img-fluid" width="100" height="100" src={item.contest_image} alt={item.contest_short_name} title={item.contest_short_name} />
                  {/* <UserAvatar className="sm" theme={item.theme} text={item.initial} image={item.contest_image}></UserAvatar> */}
                </div>
              </DataTableRow>

              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {item.contest_type_2}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {moment(item.contest_start_end_date).format(DATE_AND_TIME_FORMAT)}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {moment(item.contest_start_end_date).format(DATE_AND_TIME_FORMAT)}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {moment(item.result_date).format(DATE_AND_TIME_FORMAT)}
                </span>
              </DataTableRow>

              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {users?.display_name}
                </span>
              </DataTableRow>

              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {moment(item.updated_at).format(DATE_AND_TIME_FORMAT)}
                </span>
              </DataTableRow>


              <DataTableRow>
                <span
                  className={`badge badge-dot badge-dot-xs badge-${item.status === "Paid" ? "success" : item.status === "Due" ? "warning" : "danger"
                    }`}
                >
                  {item.status}
                </span>
              </DataTableRow>
              <DataTableRow className="w-20">
                <FiEdit color="green" onClick={(e) => handleEdit(item)} />
                <FiTrash2 className="ml-2" color="#d32f2f" onClick={(e) => handleDelete(item)} />
                <Button color="blue" onClick={(e) => handleOpenModelAssignment(item)} title="Assign Entry" >Assign Entry</Button>
              </DataTableRow>
            </DataTableItem>
          ))}
        </div>
      </Card>
    </Content>
  );
};
export default MonitorContest;
