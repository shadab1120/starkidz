import React from "react";
import Content from "../../layout/content/Content";
import {
    Button,
} from "../../components/Component";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import Api from "../../http/masterApis";
import toast from "react-hot-toast";
import { STATUS_OPTIONS } from "./../../utils/Utils.js"
import "../style.css";
import {
    Row, Col

} from "reactstrap";


const AddRegion = () => {
    const history = useHistory();
    const { errors, handleSubmit, register, reset } = useForm();

    const mutation = useMutation(Api.createRegion);
    const onSubmit = (data) => {
        const payload = {
            ...data,
        };
        mutation.mutate(payload, {
            onSuccess: () => {
                toast.success("Region created successfully");
                history.push("/backend/frontend/regions");
                reset();
            },
        });
    };

    return (
        <Content fluid>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="g-4">
                        <Col md={8}>
                            <label className="form-label" htmlFor="region_name">
                                Region Name :
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="region_name"
                                    name="region_name"
                                    className="form-control"
                                    ref={register({ required: "This field is required" })}
                                />

                            </div>
                            {errors.region_name && <span className="error" style={{ color: 'red' }}>{errors.region_name.message}</span>}
                        </Col>
                    </Row>
                    {/* <Row className="g-4">
                        <Col md={8}>

                            <label className="form-label" htmlFor="status">
                                Status :
                            </label>
                            <div className="form-control-wrap">
                                <select
                                    ref={register}
                                    {...register('status')}
                                    name="status"
                                    id="status"
                                    className="form-select form-select-lg form-control"
                                    style={{
                                        width: "100%",
                                        height: "38px",
                                    }}
                                >
                                    {STATUS_OPTIONS.map((list, i) => <option key={i} value={list.value}>{list.name}</option>)}
                                </select>
                            </div>

                        </Col>
                    </Row> */}
                    <Row className="mt-4" md={8}>
                    <Col md={2}>
                            <Button color="primary" size="md" bgColor="#D32F2F" bRadius="none" width="50%">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </form>
            </div>
        </Content>
    );
};
export default AddRegion;
