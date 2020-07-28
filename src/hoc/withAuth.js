import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../store/actions/index";

const withAuthorization = (Component) => {
  class WithAuthorization extends React.Component {
    render() {
      return this.props.auth.isAuth ? (
        <Component
          auth={this.props.auth}
          getMyActivities={(id) => this.props.onGetMyActivities(id)}
          myActivities={this.props.myActivities}
          loading={this.props.loading}
        />
      ) : (
        <Redirect to="/login" />
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      auth: state.auth,
      myActivities: state.myActivities.myActivities,
      loading: state.myActivities.loading,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      onGetMyActivities: (userId) => dispatch(actions.getMyActivities(userId)),
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithAuthorization);
};

export default withAuthorization;
