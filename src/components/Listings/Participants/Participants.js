import React, { Component } from "react";
import "./Participants.css";

class Participants extends Component {
  render() {
    let participants = null;
    console.log(this.props.participants);
    if (this.props.participants) {
      participants = this.props.participants.map((participant) => {
        return (
          <div key={participant.id} className={"participant-info"}>
            <div className={"avatar-container"}>
              <img
                className={"avatar"}
                src={participant.profileData.avatar}
                alt=""
              />
            </div>
            <h3 className={"participant-name"}>
              {participant.profileData.fullName}
            </h3>
            <hr />
          </div>
        );
      });
    }
    return (
      <div className={"participants-section"}>
        <h3 style={{ fontSize: "25px" }}>Participants</h3>
        <hr />
        {participants}
      </div>
    );
  }
}
export default Participants;
