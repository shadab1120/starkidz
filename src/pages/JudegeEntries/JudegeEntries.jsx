import React, { useState } from "react";
import Content from "../../layout/content/Content";
import { Range } from 'react-range';
import { DataTableHead, DataTableRow, DataTableItem, UserAvatar, Button } from "../../components/Component";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./downloads.css";
import { useQuery, useMutation } from "react-query";
import Api from "../../http/ContestApi";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import {
  Card,
  ModalBody,
  Modal,
  Row,
  Col,
  FormGroup
} from "reactstrap";

const JudegeEntries = () => {

  const [modal, setModal] = useState(false);

  const [creativity, setCreativity] = useState({ values: [10] });
  const [originality, setOriginality] = useState({ values: [10] });
  const [neetness, setNeetness] = useState({ values: [10] });

  const toggle = () => setModal(!modal);
  const { errors, handleSubmit, register, reset, setValue } = useForm();
  const judgeId = JSON.parse(localStorage.getItem("user"))?.data?.ID;
  const manageMutation = useMutation(Api.submitJudgeEntries)
  const [row, setRow] = useState("");
  const { Id } = useParams();
  const { data: contest_list } = useQuery(
    [Id],
    Api.getContestEntryById,
    {
      enabled: !!judgeId,
    }
  )

  const handleEdit = (row) => {
    setRow(row);
    toggle();
  }

  const onSubmit = (data) => {

    const event = row ? `update` : `insert`
    const message = row ? `update` : `created`
    if (row) {
      data.id = row.id;
    }

    const payload = {
      ...data,
      creativity: creativity?.values?.[0],
      originality: originality?.values?.[0],
      neetness: neetness?.values?.[0],
      judge: judgeId,
    };

    manageMutation.mutate(payload, {
      onSuccess: async (response) => {

        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        setRow('');
        toast.success(`Judge entry ${message} successfully`);
        toggle();
      }
    });
  };


  //console.log('creativity', creativity.values)
  //console.log('originality', originality.values)
  //console.log('neetness', neetness.values)



  return (
    <Content>
      <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered modal-lg">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {row ? `Update` : `Add`} Prize
          </h5>
          <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={(e) => { toggle(); setRow(""); }}>
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md="6">
                <div className="form-control-wrap mt-10">
                  <label className="form-label" htmlFor="contest_type_name">
                    Creativity
                  </label>
                  <Range
                    step={1}
                    min={1}
                    max={10}
                    values={creativity.values}
                    onChange={(values) => setCreativity({ values })}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '6px',
                          width: '100%',
                          backgroundColor: '#ccc'
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '20px',
                          width: '20px',
                          backgroundColor: '#d32f2f'
                        }}
                      />
                    )}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md="6">
                <div className="form-control-wrap mt-10">
                  <br />
                  <label className="form-label" htmlFor="contest_type_name">
                    Originality
                  </label>
                  <Range
                    step={1}
                    min={1}
                    max={10}
                    values={originality.values}
                    onChange={(values) => setOriginality({ values })}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '6px',
                          width: '100%',
                          backgroundColor: '#ccc'
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '20px',
                          width: '20px',
                          backgroundColor: 'green'
                        }}
                      />
                    )}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md="6">
                <div className="form-control-wrap mt-10">
                  <br />
                  <label className="form-label" htmlFor="contest_type_name">
                    Neetness
                  </label>
                  <Range
                    step={1}
                    min={1}
                    max={10}
                    values={neetness.values}
                    onChange={(values) => setNeetness({ values })}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '6px',
                          width: '100%',
                          backgroundColor: '#ccc'
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '20px',
                          width: '20px',
                          backgroundColor: 'blue'
                        }}
                      />
                    )}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              {(creativity.values < 3 || originality.values < 3 || neetness.values < 3)
                &&
                <Col md="6">
                  <FormGroup className="form-group">
                    <div className="form-control-wrap"><br />
                      <label className="form-label" htmlFor="contest_type_name">
                        Remark
                      </label>
                      <textarea
                        className="form-control"
                        rows="3"
                        ref={register({ required: "This field is required" })}
                        name="remark"
                        id="remark"
                      ></textarea>
                      {errors.remark && <span className="error">{errors.remark.message}</span>}
                    </div>
                  </FormGroup>
                </Col>
              }
              <Col className="d-flex align-items-end" md="3">
                <FormGroup>
                  <Button type="submit" color="danger" >
                    {row?.id ? `Update` : `Save`}
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
      <Card className="card-full">
        <div className="card-inner">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">JudegeEntries</h6>
            </div>
          </div>
        </div>
        <div className="nk-tb-list mt-n2">
          <DataTableHead>
            <DataTableRow>
              <span>Order No.</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span>Entry ID</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span>Contest Name</span>
            </DataTableRow>
            <DataTableRow>
              <span>Judge By Date</span>
            </DataTableRow>
            <DataTableRow>
              <span>Entry Document</span>
            </DataTableRow>
            <DataTableRow>
              <span>Age Group</span>
            </DataTableRow>
            <DataTableRow>
              <span className="d-none d-sm-inline">Progress</span>
            </DataTableRow>
            <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {contest_list?.data?.map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow>
                <span className="tb-lead">
                  <a href="#order" onClick={(ev) => ev.preventDefault()}>
                    {item.order}
                  </a>
                </span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="tb-lead">{item.order}</span>
              </DataTableRow>
              <DataTableRow size="sm">
                <div className="user-card">
                  <UserAvatar className="sm" theme={item.theme} text={item.initial} image={item.img}></UserAvatar>
                  <div className="user-name">
                    <span className="tb-lead">{item.contest_short_name}</span>
                  </div>
                </div>
              </DataTableRow>

              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {item.date}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {item.amount}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {item.ageGroup}
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
              <DataTableRow className="">
                <FiEdit color="green" onClick={(e) => handleEdit(item)} />
                <FiTrash2 className="ml-2" color="#d32f2f" />

              </DataTableRow>
            </DataTableItem>
          ))}
        </div>
      </Card>
    </Content>
  );
};
export default JudegeEntries;
