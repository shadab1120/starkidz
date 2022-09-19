
import React, { useEffect } from "react"
import { Row, Col, FormGroup, Form } from "reactstrap";
import { Button } from "../../components/Component";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import Api from "../../http/ContestApi";
import toast, { Toaster } from "react-hot-toast";

const FeePrices = () => {
  const params = useParams();
  const { id } = params;
  const history = useHistory();
  const { errors, handleSubmit, register, reset, setValue } = useForm();
  const contestDetails = useSelector((state) => state.contest);
  const mutation = useMutation(Api.manageContest);
  const { data: prize_list } = useQuery(['getPrizeList'], Api.getPrizeList);

  const { data: contest_data } = useQuery(['getContest', id], Api.getContest);
  useEffect(() => {
    if (contest_data) {
      const contestDetails = contest_data[0] || []
      const { contest_fee, prize } = contestDetails
      setValue('contest_fee', contest_fee);
      setValue('prize', prize);
    }
  }, [contest_data])


  const onSubmit = (data) => {
    const message = id ? `update` : `created`
    const payload = {
      ...contestDetails,
      ...data,
    };
    mutation.mutate(payload, {

      onSuccess: (response) => {
        if (response?.data?.status === 'Failed') {
          return toast.error(response?.data?.msg);
        }
        toast.success(`Contest ${message} successfully`);
        history.push(`${process.env.PUBLIC_URL}/monitor-contest`);
        reset();
      },
    });
  };

  return (
    <>
      <Row>
        <h3>
          <strong>Contest Fee & Prices :</strong>
        </h3>
      </Row>
      <Form className="w-100" onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-4">
          <Col xxl="6" md="6" sm="12">
            <FormGroup>
              <label className="form-label" htmlFor="prize">
                Contest Fee & Prizes
              </label>
              <select
                ref={register}
                {...register('prize')}
                name="prize"
                id="prize"
                placeholder="Prize Name"
                className="form-select form-select-lg form-control"
                style={{
                  width: "100%",
                  height: "80px",
                }}
              >
                {prize_list?.data?.map((list, i) => <option key={i} value={list.id}>{list.prize_name}</option>)}
              </select>
              {errors.prize && <span className="error">{errors.prize.message}</span>}

            </FormGroup>
          </Col>
          {/* <Col xxl="6" md="6" sm="12">
            <FormGroup>
              <label className="form-label">Location Type </label>
              <select
                className="form-select form-select-lg form-control"
                name="prize"
                id="prize"
                ref={register({ required: "This field is required" })}
              >
                <option value="1"></option>
                <option value="2">Two</option>
              </select>
              {errors.prize && <span className="text-danger">This field is required</span>}
            </FormGroup>
          </Col> */}
        </Row>
        <Row className="mt-4">
          <Col xxl="12" md="12" sm="12">
            <div
              className="d-flex"
              style={{
                gap: "10px",
              }}
            >
              <Button className="btn-primary" type="submit" bgColor="#D32F2F">
                Create Contest
              </Button>
              <Button className="btn-primary" type="submit">
                Draft
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
      <Toaster position="top-right" />
      {/* save and draft button */}
    </>
  );
};

export default FeePrices;
