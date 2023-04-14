import React, { useState } from "react";
import "./createcontestnew.css";
import Content from "../../layout/content/Content";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import Api from "../../http/userApis";

import ContestDetailsNew from "./ContestDetailsNew";
import ContestTheme from "./ContestTheme";
import DurationLocation from "./DurationLocation";
import JudgingNew from "./JudgingNew";
import ContestFeesAndPrizes from "./ContestFeesAndPrizes";
import Terms from "./Terms";
import About from "./About";

const totalSteps = 7;

const CreateContestNew = () => {
  const [step, setStep] = useState(7);

  // step change handl2
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
        <div className="content__card">
          {step === 1 && <ContestDetailsNew handleStepChange={handleStepChange} />}
          {step === 2 && <ContestTheme handleStepChange={handleStepChange} />}
          {step === 3 && <DurationLocation handleStepChange={handleStepChange} />}
          {step === 4 && <JudgingNew handleStepChange={handleStepChange} />}
          {step === 5 && <ContestFeesAndPrizes handleStepChange={handleStepChange} />}
          {step === 6 && <About handleStepChange={handleStepChange} />}
          {step === 7 && <Terms handleStepChange={handleStepChange} />}
        </div>
      </Content>
    </React.Fragment>
  );
};

export default CreateContestNew;
