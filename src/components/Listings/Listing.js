import React, { Component } from "react";

import Spinner from "../UI/Spinner/Spinner";
import MyMapComponent from "./Map/Map";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Modal from "../UI/Modal/Modal";
import ActivitySummary from "./ActivitySummary";

class Listing extends Component {
  state = {
    markerShown: true,
    accepted: false,
  };

  componentDidMount() {
    this.props.displayActivityById(this.props.match.params.listingId);
    this.props.onFetchParticipantsData(this.props.match.params.listingId);
  }

  render() {
    let listing = null;

    console.log(this.props.participantData);
    let participants = null;
    if (this.props.participantData) {
      participants = this.props.participantData.map((participant) => {
        return (
          <div>
            <div style={{ height: "200px", width: "180px" }}>
              <img
                style={{ height: "200px", width: "180px" }}
                src={participant.profileData.avatar}
                alt=""
              />
            </div>
            <h3>Name: {participant.profileData.fullName}</h3>
          </div>
        );
      });
    }

    if (this.props.activity && this.props.activityData) {
      let currentUserActivityDataIndex = null;
      currentUserActivityDataIndex = this.props.activityData.findIndex(
        (el) => el.fromUser === this.props.currentUser
      );
      const currentUserActivityData = this.props.activityData[
        currentUserActivityDataIndex
      ];

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
            />
          </Modal>

          <h2>TITLE: {this.props.activity.title}</h2>
          <p>DESCRIPTION: {this.props.activity.description}</p>
          <p>START DATE: {this.props.activity.startDate}</p>
          <p>START TIME: {this.props.activity.time}</p>
          <p>
            {this.props.activity.location
              ? this.props.activity.location
              : "No Location Listed ... "}
          </p>
          <p>LATITUDE: {this.props.lat}</p>
          <p>LONGDITUTE: {this.props.lng}</p>
          <div>
            <img src={this.props.activity.imageUrl} alt="" />
            {this.props.activity.uid === this.props.currentUser ||
            !this.props.isAuth ? null : !currentUserActivityData &&
              !this.state.clicked ? (
              <button onClick={this.props.onJoinActivity} type="button">
                Join
              </button>
            ) : (
              <button
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
            )}
          </div>
          <div>{participants}</div>
          <MyMapComponent
            isMarkerShown={this.state.markerShown}
            lat={this.props.lat}
            lng={this.props.lng}
            id={this.state.listingId}
            name={this.props.activity.location}
          />
        </div>
      );
    }
    return <div>{this.props.loading ? <Spinner /> : listing}</div>;
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
    confirmed: state.confirmation.confirmed,
    usersWhoHaveJoined: state.requests.received,
    participantData: state.activity.participantData,
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
