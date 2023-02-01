import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import {
  Button,
  Block,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  DataTableHead, DataTableRow, DataTableItem
} from "../../components/Component";
import Api from "../../http/masterApis";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import "../style.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import {
  Card,
  FormGroup,
  ModalBody,
  Modal,
  Row,
  Col,
  Spinner
} from "reactstrap";

const PrizeList = () => {

  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [_, setReFetch] = useState(false);
  const [row, setRow] = useState("");
  const toggle = () => setModal(!modal);
  const [result, setResult] = useState('');
  const [cityId, setCityId] = useState('');
  const [selectedState, setSelectedState] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");

  const { errors, handleSubmit, register, reset, setValue } = useForm();

  const { data } = useQuery(['getPrizeList'], Api.getPrizeList);
  const { data: state_list } = useQuery('getStateList', Api.getStateList);
  const { data: city_list } = useQuery('getCityList', Api.getCityList);
  const { data:school_list, isLoading } = useQuery("getSchoolCenterList", Api.getSchoolCenterList);
  const manageMutation = useMutation(Api.managePrize)

  const { data: prize_list } = useQuery(
    ['getPrize', row?.id],
    Api.getPrize,
    {
      enabled: !!row,
    }
  )
  useEffect(() => {
    setLoading(false)
    if (prize_list) {
      let { prize_name, state, city } = prize_list?.data[0]
      setValue('prize_name', prize_name);
      // setValue('city', city);
      // setCityId(city)
      // setValue('state', state);
    }
  }, [prize_list, setValue])

  const onSubmitFilter = ({ prize }) => {
    prize ? setResult(prize) : setResult('')
  };

  const onSubmit = (data) => {

    const event = row ? `update` : `insert`
    const message = row ? `update` : `created`
    if (row) {
      data.id = row.id;
    }
    const payload = {
      ...data,
      event: event
    };
    manageMutation.mutate(payload, {
      onSuccess: async (response) => {

        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        setReFetch(true);
        setRow('');
        toast.success(`Prize ${message} successfully`);
        toggle();
        history.push(`${process.env.PUBLIC_URL}/prizes`);
        reset();
      }
    });
  };
  
  const handleDelete = (row) => {
    setLoading(true);
    const { id } = row;
    const payload = {
      event: 'delete',
      id: id
    }

    manageMutation.mutate(payload, {
      onSuccess: async (response) => {
        setLoading(false);
        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        setReFetch(true);
        toast.success(`Prize delete successfully`);
        history.push(`${process.env.PUBLIC_URL}/prizes`);
      }
    });
  }
  const handleEdit = (row) => {
    setRow(row);
    toggle();
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
                    Prize Name :
                  </label>
                  <select
                    ref={register}
                    {...register('prize')}
                    name="prize"
                    id="prize"
                    placeholder="Prize Name"
                    className="form-select form-select-lg form-control"
                  >
                    <option key="-1" value="">Select Prize </option>
                    {data?.data?.map((list, i) => <option key={i} value={list.id}>{list.prize_name}</option>)}
                  </select>
                  {errors.prize && <span className="error">{errors.prize.message}</span>}
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
            {/* <Row>
              <Col md="6">
                <FormGroup className="form-group">
                  <div className="form-control-wrap">
                    <label className="form-label" htmlFor="state">
                      State Name :
                    </label>
                    <select
                      ref={register({ required: "This field is required" })}
                      name="state"
                      id="state"
                      placeholder="State Name"
                      className="form-select form-select-lg form-control"
                      onChange={(ev) => setSelectedState(ev.target[ev.target.selectedIndex].text)}
                    //onChange={(ev) => setSelectedState(ev.target.value)}
                    >
                      <option value="">State Name</option>
                      {state_list?.data?.map((list, i) => <option key={i} value={list.id}>{list.state_name}</option>)}
                    </select>
                    {errors.state && <span className="error">{errors.state.message}</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup className="form-group">
                  <div className="form-control-wrap">
                    <label className="form-label" htmlFor="contest_type_name">
                      City Name :
                    </label>
                    <select
                      ref={register({ required: "This field is required" })}
                      {...register('city')}
                      name="city"
                      id="city"
                      placeholder="City Name"
                      className="form-select form-select-lg form-control"
                    >
                      <option key="-1" value="">City Name</option>
                      {city_list?.data?.filter((l) => l.state_name === selectedState?.trim() || l.id === cityId).map((list, i) => <option key={i}
                        value={list.id}>{list.city_name}</option>)}
                    </select>
                    {errors.city && <span className="error">{errors.city.message}</span>}
                  </div>
                </FormGroup>
              </Col>
            </Row> */}
            <Row>
            {/* <Col md="6">
                <FormGroup className="form-group">
                  <div className="form-control-wrap">
                    <label className="form-label" htmlFor="state">
                      School Name :
                    </label>
                    <select
                      ref={register({ required: "This field is required" })}
                      name="school_name"
                      id="school_name"
                      placeholder="School Name"
                      className="form-select form-select-lg form-control"
                      onChange={(ev) => setSelectedSchool(ev.target[ev.target.selectedIndex].text)}
                    >
                      <option value="">School Name</option>
                      {school_list?.data?.map((list, i) => <option key={i} value={list.id}>{list.school_centre_name}</option>)}
                    </select>
                    {errors.school_name && <span className="error">{errors.school_name.message}</span>}
                  </div>
                </FormGroup>
              </Col> */}
              <Col md="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="prize_name">
                    Prize Name
                  </label>
                  <input
                    type="text"
                    id="prize_name"
                    name="prize_name"
                    className="form-control"
                    placeholder="Prize Name"
                    ref={register({ required: "This field is required" })}
                  />
                  {errors.prize_name && <span className="error" style={{ color: 'red' }}>{errors.prize_name.message}</span>}
                </FormGroup>

              </Col>
              <Col md="6">
                <FormGroup style={{ 'marginTop': '38px' }}>
                  <Button type="submit" color="danger" >
                    {row?.id ? `Update` : `Save`}
                  </Button>
                </FormGroup>


              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>

      <div >
        <div className="card-title-group">
          <div className="card-title">
            <h6 className="title">Prize List</h6>

          </div>
        </div>
        <BlockHead size="sm" >
          <BlockBetween className="move-right">
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <a href="#" className="btn btn-danger" onClick={toggle}>
                    Add Prize
                  </a>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
      </div>
      <Card className="card-full">
        <div className="nk-tb-list mt-n2">
          <DataTableHead>
            <DataTableRow>
              <span>S. No.</span>
            </DataTableRow>

            <DataTableRow>
              <span>Prize Name</span>
            </DataTableRow>

            <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {loading && <Spinner size="sm" color="danger" />}
          {data?.data?.filter((l) => !result || l.id === result).map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow size="md">
                <span className="tb-lead">{idx}</span>
              </DataTableRow>

              <DataTableRow size="md">
                <span className="tb-lead">{item.prize_name}</span>
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
export default PrizeList;
