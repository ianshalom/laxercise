import React, { Component } from "react";

import Spinner from "../UI/Spinner/Spinner";
import MyMapComponent from "./Map/Map";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Modal from "../UI/Modal/Modal";
import ActivitySummary from "./ActivitySummary/ActivitySummary";

import ActivityInformation from "./ActivityInformation/ActivityInformation";
import Participants from "./Participants/Participants";
import "./Listing.css";

class Listing extends Component {
  state = {
    markerShown: true,
    accepted: false,
    changed: false,
  };

  componentDidMount() {
    this.props.displayActivityById(this.props.match.params.listingId);
    this.props.onFetchParticipantsData(this.props.match.params.listingId);
  }

  refreshPage() {
    window.location.reload(false);
  }

  switchJoinStatusButton = (currentUserActivityData) => {
    switch (true) {
      case this.props.activity.uid === this.props.currentUser:
      case !this.props.isAuth:
        return;
      case currentUserActivityData === undefined:
        return (
          <button
            className={"join-button"}
            onClick={this.props.onJoinActivity}
            type="button"
          >
            Join
          </button>
        );
      case currentUserActivityData !== undefined ||
        currentUserActivityData.length !== 0:
        return (
          <button
            className={"join-button"}
            disabled
            style={{
              backgroundColor:
                currentUserActivityData.status === "accepted"
                  ? "green"
                  : currentUserActivityData.status === "declined"
                  ? "red"
                  : null,
            }}
          >
            {currentUserActivityData.status.toUpperCase()}
          </button>
        );
      default:
        return;
    }
  };

  render() {
    console.log(this.state.changed);

    let listing = null;
    if (this.props.activity && this.props.activityData) {
      let currentUserActivityDataIndex = null;
      currentUserActivityDataIndex = this.props.activityData.findIndex(
        (el) => el.fromUser === this.props.currentUser
      );
      const currentUserActivityData = this.props.activityData[
        currentUserActivityDataIndex
      ];

      console.log(this.props.statusChanged);
      listing = (
        <div>
          <Modal
            show={this.props.joining}
            modalClosed={this.props.onModalClosed}
          >
            <ActivitySummary
              activity={this.props.activity}
              user={this.props.userInfo}
              modalClosed={this.props.onModalClosed}
              confirmation={this.props.onConfirmation}
              currentUser={this.props.currentUser}
              activityId={this.props.match.params.listingId}
              refresh={this.refreshPage}
            />
          </Modal>

          <div className={"join-button-container"}>
            {this.switchJoinStatusButton(currentUserActivityData)}
          </div>

          <div className={"whole-container"}>
            <h1 className={"header"}>{this.props.activity.title}</h1>

            <hr />
            <div className={"top-container"}>
              <div className={"map-container"}>
                <MyMapComponent
                  isMarkerShown={this.state.markerShown}
                  lat={this.props.lat}
                  lng={this.props.lng}
                  id={this.state.listingId}
                  name={this.props.activity.location}
                />
              </div>
              <div className={"activity-information"}>
                <ActivityInformation
                  title={this.props.activity.title}
                  description={this.props.activity.description}
                  date={this.props.activity.startDate}
                  time={this.props.activity.time}
                  location={this.props.activity.location}
                  currentUsername={this.props.currentUsername}
                  by={this.props.activity.createdBy}
                />
              </div>
              <div className={"participants-container"}>
                <Participants participants={this.props.participantData} />
              </div>{" "}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={"listing-container"}>
        {this.props.loading ? <Spinner /> : listing}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    activity: state.activity.selectedActivity.data,
    userInfo: state.activity.selectedActivity.user,
    activityData: state.activity.selectedActivity.activityInfo,
    lat: state.activity.lat,
    lng: state.activity.lng,
    loading: state.activity.loading,
    joining: state.activity.joining,
    userId: state.activity.activityData.userId,
    currentUser: state.auth.uid,
    activityId: state.activity.activityId,
    isAuth: state.auth.isAuth,
    showButton: state.activity.showButton,
    statusChanged: state.confirmation.statusChanged,
    usersWhoHaveJoined: state.requests.received,
    participantData: state.activity.participantData,
    currentUsername: state.auth.currentUserName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    displayActivityById: (id) => dispatch(actions.displayActivity(id)),
    onJoinActivity: () => dispatch(actions.joinActivity()),
    onModalClosed: () => dispatch(actions.modalClosed()),
    onConfirmation: () => dispatch(actions.createConfirmation()),
    onFetchParticipantsData: (id) =>
      dispatch(actions.fetchUserDataByActivityId(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
