import React, { Component } from "react";
import withAuthorization from "../../hoc/withAuth";

class SentRequests extends Component {
  componentDidMount() {
    this.props.sentRequests(this.props.currentUserId);
  }

  render() {
    console.log(this.props.sent);

    return (
      <div className="container">
        <div className="content-wrapper">
          <h1 className="title">Sent Requests</h1>
          <div className="columns">
            <div className="column is-one-third"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuthorization(SentRequests);
