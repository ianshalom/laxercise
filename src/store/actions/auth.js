import * as actionTypes from "./actionTypes";
import "firebase/auth";
import firebase from "../../db/index";

const db = firebase.firestore();

//CHECK AUTH START ######################
export const onAuthStateChanged = (onAuthCallback) => {
  firebase.auth().onAuthStateChanged(onAuthCallback);
};

export const resetAuthState = () => ({
  type: actionTypes.RESET_AUTH_STATE,
});

export const setAuthUserStart = () => {
  return {
    type: actionTypes.SET_AUTH_USER_START,
  };
};

export const setAuthUser = (user) => {
  return {
    type: actionTypes.SET_AUTH_USER,
    user: user,
  };
};

export const authUserFail = () => {
  return {
    type: actionTypes.AUTH_USER_FAIL,
  };
};

export const storeAuthUser = (authUser) => (dispatch) => {
  dispatch(setAuthUserStart());
  if (authUser) {
    return getUserProfile(authUser.uid).then((userWithProfile) => {
      dispatch(setAuthUser(userWithProfile));
    });
  } else {
    return dispatch(setAuthUser(null));
  }
};

export const getUserProfile = (uid) =>
  db
    .collection("profiles")
    .doc(uid)
    .get()
    .then((snapshot) => ({
      uid,
      ...snapshot.data(),
    }));

//CHECK AUTH END ######################

//CREATE USER PROFILE END ######################

export const createUserProfile = (userProfile) => {
  const db = firebase.firestore();
  return db.collection("profiles").doc(userProfile.uid).set(userProfile);
};
//CREATE USER PROFILE END ######################

//SIGN IN USER ######################
export const login = ({ email, password }) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => Promise.reject(error.message));
//SIGN IN USER END ######################

//LOGOUT USER START ######################

export const logoutUser = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
export const logout = () => {
  return (dispatch) => {
    dispatch(logoutUser());
    firebase.auth().signOut();
  };
};
//LOGOUT USER END ######################

//REGISTER USER START ######################
export const registerStart = () => {
  return {
    type: actionTypes.REGISTER_START,
  };
};

export const registerFail = (err) => {
  return {
    type: actionTypes.REGISTER_FAIL,
    error: err,
  };
};

export const registerSuccess = (uid) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    uid: uid,
  };
};
export const register = async ({ email, password, fullName, avatar }) => {
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const { user } = res;
    createUserProfile({
      uid: user.uid,
      fullName,
      email,
      avatar,
      activities: [],
      description: "",
    });
  } catch (error) {
    return Promise.reject(error.message);
  }
};
