import React from "react";

const Listings = (props) => {
  const activityCard = (
    <div className="card text-center">
      <div className="card-header">Featured</div>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description}</p>
        <a href="/" className="btn btn-primary">
          Sign Up!
        </a>
      </div>
      <div class="card-footer text-muted">When? {props.startDate}</div>
    </div>
  );

  return <div className="col-sm mt-4">{activityCard}</div>;
};

export default Listings;
