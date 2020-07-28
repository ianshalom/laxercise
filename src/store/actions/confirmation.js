import * as actionTypes from "./actionTypes";
import firebase from "../../db/index";
const db = firebase.firestore();

export const confirmedAttendance = () => {
  return {
    type: actionTypes.CONFIRMED_ATTENDANCE,
  };
};

export const createConfirmation = (confirmation) =>
  db.collection("confirmation").add(confirmation);
