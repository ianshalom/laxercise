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
  };

  componentDidMount() {
    this.props.displayActivityById(this.props.match.params.listingId);
  }

  render() {
    let listing = null;
    if (this.props.activity) {
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
          startDate
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
            {this.props.activity.uid === this.props.currentUser ? null : (
              <button onClick={this.props.onJoinActivity} type="button">
                Join
              </button>
            )}
          </div>
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
    lat: state.activity.lat,
    lng: state.activity.lng,
    loading: state.activity.loading,
    joining: state.activity.joining,
    userId: state.activity.activityData.userId,
    currentUser: state.auth.uid,
    activityId: state.activity.activityId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    displayActivityById: (id) => dispatch(actions.displayActivity(id)),
    onJoinActivity: () => dispatch(actions.joinActivity()),
    onModalClosed: () => dispatch(actions.modalClosed()),
    onConfirmation: () => dispatch(actions.createConfirmation()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
