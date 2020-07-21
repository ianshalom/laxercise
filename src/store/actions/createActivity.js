import * as actionTypes from "./actionTypes";

import axios from "../../axios-create";

export const createActivityStart = () => {
  return {
    type: actionTypes.CREATE_ACTIVITY_START,
  };
};

export const createActivityFail = (error) => {
  return {
    type: actionTypes.CREATE_ACTIVITY_FAIL,
    error: error,
  };
};

export const createActivitySuccess = (data) => {
  return {
    type: actionTypes.CREATE_ACTIVITY_SUCCESS,
    activityData: data,
  };
};

export const createActivity = (data) => {
  return (dispatch) => {
    dispatch(createActivityStart());
    console.log(data);
    // axios
    //   .post("/activity.json", data)
    //   .then((res) => {
    //     //Dispatch success and pass data to reducers with callback function
    //     console.log(res.data);
    //     // dispatch(createActivitySuccess(res.data));
    //   })
    //   .catch((err) => {
    //     dispatch(createActivityFail(err));
    //     console.log(err);
    //   });
  };
};
