import React, { Component } from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import Burger from "./Burger.js";

class Navigation extends Component {
  state = {
    toggle: false,
  };

  render() {
    return (
      <>
        <nav className={"MainNav"}>
          <div>
            <Link to="/" className={"NavBrand"}>
              Lax<span className={"ercise"}>Ercise</span>
            </Link>
          </div>
          {this.props.authState ? (
            <div
              className={"username"}
            >{`Hey ${this.props.auth.fullName}`}</div>
          ) : null}
          <Burger />
        </nav>
        <hr className={"nav-border"} />
      </>
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
