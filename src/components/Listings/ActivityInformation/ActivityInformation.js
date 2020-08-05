import React from "react";
import "./ActivityInformation.css";

const ActivityInformation = (props) => {
  return (
    <div className={"activity-information"}>
      <div className={"key-details"}>
        <p
          className={"activity-description"}
          style={{
            fontSize: props.description.length > 200 ? "16px" : "20px",
          }}
        >
          <span className={"grey-it"}>Details: </span>
          {props.description}
        </p>
        <p>
          <span className={"grey-it"}>Time: </span>
          {props.time}
        </p>
        <p>
          <span className={"grey-it"}>Location: </span>
          {props.location}
        </p>
        <p>
          <span>
            <span className={"grey-it"}>Date: </span>
            {props.date}
          </span>
        </p>

        <p>
          {" "}
          <span className={"grey-it"}>By: </span>
          {props.by}
        </p>
      </div>
    </div>
  );
};

export default ActivityInformation;
