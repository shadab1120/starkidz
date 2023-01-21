import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import moment from "moment"
import { DATE_AND_TIME_FORMAT } from "./../../utils/Utils"
import Api from "../../http/masterApis"
import Content from "../../layout/content/Content";
import { Icon, DataTableHead, DataTableRow, DataTableItem } from "../../components/Component";
import "./downloads.css";
import {
    Card,
    Spinner
} from "reactstrap";

const ViewContest = () => {


    const users = useSelector((state) => state.auth.user);
    const { data, isLoading } = useQuery('getContestList', Api.getClientContestList);

    if (isLoading) {
        return (
            <>
                <Content>loading...</Content>
            </>
        );
    }

    return (

        <Content>
            <Card className="card-full">
                <div className="card-inner">
                    <div className="card-title-group">
                        <div className="card-title">
                            <h6 className="title">View Contest</h6>
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
                    </DataTableHead>
                    {isLoading && <Spinner size="sm" color="danger" />}
                    {data?.data?.map((item, idx) => (
                        <DataTableItem key={idx}>
                            <DataTableRow>
                                <span className="tb-lead">
                                    <a href="#order" onClick={(ev) => ev.preventDefault()}>
                                        {idx + 1}
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
                        </DataTableItem>
                    ))}
                </div>
            </Card>
        </Content>
    );
};
export default ViewContest;
