import React, { Component } from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Aux from "../../hoc/Aux";
import "./RightNav.css";
// import styled from "styled-components";

class RightNav extends Component {
  render() {
    // const UL = styled.ul`
    //   list-style: none;
    //   display: flex;
    //   flex-flow: row nowrap;

    //   li {
    //     padding: 18px 10px;
    //   }

    //   @media (max-width: 768px) {
    //     .Nav {
    //       flex-flow: column nowrap;
    //       background-color: #221f3b;
    //       position: fixed;
    //       top: 0;
    //       width: 50%;
    //       height: 60vh;
    //       padding-top: 3.5rem;
    //       padding: 10px;
    //       text-align: center;
    //     }
    //     .NavElements {
    //       color: white;
    //     }
    //   }
    //     .NavElements {
    //       color: white;
    //     }
    //   }
    // `;
    // ${({ open }) =>
    //     open
    //       ? console.log("translateX(0)")
    //       : console.log("translateX(100%)")};
    return (
      //   <UL open={this.props.open}>
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
                Messages
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
      //   </UL>
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
