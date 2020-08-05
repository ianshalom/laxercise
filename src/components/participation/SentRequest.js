import React, { Component } from "react";
import withAuthorization from "../../hoc/withAuth";
import "./ReceivedRequest.css";
import { newParticipant, newMessage } from "../../helpers/activity";
import { confirmParticipation } from "../../store/actions/confirmation";
import { withToastManager } from "react-toast-notifications";

class SentRequests extends Component {
  componentDidMount() {
    this.props.sentRequests(this.props.currentUserId);
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
      toUser,
      name,
      organiserName,
      organiserAvatar,
      title
    );

    confirmParticipation(confirmParticipant, message);
    toastManager.add(
      "Participant has been confirmed for his attendance for your activity.",
      {
        appearance: "success",
        autoDismiss: true,
      }
    );
  };

  render() {
    let userInfo = null;
    if (this.props.sent) {
      userInfo = this.props.sent.map((data) => {
        return (
          <div key={data.id} className={"receivedCards"}>
            {data.status === "accepted" ? (
              <h4 style={{ color: "#96bb7c" }}>Accepted</h4>
            ) : data.status === "declined" ? (
              <h4 style={{ color: "#e84a5f" }}>Declined</h4>
            ) : (
              <h4 style={{ color: "#ad9d9d" }}>Pending</h4>
            )}

            <p>
              <span className="to-user">To:</span> {data.userData.fullName}
            </p>

            <p>
              <span className="activity grey-it">Activity:</span>{" "}
              {data.activityInfo.data.title}
            </p>
            <p>
              <span className="date grey-it">Date:</span>{" "}
              {data.activityInfo.data.startDate}
            </p>
            <p>
              <span className="time grey-it">Time:</span>{" "}
              {data.activityInfo.data.time + "00"} hours
            </p>
            <p>
              <span className="location grey-it">Location:</span>{" "}
              {data.activityInfo.data.location}
            </p>
            <p>
              <span className="note-to grey-it">Note:</span> {data.note}
            </p>
            {data.status === "accepted" && !data.participantConfirmed && (
              <div>
                <hr />
              </div>
            )}
          </div>
        );
      });
    }

    return (
      <div className="sent-container">
        <h1 className="title">Sent Requests</h1>
        <hr />
        <div className="sent-wrapper">{userInfo}</div>
      </div>
    );
  }
}
const SentRequestsWithToast = withToastManager(SentRequests);

export default withAuthorization(SentRequestsWithToast);
