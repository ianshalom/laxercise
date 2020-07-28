import * as actionTypes from "./actionTypes";
import firebase from "../../db/index";

const db = firebase.firestore();

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

export const myActivitiesSuccess = (activities) => {
  return {
    type: actionTypes.MY_ACTIVITIES_SUCCESS,
    fetchActivities: activities,
  };
};

export const getMyActivities = (userId) => {
  return (dispatch) => {
    dispatch(myActivitiesStart());

    db.collection("activities")
      .where("data.uid", "==", userId)
      .get()
      .then((snapshot) => {
        const activities = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(myActivitiesSuccess(activities));
      })
      .catch((err) => {
        dispatch(myActivitiesFail(err));
      });
  };
};
