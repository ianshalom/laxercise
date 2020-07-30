import React, { Component } from "react";
import withAuthorization from "../../hoc/withAuth";
import "./ReceivedRequest.css";

class SentRequests extends Component {
  componentDidMount() {
    this.props.sentRequests(this.props.currentUserId);
  }

  render() {
    // console.log(this.props.sent);

    let userInfo = null;
    if (this.props.sent) {
      userInfo = this.props.sent.map((data) => {
        return (
          <div key={data.id} className={"receivedCards"}>
            <h2>To: {data.userData.fullName}</h2>
            <p>Note: {data.note}</p>
            <p>Activity: {data.activityInfo.data.title}</p>
            <p>Date: {data.activityInfo.data.startDate}</p>
            <p>Time: {data.activityInfo.data.time + "00"} hours</p>
            <p>Location: {data.activityInfo.data.location}</p>
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

export default withAuthorization(SentRequests);
