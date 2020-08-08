import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

class Listings extends Component {
  render() {
    const activityCard = (
      <>
        <div className={"card-image"}>
          <img
            className={"activity-image"}
            src={this.props.image}
            alt={this.props.title}
          />
        </div>
        <div className={"card-text"}>
          <h4 className={"card-title"}>{this.props.title}</h4>
          <p className={"card-description"}>
            {this.props.description.substring(0, 80)}...
          </p>
        </div>

        <Link key={this.props.id} to={"/listings/" + this.props.id}>
          <button className={"view-button"}>View Activity</button>
        </Link>

        <div className={"card-date"}>{this.props.startDate}</div>
      </>
    );
    return <div className={"card-grid"}>{activityCard}</div>;
  }
}

export default Listings;
