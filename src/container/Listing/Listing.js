import React, { Component } from "react";
import Listings from "../../components/Listings/Listings";
import axios from "../../axios-create";

class Listing extends Component {
  state = {
    activities: null,
  };
  componentDidMount() {
    axios
      .get("/activity.json")
      .then((res) => {
        const activities = [];
        for (let key in res.data) {
          activities.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({
          ...activities,
          activities: activities,
        });
        console.log(this.state.activities);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let listings = null;
    if (this.state.activities) {
      listings = this.state.activities.map((listing) => {
        return (
          <Listings
            key={listing.id}
            title={listing.title}
            description={listing.description}
            startDate={listing.startDate}
            lat={listing.coordinates.lat}
            lng={listing.coordinates.lng}
          />
        );
      });
    }

    return (
      <div class="container">
        <div class="row">{listings}</div>{" "}
      </div>
    );
  }
}

export default Listing;
