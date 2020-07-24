import * as actionTypes from "./actionTypes";
import axios from "../../axios-create";

export const myActivitiesStart = () => {
  return {
    type: actionTypes.MY_ACTIVITIES_START,
  };
};

export const myActivitiesFail = (error) => {
  return {
    type: actionTypes.MY_ACTIVITIES_FAIL,
    error: error,
  };
};

export const myActivitiesSuccess = (activity) => {
  return {
    type: actionTypes.MY_ACTIVITIES_SUCCESS,
    fetchActivities: activity,
  };
};

export const getMyActivities = (userId) => {
  return (dispatch) => {
    dispatch(myActivitiesStart());

    axios
      .get('./activity.json?orderBy="userId"&equalTo="' + userId + '"')
      .then((res) => {
        console.log(res.data);
        dispatch(myActivitiesSuccess(res.data));
      })
      .catch((err) => {
        dispatch(myActivitiesFail(err));
      });
  };
};
