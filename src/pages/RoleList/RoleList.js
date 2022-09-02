import React from "react";
import Content from "../../layout/content/Content";
import {
  Button,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  DataTableHead,
  DataTableRow,
  DataTableItem,
} from "../../components/Component";
import { RoleData } from "./RoleData";
import "../style.css";

import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Card, FormGroup, ModalBody, Modal, Form, Row, Col } from "reactstrap";

const DataList = () => {
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  return (
    <Content>
      {/* bootstrap modal */}

      <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered modal-lg">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Add Role
          </h5>
          <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={toggle}>
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <Form>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="example3cols1Input">
                    Role Name
                  </label>
                  <input className="form-control" id="example3cols1Input" placeholder="Role Name" type="text" />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="example3cols2Input">
                    Role Short Name
                  </label>
                  <input className="form-control" id="example3cols2Input" placeholder="Role Short Name" type="text" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="example3cols3Input">
                    Role Order
                  </label>
                  <input className="form-control" id="example3cols3Input" placeholder="Role Order" type="text" />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="example3cols4Input">
                    Role Status
                  </label>
                  {/* dropdown for status */}
                  <select className="form-control" id="exampleFormControlSelect1">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </FormGroup>
              </Col>
            </Row>

            {/* submit btn */}
            <Button type="submit" color="danger" className="mt-3">
              Submit
            </Button>
          </Form>
        </ModalBody>
      </Modal>

      <div>
        <div className="card-title-group">
          <div className="card-title">
            <h6 className="title">Role List</h6>
          </div>
        </div>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <a href="#" className="btn btn-danger" onClick={toggle}>
                    Add Role
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
              <span>Role Name</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span>Role short name</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span>Role Order</span>
            </DataTableRow>

            <DataTableRow>
              <span className="d-none d-sm-inline">Status</span>
            </DataTableRow>
            <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {RoleData.map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow size="md">
                <span className="tb-lead">{item.name}</span>
              </DataTableRow>

              <DataTableRow>
                <span className="tb-sub tb-amount">{item.short_name}</span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-sub tb-amount">{item.order}</span>
              </DataTableRow>
              <DataTableRow>
                <span
                  className={`badge badge-dot badge-dot-xs badge-${
                    item.status === "Paid" ? "success" : item.status === "Due" ? "warning" : "danger"
                  }`}
                >
                  {item.status}
                </span>
              </DataTableRow>
              <DataTableRow className="">
                <FiEdit color="green" />
                <FiTrash2 className="ml-2" color="#d32f2f" />
              </DataTableRow>
            </DataTableItem>
          ))}
        </div>
      </Card>
    </Content>
  );
};
export default DataList;
