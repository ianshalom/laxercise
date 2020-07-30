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

export const changeParticipationStatus = (confirmationId, status) => {
  return (dispatch) => {
    db.collection("confirmation").doc(confirmationId).update({ status });
    dispatch(changeParticipationStatusSuccess(confirmationId, status));
  };
};

export const changeParticipationStatusSuccess = (confirmationId, status) => {
  return {
    type: actionTypes.CHANGE_PARTICIPATION_STATUS_SUCCESS,
    status: status,
    confirmationId: confirmationId,
    requestType: "received",
  };
};
