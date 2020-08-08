import React, { Component } from "react";
import "./Create.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { Redirect } from "react-router-dom";
import isImageUrl from "is-image-url";
import withAuthorization from "../../hoc/withAuth";

class Listings extends Component {
  state = {
    title: "",
    titleError: "",
    description: "",
    descriptionError: "",
    startDate: "",
    startDateError: "",
    time: "",
    coordinates: "",
    setLocation: "",
    location: "",
    locationError: "",
    imageUrl: "",
    imageUrlError: "",
    address: "",
  };

  //##################################################

  componentDidMount() {
    if (this.props.redirect) {
      return <Redirect to="/" />;
    }
    this.props.onGetUserName(this.props.currentUserId);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.title !== this.state.title) {
  //     return <Redirect to="/" />;
  //   }
  // }

  validate = () => {
    console.log(this.state.description.length);
    let titleError = "";
    let descriptionError = "";
    let locationError = "";
    let imageUrlError = "";
    let startDateError = "";

    //Activity Title Validation
    if (this.state.title.length === 0) {
      titleError = "Activity title cannot be left blank.";
    } else if (this.state.title.length < 6 || this.state.title.length > 20) {
      titleError =
        "Please ensure your activity title is between 6 to 20 characters long.";
    }

    if (titleError) {
      this.setState({ titleError });
      return false;
    }

    //Image Validation
    // https://images.unsplash.com/photo-1427384906349-30452365b5e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80

    if (this.state.imageUrl.length === 0) {
      imageUrlError = "Please add an image for your activity.";
    } else if (isImageUrl(this.state.imageUrl) === false) {
      imageUrlError =
        "Please ensure that your image is of the right file extension.";
    }

    if (imageUrlError) {
      this.setState({ imageUrlError });
      return false;
    }

    //Description Validation
    if (this.state.description.length === 0) {
      descriptionError = "Please write a description for your activity.";
    } else if (this.state.description.length > 600) {
      descriptionError =
        "Please keep your description within 150 characters long.";
    }

    if (descriptionError) {
      this.setState({ descriptionError });
      return false;
    }

    //Time and Date validation
    if (this.state.startDate.length === 0) {
      startDateError = "Please select a date and time for your activity.";
    }

    if (startDateError) {
      this.setState({ startDateError });
      return false;
    }

    //Location Validation

    if (this.state.location.address === 0) {
      locationError = "Please enter a location.";
    }
    if (locationError) {
      this.setState({ locationError });
      return false;
    }

    return true;
  };

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

  formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const isValid = this.validate();
    if (isValid) {
      const formattedDate = this.state.startDate.toDateString();
      const formattedTime = this.formatAMPM(this.state.startDate);

      const data = {
        title: this.state.title,
        description: this.state.description,
        startDate: formattedDate,
        time: formattedTime,
        coordinates: this.state.coordinates,
        location: this.state.address,
        imageUrl: this.state.imageUrl,
        uid: this.props.currentUserId,
        createdBy: this.props.currentUserName,
      };

      console.log("CLICKEDDDDD-------------");
      // this.props.onCreateActivity();
      this.props.onSubmitActivity(data);
    } else {
      return;
    }
  };

  render() {
    if (this.props.created) {
      return <Redirect to="/" />;
    }
    return (
      <div onSubmit={this.handleSubmit} className={"container"}>
        <h1
          style={{
            textAlign: "center",
            paddingTop: "20px",
            marginBottom: "50px",
          }}
        >
          Organise an Activity
        </h1>

        <form>
          <label>Activity Title</label>
          <input
            type="text"
            name="title"
            onChange={this.handleTitleChange}
            value={this.state.title}
            // required
          />
          <p className="errorMessages" style={{ color: "red" }}>
            {this.state.titleError}
          </p>
          <label>Display an activity image. (ext. png | jpg | jpeg)</label>
          <input
            type="text"
            name="image"
            onChange={this.handleImageChange}
            value={this.state.imageUrl}
            // required
          />
          <p className="errorMessages" style={{ color: "red" }}>
            {this.state.imageUrlError}
          </p>
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
          <p className="errorMessages" style={{ color: "red" }}>
            {this.state.descriptionError}
          </p>
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
          />
          <p className="errorMessages" style={{ color: "red" }}>
            {this.state.startDateError}
          </p>

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
                  // required
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
          <p className="errorMessages" style={{ color: "red" }}>
            {this.state.locationError}
          </p>

          <input type="submit" className={"button"} />
        </form>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     // userId: state.auth.uid,
//     // loading: state.activity.loading,
//     // created: state.activity.created,
//     // currentUserName: state.auth.currentUserName,
//     // redirect: state.auth.redirect,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onSubmitActivity: (data) => dispatch(actions.createActivity(data)),
//     onCreateActivity: () => dispatch(actions.createInit()),
//     // onGetUserName: (uid) => dispatch(actions.getUserName(uid)),
//   };
// };

export default withAuthorization(Listings);
