import React, { useEffect, useState } from "react";
import Content from "../../layout/content/Content";
import {
    Button,
} from "../../components/Component";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import Api from "../../http/masterApis";
import toast from "react-hot-toast";
import "../style.css";
import {
    Row, Col
} from "reactstrap";


const AddCity = () => {
    const history = useHistory();
    const params = useParams();
    const { id } = params;
    const { errors, handleSubmit, register, reset, setValue } = useForm();
    const { data: city } = useQuery(['getCity', id], Api.getCity);
    const { data: region_list } = useQuery('getRegionList', Api.getRegionList);
    const { data: state_list } = useQuery('getStateList', Api.getStateList);
    const { data: district_list } = useQuery(['getDistrictList'], Api.getDistrictList);
    const [selectedState, setSelectedState] = useState({ "regionId": "", "stateId": "", "districtId": "" })

    const mutation = useMutation(Api.manageCity);
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
                toast.success(`City ${message} successfully`);
                history.push(`${process.env.PUBLIC_URL}/cities`);
                reset();
            },
        });
    };


    useEffect(() => {
        if (city && id) {
            console.log(city?.data[0])
            setValue('region_name', city?.data[0]?.region_name)
            setValue('state_name', city?.data[0]?.state_name)
            setValue('district', city?.data[0]?.district)
            setValue('city_name', city?.data[0]?.city_name)
            setSelectedState({
                "regionId": city?.data[0]?.region_name, "stateId": city?.data[0]?.state_name, "districtId": city?.data[0]?.district
            })
        }
    }, [setValue, city, id]);


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
                                    {...register('region_name')}
                                    name="region_name"
                                    id="region_name"
                                    className="form-select form-select-lg form-control"
                                    style={{
                                        width: "100%",
                                        height: "38px",
                                    }}
                                    onChange={(ev) => setSelectedState({ ...selectedState, "regionId": ev.target.value })}
                                ><option value="">Select Region</option>
                                    {region_list?.data?.map((list, i) => <option key={i} value={list.id}>{list.region_name}</option>)}
                                </select>
                                {errors.region_name && <span className="error" style={{ color: 'red' }}>{errors.region_name.message}</span>}
                            </div>

                        </Col>
                    </Row>
                    <Row className="g-4">
                        <Col md={8}>

                            <label className="form-label" htmlFor="state_name">
                                State Name :
                            </label>
                            <div className="form-control-wrap">
                                <select
                                    ref={register({ required: "This field is required" })}
                                    {...register('state_name')}
                                    name="state_name"
                                    id="state_name"
                                    className="form-select form-select-lg form-control"
                                    style={{
                                        width: "100%",
                                        height: "38px",
                                    }}
                                    onChange={(ev) => setSelectedState({ ...selectedState, "stateId": ev.target.value })}
                                >
                                    <option value="" >Select State</option>
                                    {state_list?.data?.filter((v) => v.region_name === selectedState?.regionId).map((list, i) => <option key={i} value={list.id}>{list.state_name}</option>)}
                                </select>
                            </div>
                            {errors.state_name && <span className="error" style={{ color: 'red' }}>{errors.state_name.message}</span>}
                        </Col>
                    </Row>
                    <Row className="g-4">
                        <Col md={8}>
                            <label className="form-label" htmlFor="district_name">
                                District Name :
                            </label>
                            <div className="form-control-wrap">
                                <select
                                    ref={register({ required: "This field is required" })}
                                    {...register('district')}
                                    name="district"
                                    id="district"
                                    className="form-select form-select-lg form-control"
                                    style={{
                                        width: "100%",
                                        height: "38px",
                                    }}
                                    onChange={(ev) => setSelectedState({ ...selectedState, "districtId": ev.target.value })}
                                >
                                    <option value="" >Select State</option>
                                    {district_list?.data?.filter((v) => v.state_name === selectedState?.stateId)?.map((list, i) => <option key={i} value={list.id}>{list.district_name}</option>)}
                                </select>
                            </div>
                            {errors.district && <span className="error" style={{ color: 'red' }}>{errors.district.message}</span>}
                        </Col>
                    </Row>
                    <Row className="g-4">
                        <Col md={8}>
                            <label className="form-label" htmlFor="city_name">
                                City Name :
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="city_name"
                                    name="city_name"
                                    className="form-control"
                                    ref={register({ required: "This field is required" })}
                                />

                            </div>
                            {errors.city_name && <span className="error" style={{ color: 'red' }}>{errors.city_name.message}</span>}
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
export default AddCity;
