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
              <h1>Accepted</h1>
            ) : data.status === "declined" ? (
              <h1>Declined</h1>
            ) : (
              <h1>Pending</h1>
            )}

            <h2>To: {data.userData.fullName}</h2>
            <p>Note: {data.note}</p>
            <p>Activity: {data.activityInfo.data.title}</p>
            <p>Date: {data.activityInfo.data.startDate}</p>
            <p>Time: {data.activityInfo.data.time + "00"} hours</p>
            <p>Location: {data.activityInfo.data.location}</p>
            {data.status === "accepted" && !data.participantConfirmed && (
              <div>
                <hr />
                {/* <button
                  onClick={() =>
                    this.createCollaboration(
                      data.activityId,
                      data.activityInfo.data.title,
                      data.activityInfo.data.imageUrl,
                      data.toUser,
                      data.id,
                      data.fromUser,
                      data.userData.fullName,
                      data.userData.avatar,
                      data.organiserData.fullName,
                      data.organiserData.avatar
                    )
                  }
                >
                  Collaborate
                </button> */}
              </div>
            )}
          </div>
        );
      });
    }

    return (
      <div className="container">
        <div className="content-wrapper">
          <h1 className="title">Sent Requests</h1>
          <div className="columns">
            <div className="column is-one-third">{userInfo}</div>
          </div>
        </div>
      </div>
    );
  }
}
const SentRequestsWithToast = withToastManager(SentRequests);

export default withAuthorization(SentRequestsWithToast);
