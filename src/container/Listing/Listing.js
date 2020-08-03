import React, { Component } from "react";
import Listings from "../../components/Listings/Listings";
import "./Listing.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class Listing extends Component {
  componentDidMount() {
    this.props.onFetchActivitiesList();
  }

  render() {
    let listings = null;
    console.log(this.props.activities);
    if (this.props.activities || this.props.activities === []) {
      listings = this.props.activities.map((listing) => {
        return (
          <Listings
            key={listing.id}
            id={listing.id}
            title={listing.data.title}
            description={listing.data.description}
            startDate={listing.data.startDate}
            lat={listing.data.coordinates.lat}
            lng={listing.data.coordinates.lng}
          />
        );
      });
    }

    return (
      <div className="container">
        <div className="row displayActivities">
          {this.props.loading ? <Spinner /> : listings}
        </div>{" "}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activities: state.activity.activityData,
    loading: state.activity.loading,
    id: state.auth.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchActivitiesList: () => dispatch(actions.getActivitiesList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
