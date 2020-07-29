import React, { Component } from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Aux from "../../hoc/Aux";
class Navigation extends Component {
  render() {
    return (
      <nav className={"MainNav"}>
        <ul className={"Nav"}>
          {this.props.authState ? (
            <div>{`Hey ${this.props.auth.fullName}`}</div>
          ) : null}
          <li>
            <Link to="/" className={"NavBrand"}>
              LaxErcise
            </Link>
          </li>

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
          {this.props.authState && (
            <li>
              <Link to="/" className={"NavElements"}>
                <button onClick={this.props.onLogout}>Logout</button>
              </Link>
            </li>
          )}
          {this.props.authState ? (
            <li>
              <Link to="/myactivities" className={"NavElements"}>
                My Activities
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
