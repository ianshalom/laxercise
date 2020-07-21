import React, { Component } from "react";
import axios from "../../axios-create";
import Spinner from "../UI/Spinner/Spinner";
import MyMapComponent from "./Map/Map";

class Listing extends Component {
  state = {
    listing: [],
    lng: null,
    lat: null,
    loading: true,
    markerShown: true,
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
    let listing = null;
    if (this.state.listing) {
      listing = (
        <div>
          <h2>TITLE: {this.state.listing.title}</h2>
          <p>DESCRIPTION: {this.state.listing.description}</p>
          <p>START DATE: {this.state.listing.startDate}</p>
          <p>START TIME: {this.state.listing.time}</p>
          <p>
            {this.state.listing.location
              ? this.state.listing.location
              : "No Location Listed ... "}
          </p>
          <p>LATITUDE: {this.state.lat}</p>
          <p>LONGDITUTE: {this.state.lng}</p>
          <div>
            <img src={this.state.listing.imageUrl} alt="" />
          </div>
          <MyMapComponent
            isMarkerShown={this.state.markerShown}
            lat={this.state.lat}
            lng={this.state.lng}
            id={this.state.listing.id}
          />
        </div>
      );
    }
    return <div>{this.state.loading ? <Spinner /> : listing}</div>;
  }
}
export default Listing;
