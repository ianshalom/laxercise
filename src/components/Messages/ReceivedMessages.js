import React, { Component } from "react";

import withAuthorization from "../../hoc/withAuth";
import "./ReceivedMessages.css";
class ReceivedMessages extends Component {
  render() {
    let welcomeMessage = null;
    console.log(this.props.messages);
    if (this.props.messages) {
      welcomeMessage = this.props.messages.map((message) => {
        return (
          <div className="messages-card" key={message.id}>
            <h5 className="activity-title">
              <span className="bold-it">Activity:</span> {message.activityTitle}
            </h5>
            <p className="message">
              <span className="bold-it">Message:</span> {message.text}
            </p>
            <p className="from-user">
              <span className="bold-it">From:</span> {message.fromUser.name}
            </p>
          </div>
        );
      });
    }
    return (
      <div className="messages-container">
        <h1 className="messages-header">Messages</h1>
        <hr />
        <div className="messages-wrapper">{welcomeMessage}</div>
      </div>
    );
  }
}

export default withAuthorization(ReceivedMessages);
