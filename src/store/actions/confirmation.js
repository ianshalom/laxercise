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

export const markConfirmationAsInParticipants = (confirmationId) => {
  db.collection("confirmation")
    .doc(confirmationId)
    .update({ participantConfirmed: true });
  participantConfirmedForUI(confirmationId);
};

export const participantConfirmedForUI = (confirmationId) => {
  return {
    type: actionTypes.PARTICIPANT_CONFIRMED_FOR_UI,
    confirmationId: confirmationId,
    requestType: "sent",
  };
};

export const confirmParticipation = (confirmed, message) => {
  db.collection("participants")
    .add(confirmed)
    .then((docRef) => {
      message.cta = `/participants/${docRef.id}`;
      markConfirmationAsInParticipants(confirmed.fromConfirmation);
      sendMessage(message);
    });
};

export const sendMessage = (message) => {
  db.collection("profiles")
    .doc(message.toUser)
    .collection("messages")
    .add(message);
};

//Messages
export const subscribeToMsgs = (userId) => {
  return (dispatch) => {
    db.collection("profiles")
      .doc(userId)
      .collection("messages")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(fetchMessages(messages));
      });
  };
};

export const fetchMessages = (messages) => {
  return {
    type: actionTypes.FETCH_USER_MESSAGES,
    messages: messages,
  };
};
