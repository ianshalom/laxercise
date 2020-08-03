import * as actionTypes from "./actionTypes";
import { getUserProfile } from "./auth";

import firebase from "../../db/index";

const db = firebase.firestore();

//MODAL
export const modalClosed = () => {
  return {
    type: actionTypes.MODAL_CLOSED,
  };
};

//JOIN ACTIVITY
export const joinActivity = () => {
  return {
    type: actionTypes.JOIN_ACTIVITY,
  };
};

//CREATE ACTIVITY
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
export const createInit = () => {
  return {
    type: actionTypes.CREATE_INIT,
  };
};

//Create userRef - creates connection between activity and property
// export const createUserRef = (uid) => db.doc("profiles/" + uid);

export const createActivity = (data) => {
  return (dispatch) => {
    dispatch(createActivityStart());
    db.collection("activities")
      .add({ data })
      .then((docRef) => {
        dispatch(createActivitySuccess(data));
      })
      .catch((err) => {
        dispatch(createActivityFail(err));
      });
  };
};

//GET ACTIVITY BY ID
export const displayActivitySuccess = (activity) => {
  return {
    type: actionTypes.DISPLAY_ACTIVITY_SUCCESS,
    activity: activity,
  };
};

export const displayActivityFail = (err) => {
  return {
    type: actionTypes.DISPLAY_ACTIVITY_FAIL,
    error: err,
  };
};

export const displayActivityStart = () => {
  return {
    type: actionTypes.DISPLAY_ACTIVITY_START,
  };
};

export const getRequestToJoinActivityStatus = (activity, activityId) => {
  return (dispatch) => {
    db.collection("confirmation")
      .where("activityId", "==", activityId)
      .get()
      .then((snapshot) => {
        const activityInfo = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        activity.activityInfo = activityInfo;
        dispatch(displayActivitySuccess(activity));
      });
  };
};

export const displayActivity = (id) => {
  return async (dispatch) => {
    dispatch(displayActivityStart());
    db.collection("activities")
      .doc(id)
      .get()
      .then(async (snapshot) => {
        const activity = snapshot.data();
        activity.user = await getUserProfile(activity.data.uid);
        dispatch(getRequestToJoinActivityStatus(activity, id));
        // dispatch(displayActivitySuccess(activity));
      })
      .catch((err) => {
        dispatch(displayActivityFail(err));
      });
  };
};

//FETCH ACTIVITIES LIST
export const getActivitiesListStart = () => {
  return {
    type: actionTypes.GET_ACTIVITIES_LIST_START,
  };
};

export const getActivitiesListSuccess = (activities, id) => {
  return {
    type: actionTypes.GET_ACTIVITIES_LIST_SUCCESS,
    activities: activities,
    activityId: id,
  };
};

export const getActivitiesListFail = (error) => {
  return {
    type: actionTypes.GET_ACTIVITIES_LIST_FAIL,
    error: error,
  };
};

export const getActivitiesList = () => {
  return (dispatch) => {
    dispatch(getActivitiesListStart());
    db.collection("activities")
      .get()
      .then((snapshot) => {
        // snapshot.forEach((doc) => {
        //   console.log(doc.id, "=>", doc.data());
        // });
        const activities = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(getActivitiesListSuccess(activities, activities.id));
      });
  };
};
