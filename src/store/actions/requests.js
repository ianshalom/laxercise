import firebase from "../../db/index";
import { FETCH_REQUESTS_SUCCESS } from "./actionTypes";
import * as actionTypes from "./actionTypes";

const db = firebase.firestore();

export const getProfileData = (id) => {
  return db
    .collection("profiles")
    .doc(id)
    .get()
    .then((user) => {
      const userData = user.data();
      return userData;
    });
};

export const fetchUserDataByActivityIdSuccess = (data) => {
  return {
    type: actionTypes.FETCH_USER_DATA_BY_ACTIVITY_ID,
    data: data,
  };
};

export const mapData = (data) => {
  return async (dispatch) => {
    const profileData = await Promise.all(
      data.map(async (el) => {
        const profileData = await getProfileData(el.fromUser);
        el.profileData = profileData;
        return el;
      })
    );
    await dispatch(fetchUserDataByActivityIdSuccess(profileData));
  };
};

export const fetchUserDataByActivityId = (activityId) => {
  return (dispatch) => {
    db.collection("participants")
      .where("activityId", "==", activityId)
      .get()
      .then((activities) => {
        const activitiesData = activities.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        dispatch(mapData(activitiesData));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const sentRequestsSuccess = (requests) => {
  return {
    type: FETCH_REQUESTS_SUCCESS,
    requests: requests,
    requestType: "sent",
  };
};

export const getOrganiserInfo = (requests, organiserId) => {
  return (dispatch) => {
    db.collection("profiles")
      .doc(organiserId)
      .get()
      .then((organiserInfo) => {
        const organiserData = organiserInfo.data();
        requests.map((request) => {
          request.organiserData = organiserData;
          return requests;
        });
        dispatch(sentRequestsSuccess(requests));
      });
  };
};

export const getUserInfo = (requests, activities, organiserId) => {
  return (dispatch) => {
    const userId = activities.data.uid;
    db.collection("profiles")
      .doc(userId)
      .get()
      .then((userInfo) => {
        requests.map((request) => {
          request.userData = userInfo.data();
          request.activityInfo = activities;
          return requests;
        });
        dispatch(getOrganiserInfo(requests, organiserId));
      });
  };
};

export const getActivityData = (requests, activityId, organiserId) => {
  return async (dispatch) => {
    db.collection("activities")
      .doc(activityId)
      .get()
      .then(async (snapshot) => {
        const activities = await snapshot.data();
        dispatch(getUserInfo(requests, activities, organiserId));
        return activities;
      });
  };
};

export const extractDataById = (requests) => {
  return (dispatch) => {
    requests.map((request) =>
      dispatch(getActivityData(requests, request.activityId, request.fromUser))
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

export const getReceivedUserInfoActivityData = async (activityId) => {
  return db
    .collection("activities")
    .doc(activityId)
    .get()
    .then((activity) => {
      const activityData = activity.data();
      return activityData;
    });
};

export const getReceivedUserInfo = (id) => {
  return db
    .collection("profiles")
    .doc(id)
    .get()
    .then((userInfo) => {
      const userData = userInfo.data();
      return userData;
    });
};

export const getReceivedUserId = (object) => {
  return async (dispatch) => {
    const map = await Promise.all(
      object.map(async (obj) => {
        const userInfo = await getReceivedUserInfo(obj.fromUser);
        const organiserInfo = await getReceivedUserInfo(obj.toUser);
        const activityData = await getReceivedUserInfoActivityData(
          obj.activityId
        );
        obj.organiserInfo = organiserInfo;
        obj.activityData = activityData;
        obj.userData = userInfo;
        return obj;
      })
    );
    await dispatch(receivedRequestsSuccess(map));
  };
};

export const fetchReceivedRequests = (userId) => {
  return (dispatch) => {
    return db
      .collection("confirmation")
      .where("toUser", "==", userId)
      .get()
      .then(async (snapshot) => {
        const receivedRequests = await snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(receivedRequests);
        dispatch(getReceivedUserId(receivedRequests));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
