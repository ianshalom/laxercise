import React, { Component } from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Aux from "../../hoc/Aux";
import "./RightNav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class RightNav extends Component {
  render() {
    return (
      <ul className={"Nav"} open={this.props.open}>
        {this.props.authState ? (
          <Aux>
            {" "}
            <li>
              <Link to="/create" className={"NavElements"}>
                Create
              </Link>
            </li>
            <li>
              <Link to="/requests/sent" className={"NavElements"}>
                Sent Requests
              </Link>
            </li>
            <li>
              <Link to="/requests/received" className={"NavElements"}>
                Received Requests
              </Link>
            </li>
          </Aux>
        ) : null}

        {!this.props.authState && (
          <>
            <li>
              <Link to="/login" className={"NavElements"}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className={"NavElements"}>
                Register
              </Link>
            </li>
          </>
        )}

        {this.props.authState ? (
          <Aux>
            {" "}
            <li>
              <Link to="/myactivities" className={"NavElements"}>
                My Activities
              </Link>
            </li>
            <li>
              <Link to="/messages" className={"NavElements"}>
                <FontAwesomeIcon icon="envelope" size="lg" />
              </Link>
            </li>
          </Aux>
        ) : null}
        {this.props.authState && (
          <div onClick={this.props.onLogout} className={"logout"}>
            <Link to="/" className={"NavElements"}>
              Logout
            </Link>
          </div>
        )}
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  authState: state.auth.isAuth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightNav);
