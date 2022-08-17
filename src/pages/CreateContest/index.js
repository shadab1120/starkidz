import React, { useState } from "react";
import Content from "../../layout/content/Content";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import Api from "../../http/userApis";

import "./contest.css";
import ContestDetails from "./ContestDetails";
import DurationLocation from "./DurationLocation";
import Judging from "./Judging";
import FeePrices from "./FeePrices";

const totalSteps = 4;

const CreateContest = () => {
  const { data } = useSelector((state) => state.auth.user);
  const mutation = useMutation(Api.updateUser);
  const [step, setStep] = useState(1);

  // step change handle
  const handleStepChange = (type) => {
    // check last step
    if (step === totalSteps && type === "next") {
      return alert("You have already completed the last step");
    }

    if (type === "next") {
      if (step < totalSteps) {
        setStep(step + 1);
      }
    } else if (type === "prev") {
      if (step > 1) {
        setStep(step - 1);
      }
    }
  };

  return (
    <React.Fragment>
      <Content>
        <div
          style={{
            maxWidth: "756px",
          }}
        >
          {step === 1 && <ContestDetails handleStepChange={handleStepChange} />}
          {step === 2 && <DurationLocation handleStepChange={handleStepChange} />}
          {step === 3 && <Judging handleStepChange={handleStepChange} />}
          {step === 4 && <FeePrices handleStepChange={handleStepChange} />}
        </div>
      </Content>
    </React.Fragment>
  );
};

export default CreateContest;
