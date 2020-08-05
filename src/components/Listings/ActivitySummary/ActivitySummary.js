import React, { useState } from "react";
import "./ActivitySummary.css";
// import { useToasts } from "react-toast-notifications";
import { createConfirmation } from "../../../store/actions/confirmation";
const ActivitySummary = (props) => {
  // const { addToast } = useToasts();

  const [confirmation, setConfirmation] = useState({
    fromUser: props.currentUser,
    toUser: props.user.uid,
    activityId: props.activityId,
    status: "pending",
    note: "",
  });

  const handleChange = ({ target: { value, name } }) => {
    setConfirmation({ ...confirmation, [name]: value });
  };

  const submitConfirmation = () => {
    createConfirmation(confirmation);
    // .then((_) => {
    //   addToast("Your attendance has been confirmed for this activity!", {
    //     appearance: "success",
    //     autodismiss: "true",
    //     autodimisstimeout: 3000,
    //   });
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    props.modalClosed();
  };

  return (
    <div>
      <h3>Activity</h3>
      <p>You are almost confirmed!</p>

      <p>
        <span style={{ fontWeight: "bold" }}>Activity: </span>
        {props.activity.title}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Date of Activity: </span>
        {props.activity.startDate}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Location: </span>
        {props.activity.location}
      </p>
      <input
        onChange={handleChange}
        name="note"
        className="input is-large"
        type="text"
        placeholder="Write some catchy note"
        max="5"
        min="0"
      />
      <p className="note">
        {props.user &&
          `Do share more about yourself with
              ${props.user.fullName} before your meeting!`}
      </p>

      <p style={{ display: "inline-block" }}>Press to confirm </p>
      <button
        style={{ display: "inline-block", margin: "8px" }}
        onClick={props.modalClosed}
      >
        Back
      </button>
      <button onClick={submitConfirmation} style={{ display: "inline-block" }}>
        Confim
      </button>
    </div>
  );
};
export default ActivitySummary;
