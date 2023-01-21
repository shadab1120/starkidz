import React from "react";
import Content from "../../layout/content/Content";
import { DataTableHead, DataTableRow, DataTableItem, UserAvatar } from "../../components/Component";
import { useQuery, useMutation } from "react-query";
import Api from "../../http/masterApis";
import moment from "moment"
import "./downloads.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import {
  Card
} from "reactstrap";


const VerifyAge = () => {

  const { data: ageProofList, error, isLoading } = useQuery(['getContest'], Api.getVerifyAgeProofLits);
  const mutation = useMutation(Api.manageVerifyAgeProof);

  const handleUpdateStatus = (row) => {
    console.log('------', row)

    const payload = {
      user_id: row?.user_id,
      id: row?.id,
      status: row?.status === "Approved" ? 'Approved' : 'Unapproved'
    };
    mutation.mutate(payload, {
      onSuccess: (response) => {

        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        toast.success(`Status updated successfully`);
      },
    });

  }
  return (
    <Content>
      <Card className="card-full">
        <div className="card-inner">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">VerifyAge</h6>
            </div>
          </div>
        </div>
        <div className="nk-tb-list mt-n2">
          <DataTableHead>
            <DataTableRow>
              <span>S. No.</span>
            </DataTableRow>
            <DataTableRow size="sm">
              <span>Contestant Name</span>
            </DataTableRow>
            <DataTableRow size="md">
              <span>Birth Proof</span>
            </DataTableRow>
            <DataTableRow>
              <span>Age</span>
            </DataTableRow>
            <DataTableRow>
              <span className="d-none d-sm-inline">Phone</span>
            </DataTableRow>
            <DataTableRow>
              <span>Proof Submitted Date</span>
            </DataTableRow>
            <DataTableRow>
              <span>Staus</span>
            </DataTableRow>
            <DataTableRow>
              <span>View</span>
            </DataTableRow>

            <DataTableRow>
              <span className="d-none d-sm-inline">Action</span>
            </DataTableRow>
          </DataTableHead>
          {ageProofList?.data?.map((item, idx) => (
            <DataTableItem key={idx}>
              <DataTableRow>
                <span className="tb-lead">
                  {idx + 1}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-lead">
                  <a href="#order" onClick={(ev) => ev.preventDefault()}>
                    {item.firstName}  {item.lastName}
                  </a>
                </span>
              </DataTableRow>

              <DataTableRow size="md">
                <div className="user-name">
                  <span className="tb-lead">
                    <img src={`data:image/png;base64,${item.age_proof}`} />
                  </span>
                </div>
              </DataTableRow>
              <DataTableRow size="sm">
                <div className="user-card">
                  {moment(item.dob).format('YYYY-MM-DD')}
                </div>
              </DataTableRow>

              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {item.phone}
                </span>
              </DataTableRow>

              <DataTableRow>
                <span className="tb-sub tb-amount">
                  {moment(item.proof_added_on).format('YYYY-MM-DD')}
                </span>
              </DataTableRow>

              <DataTableRow>
                <span
                  className={`badge badge-dot badge-dot-xs badge-${item.status === "Paid" ? "success" : item.status === "Due" ? "warning" : "danger"
                    }`}
                >
                  <a href="#" onClick={() => handleUpdateStatus(item)} className={item.status === 'Approved' ? `link-danger` : `link-success`} title={item.status === 'Approved' ? `UnApproved` : `Approved`}>{item.status === 'Approved' ? `UnApproved` : `Approved`}
                  </a>
                </span>
              </DataTableRow>
              <DataTableRow>
                <a href="#" className="btn btn-danger">
                  View
                </a>
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
export default VerifyAge;
