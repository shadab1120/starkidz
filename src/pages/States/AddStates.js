import React from "react";
import Content from "../../layout/content/Content";
import { Button } from "../../components/Component";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import Api from "../../http/masterApis";
import toast from "react-hot-toast";
import "../style.css";
import { Row, Col } from "reactstrap";


const AddStates = () => {
    const history = useHistory();
    const { errors, handleSubmit, register, reset } = useForm();
    const { data: region_list, error, isLoading } = useQuery('getRegion', Api.getRegion);
    const mutation = useMutation(Api.createState);
    const onSubmit = (data) => {
        const payload = {
            ...data,
        };
        mutation.mutate(payload, {
            onSuccess: () => {
                toast.success("State created successfully");
                history.push("/backend/frontend/states");
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
                                <select
                                    ref={register}
                                    {...register('region_name')}
                                    name="region_name"
                                    id="region_name"
                                    className="form-select form-select-lg form-control"
                                    style={{
                                        width: "100%",
                                        height: "38px",
                                    }}
                                >
                                    {region_list?.data?.map((list, i) => <option key={i} value={list.region_name}>{list.region_name}</option>)}
                                </select>
                            </div>

                        </Col>
                    </Row>
                    <Row className="g-4">
                        <Col md={8}>
                            <label className="form-label" htmlFor="state">
                                State Name :
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    className="form-control"
                                    ref={register({ required: "This field is required" })}
                                />

                            </div>
                            {errors.state && <span className="error" style={{ color: 'red' }}>{errors.state.message}</span>}
                        </Col>
                    </Row>
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
export default AddStates;
