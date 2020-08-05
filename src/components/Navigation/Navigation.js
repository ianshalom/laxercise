import React, { Component } from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Burger from "./SideDrawer/Burger.js";
import Aux from "../../hoc/Aux";
import DrawerToggleButton from "./SideDrawer/DrawerToggleButton";

class Navigation extends Component {
  state = {
    toggle: false,
  };

  render() {
    return (
      <div className={"toolbar"}>
        <nav className={"MainNav"}>
          <div className="toolbar__toggle-button">
            <DrawerToggleButton click={this.props.drawerClickHandler} />
          </div>
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
          <div className={"spacer"}></div>
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
                  Log out
                </Link>
              </div>
            )}
          </ul>
        </nav>
        <hr className={"nav-border"} />
      </div>
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
