import React, { Component } from "react";
import withAuthorization from "../../hoc/withAuth";
import "./ReceivedRequest.css";
import Aux from "../../hoc/Aux";

class ReceivedRequests extends Component {
  componentDidMount() {
    this.props.receivedRequests(this.props.currentUserId);
  }

  windowReload = () => {
    window.location.reload(false);
  };

  acceptOffer = (confirmationId) => {
    this.props.changeParticipationStatus(confirmationId, "accepted");
  };

  declineOffer = (confirmationId) => {
    this.props.changeParticipationStatus(confirmationId, "declined");
  };

  render() {
    let receivedRequests = null;
    if (this.props.received) {
      receivedRequests = this.props.received.map((data) => {
        return (
          <div key={data.id} className={"receivedCards"}>
            {data.status === "accepted" ? (
              <h4>Accepted </h4>
            ) : data.status === "declined" ? (
              <h4>Declined</h4>
            ) : (
              <h4>Pending</h4>
            )}
            <h2>From: {data.userData.fullName}</h2>
            <p>Note: {data.note}</p>

            {data.status === "pending" && (
              <Aux>
                <hr />
                <button onClick={() => this.acceptOffer(data.id)}>
                  Accept
                </button>
                <button onClick={() => this.declineOffer(data.id)}>
                  Decline
                </button>
              </Aux>
            )}
          </div>
        );
      });
    }

    return (
      <div className="container">
        <div className="content-wrapper">
          <h1 className="title">Received Requests</h1>
          <div className="columns">
            <div className="column is-one-third">{receivedRequests}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuthorization(ReceivedRequests);
