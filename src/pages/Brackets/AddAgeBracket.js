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
import "../style.css";
import {
    Row, Col
} from "reactstrap";


const AddAgeBracket = () => {
    const history = useHistory();
    const { errors, handleSubmit, register, reset } = useForm();

    const mutation = useMutation(Api.createAgeBracket);
    const onSubmit = (data) => {
        const payload = {
            ...data,
        };
        mutation.mutate(payload, {
            onSuccess: () => {
                toast.success("Brackets created successfully");
                history.push("/backend/frontend/brackets");
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
                            <label className="form-label" htmlFor="age_from">
                                Age From :
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="number"
                                    id="age_from"
                                    name="age_from"
                                    className="form-control"
                                    ref={register({
                                        required: "This field is required", pattern: {
                                            value: /^[0-9]+$/,
                                            message: 'Please enter a number',
                                        }
                                    })}

                                />
                            </div>
                            {errors.age_from && <span className="error" style={{ color: 'red' }}>{errors.age_from.message}</span>}
                        </Col>
                    </Row>
                    <Row className="g-4">
                        <Col md={8}>
                            <label className="form-label" htmlFor="age_to">
                                Age To :
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="number"
                                    id="age_to"
                                    name="age_to"
                                    className="form-control"
                                    ref={register({
                                        required: "This field is required", pattern: {
                                            value: /^[0-9]+$/,
                                            message: 'Please enter a number',
                                        }
                                    })}
                                />
                            </div>
                            {errors.age_to && <span className="error" style={{ color: 'red' }}>{errors.age_to.message}</span>}
                        </Col>
                    </Row>
                    <Row className="g-4">
                        <Col md={8}>
                            <label className="form-label" htmlFor="description">
                                Description :
                            </label>
                            <div className="form-control-wrap">
                                <textarea type="text"
                                    id="description"
                                    name="description"
                                    className="form-control"
                                    ref={register({ required: "This field is required" })}></textarea>
                            </div>
                            {errors.description && <span className="error" style={{ color: 'red' }}>{errors.description.message}</span>}
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
export default AddAgeBracket;
