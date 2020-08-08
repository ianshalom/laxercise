import React, { Component } from "react";
import Listings from "../../components/Listings/Listings";
import WithAuthorization from "../../hoc/withAuth";
import "./MyActivities.css";
import Spinner from "../../components/UI/Spinner/Spinner";

class MyActivities extends Component {
  componentDidMount() {
    this.props.getMyActivities(this.props.auth.uid);
  }
  render() {
    let myActivitiesCards = null;
    if (this.props.myActivities) {
      myActivitiesCards = this.props.myActivities.map((listing) => {
        return (
          <Listings
            key={listing.id}
            title={listing.data.title}
            description={listing.data.description}
            startDate={listing.data.startDate}
            lat={listing.data.coordinates.lat}
            lng={listing.data.coordinates.lng}
            image={listing.data.imageUrl}
          />
        );
      });
    }

    return (
      <div className="container">
        <div className="row container" style={{ textAlign: "center" }}>
          {this.props.loading ? <Spinner /> : myActivitiesCards}
        </div>
      </div>
    );
  }
}

export default WithAuthorization(MyActivities);
