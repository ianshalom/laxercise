import React, { Component } from "react";

import withAuthorization from "../../hoc/withAuth";

class ReceivedMessages extends Component {
  render() {
    let welcomeMessage = null;
    console.log(this.props.messages);
    if (this.props.messages) {
      welcomeMessage = this.props.messages.map((message) => {
        return (
          <div key={message.id}>
            <h3>Activity: {message.activityTitle}</h3>
            <p>Message: {message.text}</p>
            <p>From: {message.fromUser.name}</p>
          </div>
        );
      });
    }
    return <div>{welcomeMessage}</div>;
  }
}

export default withAuthorization(ReceivedMessages);
