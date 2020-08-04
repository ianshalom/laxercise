import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "80%",
};

class MyMapComponent extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{
          lat: this.props.lat,
          lng: this.props.lng,
        }}
      >
        <Marker onClick={this.onMarkerClick} name={this.props.name} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBq9JMmxOt0xZ_Vr2HLk7Y1emDWSKTYDuo",
})(MyMapComponent);

// import { compose, withProps } from "recompose";

// const MyMapComponent = compose(
//   withProps({
//     googleMapURL:
//       "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBq9JMmxOt0xZ_Vr2HLk7Y1emDWSKTYDuo",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
//   }),
//   withScriptjs,
//   withGoogleMap
// )((props) => (
//   <GoogleMap
//     key={props.id}
//     defaultZoom={14}
//     defaultCenter={{ lat: props.lat, lng: props.lng }}
//   >
//     {props.isMarkerShown && (
//       <Marker position={{ lat: props.lat, lng: props.lng }} />
//     )}
//   </GoogleMap>
// ));

// export default MyMapComponent;

// import React from "react";
// import {
//   GoogleMap,
//   Marker,
//   withScriptjs,
//   withGoogleMap,
// } from "react-google-maps";

// import { compose, withProps } from "recompose";

// const MyMapComponent = compose(
//   withProps({
//     googleMapURL:
//       "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBq9JMmxOt0xZ_Vr2HLk7Y1emDWSKTYDuo",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
//   }),
//   withScriptjs,
//   withGoogleMap
// )((props) => (
//   <GoogleMap
//     key={props.id}
//     defaultZoom={14}
//     defaultCenter={{ lat: props.lat, lng: props.lng }}
//   >
//     {props.isMarkerShown && (
//       <Marker position={{ lat: props.lat, lng: props.lng }} />
//     )}
//   </GoogleMap>
// ));

// export default MyMapComponent;
