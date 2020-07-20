import React, { Component } from "react";
import Listings from "../../components/Listings/Listings";
import axios from "../../axios-create";
import Spinner from "../../components/UI/Spinner/Spinner";

class Listing extends Component {
  state = {
    activities: null,
    loading: true,
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
          loading: false,
        });
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
            id={listing.id}
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
      <div className="container">
        <div className="row">{this.state.loading ? <Spinner /> : listings}</div>{" "}
      </div>
    );
  }
}

export default Listing;
