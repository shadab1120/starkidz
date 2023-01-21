import React, { useState } from "react";
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
import "../style.css";
import { useQuery, useMutation } from "react-query";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  Card,
  Spinner,
  Row,
  Col,
  FormGroup
} from "reactstrap";
import { useForm } from "react-hook-form";
import Api from "../../http/masterApis";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

const ManageRegion = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState("");
  const [result, setResult] = useState('');
  const { errors, handleSubmit, register } = useForm();
  const { data, isLoading } = useQuery('getRegionList', Api.getRegionList);
  const manageMutation = useMutation(Api.manageRegion);

  const onSubmitFilter = ({ region_name }) => {
    region_name ? setResult(region_name) : setResult('')
  };

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
        toast.success("Region deleted successfully");
        history.push(`${process.env.PUBLIC_URL}/regions`);
      }
    });
  }
  const handleEdit = (row) => {
    const { id } = row;
    setRow(row)
    history.push(`${process.env.PUBLIC_URL}/add-region/${id}`);
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
                  <label className="form-label" htmlFor="region_name">
                    Region Name :
                  </label>
                  <select
                    ref={register}
                    {...register('region_name')}
                    name="region_name"
                    id="region_name"
                    placeholder="Region Name"
                    className="form-select form-select-lg form-control"
                  >
                    <option key="-1" value="">Region Name</option>
                    {data?.data?.map((list, i) => <option key={i} value={list.id}>{list.region_name}</option>)}
                  </select>
                  {errors.region_name && <span className="error">{errors.region_name.message}</span>}
                </div>
              </FormGroup>
            </Col>

            <Col className="d-flex align-items-end">
              <Button color="primary" size="md" bgColor="#D32F2F" bRadius="none" width="15%">
                Search
              </Button>
            </Col>
          </Row>
        </form>
      </div>
      <br />
      <div >
        <div className="card-title-group">
          <div className="card-title">
            <h6 className="title">Region List</h6>

          </div>
        </div>
        <BlockHead size="sm">
          <BlockBetween className="move-right">
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <Link to="add-region" className="btn btn-danger">
                    Add Region
                  </Link>
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
              <span>Region Name</span>
            </DataTableRow>
{/* 
            <DataTableRow>
              <span className="d-none d-sm-inline">Status</span>
            </DataTableRow> */}
            <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {loading && <Spinner size="sm" color="danger" />}
          {data?.data?.filter((l) => !result || l.id === result).map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow size="md">
                <span className="tb-lead"> {item.region_name}</span>
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
    </Content>
  );
};
export default ManageRegion;
