import * as actionTypes from "./actionTypes";

import "firebase/auth";
import firebase from "../../db/index";
// import db from "../../db/index";

export const createUserProfile = (userProfile) => {
  const db = firebase.firestore();
  return db.collection("profile").doc(userProfile.uid).set(userProfile);
};
//CREATE USER PROFILE END ######################

//SIGN IN USER ######################

export const login = ({ email, password }) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => Promise.reject(error.message));

//SIGN IN USER END ######################

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

export const registerSuccess = (name) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    name: name,
  };
};
export const register = async ({ email, password, fullName, avatar }) => {
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const { user } = res;
    await createUserProfile({
      uid: user.uid,
      fullName,
      email,
      avatar,
      activities: [],
      description: "",
    });
  } catch (error) {
    return Promise.reject(error.message);
    // return Promise.reject(error.message);
  }
};
