import React, { Component } from "react";
import axios from "../../axios-create";
import Spinner from "../UI/Spinner/Spinner";

class Listing extends Component {
  state = {
    listing: [],
    lng: null,
    lat: null,
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/activity.json/", this.props.match.params.listingId)
      .then((res) => {
        this.setState({
          ...this.state.listing,
          listing: res.data[this.props.match.params.listingId],
          lng: res.data[this.props.match.params.listingId].coordinates.lng,
          lat: res.data[this.props.match.params.listingId].coordinates.lat,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    console.log(this.props.match.params.listingId);

    let listing = null;
    if (this.state.listing) {
      listing = (
        <div>
          <h2>{this.state.listing.title}</h2>
          <p>{this.state.listing.description}</p>
          <p>{this.state.listing.startDate}</p>
          <p>
            {this.state.listing.location
              ? this.state.listing.location
              : "No Location Listed ... "}
          </p>
          <p>LATITUDE: {this.state.lat}</p>
          <p>LONGDITUTE: {this.state.lng}</p>
        </div>
      );
    }
    return <div>{this.state.loading ? <Spinner /> : listing}</div>;
  }
}
export default Listing;
