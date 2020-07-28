import React, { Component } from "react";
import { Link } from "react-router-dom";

class Listings extends Component {
  render() {
    const activityCard = (
      <div className="card text-center">
        <div className="card-header">Featured</div>
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <p className="card-text">{this.props.description}</p>
          <Link key={this.props.id} to={"/listings/" + this.props.id}>
            <button className="btn btn-primary">View full page</button>
          </Link>
        </div>
        <div className="card-footer text-muted">
          When? {this.props.startDate}
        </div>
      </div>
    );
    return (
      <div className="col-sm mt-4" key={this.props.key}>
        {activityCard}
      </div>
    );
  }
}

export default Listings;
