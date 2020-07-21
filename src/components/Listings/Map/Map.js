import React from "react";
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
} from "react-google-maps";

import { compose, withProps } from "recompose";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBq9JMmxOt0xZ_Vr2HLk7Y1emDWSKTYDuo",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    key={props.id}
    defaultZoom={14}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && (
      <Marker position={{ lat: props.lat, lng: props.lng }} />
    )}
  </GoogleMap>
));

export default MyMapComponent;
