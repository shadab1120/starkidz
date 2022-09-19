import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contest_type: "",
  contest_short_name: "",
  contest_image: "",
  age_bracket: "",
  contest_type_2: "",
  contest_start_end_date: "",
  contest_start_date:"",
  select_judge_form:"",
  result_date: "",
  state: "",
  district: "",
  contest_manager: "",
  about_contest: "",
  judging_parameter: "",
  qa_form: "",
  qa: "",
  level_judging: "",
  contest_fee: "",
  terms_conditions: "",
  prize: "",
};

export const CreateContestSlice = createSlice({
  name: "createContest",
  initialState,
  reducers: {
    setContestType: (state, action) => {
      state.contest_type = action.payload;
    },
    setContestDetails: (state, action) => {
      // set new state with previous state
      return { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setContestType, setContestDetails } = CreateContestSlice.actions;

export default CreateContestSlice.reducer;
