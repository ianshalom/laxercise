import React, { Component } from "react";

import Spinner from "../UI/Spinner/Spinner";
import MyMapComponent from "./Map/Map";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Listing extends Component {
  state = {
    markerShown: true,
  };

  componentDidMount() {
    this.props.displayActivityById(this.props.match.params.listingId);
    console.log(this.props.match.params.listingId);
  }

  render() {
    console.log(this.props.activity);
    let listing = null;
    if (this.props.activity) {
      listing = (
        <div>
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
    activity: state.activity.selectedActivity,
    lat: state.activity.lat,
    lng: state.activity.lng,
    loading: state.activity.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    displayActivityById: (id) => dispatch(actions.displayActivity(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
