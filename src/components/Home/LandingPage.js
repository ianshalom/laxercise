import React, { Component } from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class LandingPage extends Component {
  render() {
    return (
      <section className={"landing-section"}>
        <div className={"landing-container"}>
          <div className={"media-object"}>
            <div className={"landing-image-container"}>
              <img
                className={"landing-image"}
                src="images/jogging.jpg"
                alt="jogging"
              ></img>
            </div>
            <div className={"landing-intro"}>
              <h3 className={"landing-header"}>Welcome to LaxErcise!</h3>
              <div className={"landing-text"}>
                With the nation growing more health-conscious, citizens are
                swapping their sedentary lifestyles for a more active one,
                taking up activities such as Yoga and Jogging amongst a host of
                others. Here at LaxErcise, we provide users with a platform that
                is hassle-free and easy-to-use regardless of whether you're
                looking to organise an activity or join one.
              </div>
              {this.props.authState ? null : (
                <div className={"cta"}>
                  <h5 className={"cta-header"}>
                    Looking to partcipate? Sign up with us first!
                  </h5>
                  <Link to="/register" className={"cta-button"}>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  authState: state.auth.isAuth,
});

export default connect(mapStateToProps)(LandingPage);
