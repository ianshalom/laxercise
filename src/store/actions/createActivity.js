import * as actionTypes from "./actionTypes";

// import axios from "../../axios-create";
// import db from "../../db/index";
import firebase from "../../db/index";

// export const getActivities = () => {
//   db.collection("activities")
//     .get()
//     .then((snapshot) => {
//       snapshot.docs.forEach((doc) => {
//         const activity = doc.data();
//         console.log(activity);
//       });
//     });
//   return {
//     type: actionTypes.GET_ACTIVITIES_LIST_SUCCESS,
//   };
// };

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

export const createActivitySuccess = (id, data) => {
  return {
    type: actionTypes.CREATE_ACTIVITY_SUCCESS,
    activityData: data,
    activityId: id,
  };
};

export const createActivity = (data) => {
  return (dispatch) => {
    dispatch(createActivityStart());
    const db = firebase.firestore();
    db.collection("activities")
      .add({ data })
      .then((docRef) => {
        console.log(docRef.id);

        dispatch(createActivitySuccess(docRef.id, data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(createActivityFail(err));
      });
  };
};

// export const createActivity = (data) => {
//   return (dispatch) => {
//     dispatch(createActivityStart());
//     console.log(data);
//     axios
//       .post("/activity.json", data)
//       .then((res) => {
//         //Dispatch success and pass data to reducers with callback function

//         dispatch(createActivitySuccess(data));
//       })
//       .catch((err) => {
//         dispatch(createActivityFail(err));
//         console.log(err);
//       });
//   };
// };
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

export const displayActivity = (id) => {
  return async (dispatch) => {
    dispatch(displayActivityStart());
    const db = firebase.firestore();
    db.collection("activities")
      .doc(id)
      .get()
      .then((snapshot) => {
        const activity = snapshot.data();
        dispatch(displayActivitySuccess(activity));
      })
      .catch((err) => {
        dispatch(displayActivityFail(err));
      });
  };
};

// export const displayActivity = (id) => {
//   return (dispatch) => {
//     dispatch(displayActivityStart());
//     axios
//       .get("/activity.json/", id)
//       .then((res) => {
//         dispatch(displayActivitySuccess(res.data[id]));
//       })
//       .catch((err) => {
//         dispatch(displayActivityFail(err));
//       });
//   };
// };

//FETCH ACTIVITIES LIST
export const getActivitiesListStart = () => {
  return {
    type: actionTypes.GET_ACTIVITIES_LIST_START,
  };
};

export const getActivitiesListSuccess = (activities) => {
  return {
    type: actionTypes.GET_ACTIVITIES_LIST_SUCCESS,
    activities: activities,
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
    const db = firebase.firestore();
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
        dispatch(getActivitiesListSuccess(activities));
      });

    //   .then((docs) => {
    //     console.log(docs);

    //   })
    //   .catch((err) => {
    //     dispatch(getActivitiesListFail(err));
    //     console.log(err);
    // });
  };
};

// export const getActivitiesList = () => {
//   return (dispatch) => {
//     dispatch(getActivitiesListStart());
//     // const queryParams =
//     //   "?auth" + token + '&orderBy="userId"&equalTo="' + userId + '"';
//     axios
//       .get("/activity.json")
//       .then((res) => {
//         const activities = [];
//         for (let key in res.data) {
//           activities.push({
//             ...res.data[key],
//             id: key,
//           });
//         }
//         console.log(activities);
//         dispatch(getActivitiesListSuccess(activities));
//       })
//       .catch((err) => {
//         dispatch(getActivitiesListFail(err));
//         console.log(err);
//       });
//   };
// };
