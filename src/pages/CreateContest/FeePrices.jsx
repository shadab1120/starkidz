
import React, { useEffect } from "react"
import { Row, Col, FormGroup, Form } from "reactstrap";
import { Button } from "../../components/Component";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import Api from "../../http/ContestApi";
import mApi from "../../http/masterApis"
import toast, { Toaster } from "react-hot-toast";

const FeePrices = () => {
  const params = useParams();
  const { id } = params;
  const history = useHistory();
  const { errors, handleSubmit, register, reset, setValue } = useForm();
  const contestDetails = useSelector((state) => state.contest);
  const mutation = useMutation(Api.manageContest);
  const { data: prize_list } = useQuery('getPrizeList', mApi.getPrizeList);

  const { data: contest_data } = useQuery(['getContest', id], Api.getContest);
  useEffect(() => {
    if (contest_data && id) {
      const contestDetails = contest_data[0] || []
      const { contest_fee, prize } = contestDetails
      setValue('contest_fee', contest_fee);
      setValue('prize', prize);
    }
  }, [id])


  const onSubmit = (data) => {
    const message = id ? `update` : `created`
    const formData = new FormData();

    formData.append('about_contest', contestDetails?.about_contest);
    formData.append('age_bracket', contestDetails?.age_bracket);
    formData.append('contest_fee', contestDetails?.contest_fee);
    formData.append('contest_manager', contestDetails?.contest_manager);
    formData.append('contest_short_name', contestDetails?.contest_short_name);
    formData.append('image', contestDetails?.contest_image);
    formData.append('contest_start_date', contestDetails?.contest_start_date);
    formData.append('contest_start_end_date', contestDetails?.contest_start_end_date);
    formData.append('contest_theme', contestDetails?.contest_theme);
    formData.append('contest_type', contestDetails?.contest_type);
    formData.append('contest_type_2', contestDetails?.contest_type_2);
    formData.append('district', contestDetails?.district);
    formData.append('event', 'insert');
    formData.append('judging_parameter', contestDetails?.judging_parameter);
    formData.append('level_judging', contestDetails?.level_judging);
    formData.append('prize', data?.prize);
    formData.append('qa', contestDetails?.qa);
    formData.append('qa_form', contestDetails?.qa_form);
    formData.append('result_date', contestDetails?.result_date);
    formData.append('select_judge_form', contestDetails?.select_judge_form);
    formData.append('state', contestDetails?.state);
    formData.append('terms_conditions', contestDetails?.terms_conditions);



    mutation.mutate(formData, {

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
