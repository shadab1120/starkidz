import React, { useEffect } from "react";
import Content from "../../layout/content/Content";
import { Button } from "../../components/Component";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import Api from "../../http/masterApis";
import toast from "react-hot-toast";
import "../style.css";
import { Row, Col } from "reactstrap";


const AddStates = () => {
    const history = useHistory();
    const params = useParams();
    const { id } = params;
    const { errors, handleSubmit, register, reset, setValue } = useForm();
    const { data: region_list } = useQuery('getRegionList', Api.getRegionList);
    const { data: state_list, error, isLoading } = useQuery(['getState', id], Api.getState);
    const mutation = useMutation(Api.manageState);

    const onSubmit = (data) => {
        const event = id ? `update` : `insert`
        const message = id ? `update` : `created`

        if (id) {
            data.id = id;
        }
        const payload = {
            ...data,
            event: event,
        };
        mutation.mutate(payload, {
            onSuccess: (response) => {
                if (response?.data?.status === 'Failed') {
                    return toast.error(response?.data?.msg);
                }
                toast.success(`State ${message} successfully`);
                history.push(`${process.env.PUBLIC_URL}/states`);
                reset();
            },
        });
    };
    useEffect(() => {
        if (state_list && id) {
            setValue('region_name', state_list?.data[0]?.region_name)
            setValue('state', state_list?.data[0]?.state_name)

        }
    }, [setValue, state_list, id]);
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
                                    ref={register({ required: "This field is required" })}
                                    name="region_name"
                                    id="region_name"
                                    className="form-select form-select-lg form-control"
                                    style={{
                                        width: "100%",
                                        height: "38px",
                                    }}
                                >
                                    <option value="">Select Region</option>
                                    {region_list?.data?.map((list, i) => <option key={i} value={list.region_name}>{list.region_name}</option>)}
                                </select>
                            </div>
                            {errors.region_name && <span className="error" style={{ color: 'red' }}>{errors.region_name.message}</span>}
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
                                {id ? `Update` : `Save`}
                            </Button>
                        </Col>
                    </Row>
                </form>
            </div>
        </Content>
    );
};
export default AddStates;
