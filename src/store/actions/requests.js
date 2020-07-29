import firebase from "../../db/index";
import { FETCH_REQUESTS_SUCCESS } from "./actionTypes";

const db = firebase.firestore();

export const sentRequestsSuccess = (requests) => {
  return {
    type: FETCH_REQUESTS_SUCCESS,
    requests: requests,
    requestType: "sent",
  };
};

export const getUserInfo = (requests, activities) => {
  return (dispatch) => {
    const userId = activities.data.uid;
    db.collection("profiles")
      .doc(userId)
      .get()
      .then((userInfo) => {
        requests.userData = userInfo.data();
        dispatch(sentRequestsSuccess(requests));
      });
  };
};

export const getActivityData = (requests, activityId) => {
  return async (dispatch) => {
    db.collection("activities")
      .doc(activityId)
      .get()
      .then(async (snapshot) => {
        const activities = await snapshot.data();
        dispatch(getUserInfo(requests, activities));
      });
  };
};

export const extractDataById = (requests) => {
  return (dispatch) => {
    requests.map((request) =>
      dispatch(getActivityData(requests, request.activityId))
    );
  };
};

export const fetchSentRequests = (userId) => {
  return async (dispatch) => {
    db.collection("confirmation")
      .where("fromUser", "==", userId)
      .get()
      .then((snapshot) => {
        const sentRequests = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        dispatch(extractDataById(sentRequests));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const receivedRequestsSuccess = (requests) => {
  return {
    type: FETCH_REQUESTS_SUCCESS,
    requests: requests,

    requestType: "received",
  };
};

export const getReceivedUserInfo = (requests, id) => {
  return (dispatch) => {
    db.collection("profiles")
      .doc(id)
      .get()
      .then((userInfo) => {
        requests.userData = userInfo.data();
        dispatch(receivedRequestsSuccess(requests));
      });
  };
};

export const getReceivedUserId = (requests) => {
  return (dispatch) => {
    requests.map((user) =>
      dispatch(getReceivedUserInfo(requests, user.fromUser))
    );
  };
};

export const fetchReceivedRequests = (userId) => {
  return (dispatch) => {
    return db
      .collection("confirmation")
      .where("toUser", "==", userId)
      .get()
      .then(async (snapshot) => {
        const receivedRequests = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        dispatch(getReceivedUserId(receivedRequests));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};