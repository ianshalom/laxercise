import React, { Component } from "react";
import withAuthorization from "../../hoc/withAuth";
import "./ReceivedRequest.css";
import Aux from "../../hoc/Aux";
import { newParticipant, newMessage } from "../../helpers/activity";
import { confirmParticipation } from "../../store/actions/confirmation";
import { withToastManager } from "react-toast-notifications";

class ReceivedRequests extends Component {
  componentDidMount() {
    this.props.receivedRequests(this.props.currentUserId);
  }

  createCollaboration = (
    activityId,
    title,
    image,
    toUser,
    id,
    fromUser,
    name,
    avatar,
    organiserName,
    organiserAvatar
  ) => {
    const { toastManager } = this.props;

    const confirmParticipant = newParticipant(
      activityId,
      title,
      image,
      toUser,
      id,
      fromUser
    );
    const message = newMessage(
      fromUser,
      name,
      organiserName,
      organiserAvatar,
      title
    );

    // console.log(JSON.stringify(confirmParticipant));
    // console.log(JSON.stringify(message));

    confirmParticipation(confirmParticipant, message);
    toastManager.add(
      "Participant has been confirmed for his attendance for your activity.",
      {
        appearance: "success",
        autoDismiss: true,
      }
    );
  };

  acceptOffer = (
    activityId,
    title,
    imageUrl,
    toUser,
    id,
    fromUser,
    fullName,
    avatar,
    organiserName,
    organiserAvatar
  ) => {
    this.props.changeParticipationStatus(id, "accepted");
    this.createCollaboration(
      activityId,
      title,
      imageUrl,
      toUser,
      id,
      fromUser,
      fullName,
      avatar,
      organiserName,
      organiserAvatar
    );
  };

  declineOffer = (confirmationId) => {
    this.props.changeParticipationStatus(confirmationId, "declined");
  };

  render() {
    let receivedRequests = null;

    if (this.props.received) {
      receivedRequests = this.props.received.map((data) => {
        if (data.activityData) {
          return (
            <div key={data.id} className={"receivedCards"}>
              {data.status === "accepted" ? (
                <h4 style={{ color: "#96bb7c" }}>Accepted </h4>
              ) : data.status === "declined" ? (
                <h4 style={{ color: "#e84a5f" }}>Declined</h4>
              ) : (
                <h4 style={{ color: "#ad9d9d" }}>Pending</h4>
              )}
              <p className="from-user">From: {data.userData.fullName} </p>
              <p className="activity">
                Activity: {data.activityData.data.title}
              </p>
              <p className="date">Date: {data.activityData.data.startDate}</p>
              <p className="user-note">Note from participant: {data.note}</p>

              <div className="button-group">
                {data.status === "pending" && !data.participantConfirmed ? (
                  <Aux>
                    <hr />
                    <button
                      className="success-button"
                      onClick={() =>
                        this.acceptOffer(
                          data.activityId,
                          data.activityData.data.title,
                          data.activityData.data.imageUrl,
                          data.toUser,
                          data.id,
                          data.fromUser,
                          data.userData.fullName,
                          data.userData.avatar,
                          data.organiserInfo.fullName,
                          data.organiserInfo.avatar
                        )
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="negative-button"
                      onClick={() => this.declineOffer(data.id)}
                    >
                      Decline
                    </button>
                  </Aux>
                ) : null}
              </div>
            </div>
          );
        }
        return receivedRequests;
      });
    }

    return (
      <div className="received-container">
        <h1 className="title">Received Requests</h1>
        <hr />
        <div className="received-wrapper">{receivedRequests}</div>
      </div>
    );
  }
}

const ReceivedRequestsWithToast = withToastManager(ReceivedRequests);

export default withAuthorization(ReceivedRequestsWithToast);
