import React from "react";
import "./ActivityInformation.css";

const ActivityInformation = (props) => {
  return (
    <div className={"activity-information"}>
      <h1>{props.title}</h1>
      <div className={"key-details"}>
        <p>
          <span className={"grey-it"}>Details: </span>
          {props.description}
        </p>
        <p>
          <span className={"grey-it"}>Time: </span>
          {props.time}00 hours
        </p>
        <p>
          <span className={"grey-it"}>Location: </span>
          {props.location}
        </p>
        <span>
          <span className={"grey-it"}>Date: </span>
          {props.date}
        </span>
      </div>
    </div>
  );
};

export default ActivityInformation;
