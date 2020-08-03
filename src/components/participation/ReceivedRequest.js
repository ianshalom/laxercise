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
  // this.createCollaboration(
  //                       activityId,
  //                       activityData.data.title,
  //                       activityData.data.imageUrl,
  //                       toUser,
  //                       id,
  //                       fromUser,
  //                       userData.fullName,
  //                       userData.avatar,
  //                       organiserInfo.fullName,
  //                       organiserInfo.avatar
  //                     )
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
    // console.log(this.props.received);
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
            <h2>From: {data.userData.fullName} </h2>
            <h4>Activity: {data.activityData.data.title}</h4>
            <h6>Date: {data.activityData.data.startDate}</h6>
            <img src={data.userData.avatar} alt="" />
            <p>Note from participant: {data.note}</p>

            {data.status === "pending" && !data.participantConfirmed ? (
              <Aux>
                <hr />
                <button
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
                <button onClick={() => this.declineOffer(data.id)}>
                  Decline
                </button>
              </Aux>
            ) : null}
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

const ReceivedRequestsWithToast = withToastManager(ReceivedRequests);

export default withAuthorization(ReceivedRequestsWithToast);
