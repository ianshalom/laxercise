import React, { Component } from "react";
import Listings from "../../components/Listings/Listings";

import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class Listing extends Component {
  componentDidMount() {
    this.props.onFetchActivitiesList();
  }

  render() {
    console.log(this.props.activities);
    let listings = null;
    if (this.props.activities) {
      listings = this.props.activities.map((listing) => {
        console.log(listing.data.title);
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
        <div className="row">{this.props.loading ? <Spinner /> : listings}</div>{" "}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activities: state.activity.activityData,
    loading: state.activity.loading,
    token: state.auth.tokenId,
    id: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchActivitiesList: () => dispatch(actions.getActivitiesList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
