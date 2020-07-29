import React, { Component } from "react";
import withAuthorization from "../../hoc/withAuth";

class ReceivedRequests extends Component {
  componentDidMount() {
    this.props.receivedRequests(this.props.currentUserId);
  }
  render() {
    console.log(this.props.received);

    return (
      <div className="container">
        <div className="content-wrapper">
          <h1 className="title">Received Requests</h1>
          <div className="columns">
            <div className="column is-one-third"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuthorization(ReceivedRequests);
