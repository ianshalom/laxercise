import React, { Component } from "react";
import "./Create.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Listings extends Component {
  state = {
    title: "",
    description: "",
    startDate: "",
    time: "",
    coordinates: "",
    setLocation: "",
    location: "",
    participantLimit: "",
    imageUrl: "",
  };

  //Geolocation Coordinates
  handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    this.setState({
      coordinates: latLng,
      // location: results,
    });
  };

  handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  handleChange = (location) => {
    this.setState({
      location,
    });
  };

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleImageChange = (event) => {
    this.setState({
      imageUrl: event.target.value,
    });
  };

  handleParticipantLimitChange = (event) => {
    this.setState({
      participantLimit: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const formatDate = this.state.startDate.toDateString();
    const formatTime = this.state.startDate.getHours();
    const data = {
      title: this.state.title,
      description: this.state.description,
      startDate: formatDate,
      time: formatTime,
      coordinates: this.state.coordinates,
      location: this.state.location,
      participantLimit: this.state.participantLimit,
      imageUrl: this.state.imageUrl,
      // userId: this.props.userId,
    };
    console.log("CLICKEDDDDD-------------");
    this.props.onSubmitActivity(data);
  };

  render() {
    // console.log(this.props.token);
    // console.log(this.props.userId);
    return (
      <div onSubmit={this.handleSubmit} className={"container"}>
        <h1 style={{ textAlign: "center" }}>Organise an Activity</h1>
        <hr />
        <form>
          <label>Activity Title</label>
          <input
            type="text"
            name="title"
            onChange={this.handleTitleChange}
            value={this.state.title}
          />
          <label>Display an activity image. (Use Image URL)</label>
          <input
            type="text"
            name="image"
            onChange={this.handleImageChange}
            value={this.state.imageUrl}
          />
          <label>Set the maximum limit for number of participants.</label>
          <input
            type="text"
            name="maxParticipants"
            onChange={this.handleParticipantLimitChange}
            value={this.state.participantLimit}
          />
          <label>
            Add a description to your activity. (i.e. Things to bring, what to
            expect, timeline of activities)
          </label>
          <textarea
            type="text"
            name="description"
            onChange={this.handleDescriptionChange}
            value={this.state.description}
          />
          <label>Select start date and time. </label>
          <DatePicker
            name="dateAndTime"
            dateFormat="d MMM yyyy"
            minDate={new Date()}
            showTimeSelect
            selected={this.state.startDate}
            onChange={(date) =>
              this.setState({
                startDate: date,
                // time: date.getHours(),
              })
            }
            timeClassName={this.handleColor}
            value={this.state.startDate}
          />

          <label>Type in location and click on selected choice.</label>
          <PlacesAutocomplete
            value={this.state.location}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  type="text"
                  value={this.state.location}
                  {...getInputProps({ placeholder: "Enter Location" })}
                />
                <div>
                  {loading ? <div>...loading</div> : null}

                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#ceefe4" : "#fff",
                    };

                    return (
                      <div
                        key={suggestion.placeId}
                        id={suggestion.placeId}
                        {...getSuggestionItemProps(suggestion, { style })}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>

          <input type="submit" className={"button"} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    token: state.auth.tokenId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitActivity: (data) => dispatch(actions.createActivity(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listings);
