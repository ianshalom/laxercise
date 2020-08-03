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
import { Redirect } from "react-router-dom";

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
    address: "",
  };

  //##################################################

  componentDidMount() {
    if (this.props.redirect) {
      return <Redirect to="/" />;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.title !== this.state.title) {
      return <Redirect to="/" />;
    }
  }

  //Geolocation Coordinates
  handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    console.log(value);
    const latLng = await getLatLng(results[0]);
    this.setState({
      coordinates: latLng,
      address: value,
    });
  };

  handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  handleChange = (address) => {
    this.setState({
      address,
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
      location: this.state.address,
      participantLimit: this.state.participantLimit,
      imageUrl: this.state.imageUrl,
      uid: this.props.userId,
    };
    console.log("CLICKEDDDDD-------------");
    this.props.onCreateActivity();
    this.props.onSubmitActivity(data);
  };

  render() {
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
            required
          />
          <label>Display an activity image. (Use Image URL)</label>
          <input
            type="text"
            name="image"
            onChange={this.handleImageChange}
            value={this.state.imageUrl}
            required
          />
          <label>Set the maximum limit for number of participants.</label>
          <input
            type="number"
            name="maxParticipants"
            onChange={this.handleParticipantLimitChange}
            value={this.state.participantLimit}
            required
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
            required
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
              })
            }
            timeClassName={this.handleColor}
            value={this.state.startDate}
            required
          />

          <label>Type in location and click on selected choice.</label>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            required
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  // type="text"
                  // value={this.state.value}
                  {...getInputProps({ placeholder: "Enter Location" })}
                  required
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
    userId: state.auth.uid,
    loading: state.activity.loading,
    created: state.activity.created,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitActivity: (data) => dispatch(actions.createActivity(data)),
    onCreateActivity: () => dispatch(actions.createInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listings);
