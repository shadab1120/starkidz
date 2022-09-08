import React from "react";
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
import { useQuery } from "react-query";
import Api from "../../http/masterApis";
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
  Col, Row
} from "reactstrap";
const JudgingParameters = () => {
  const { data, error, isLoading } = useQuery('getJudgingParameters', Api.getJudgingParameters);
  const handleDelete = (row) => {
    console.error('row', row)
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
        <form>
          <Row className="mt-4">
            <Col>
              <FormGroup className="form-group">
                <label className="form-label" htmlFor="bucksTo">
                  Judging Parameter Name :
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="bucksTo"
                    name="bucksTo"
                    className="form-control"
                  />

                </div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="form-group">
                <label className="form-label" htmlFor="bucksFrom">
                  Contest Type :
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="bucksFrom"
                    name="bucksFrom"
                    className="form-control"
                  />

                </div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="form-group">
                <label className="form-label" htmlFor="bucksFrom">
                  Judging Parameter Weight :
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="bucksFrom"
                    name="bucksFrom"
                    className="form-control"
                  />

                </div>
              </FormGroup>
            </Col>

            <Col>
              <FormGroup className="form-group">
                <label className="form-label" htmlFor="bucksFrom">
                  Judging Parameter Description :
                </label>
                <div className="form-control-wrap">
                  <textarea
                    type="text"
                    id="bucksFrom"
                    name="bucksFrom"
                    className="form-control"
                  ></textarea>

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
                <FiEdit color="green" />
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
