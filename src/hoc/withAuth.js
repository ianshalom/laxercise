import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../store/actions/index";

const withAuthorization = (Component) => {
  class WithAuthorization extends React.Component {
    render() {
      return this.props.auth.isAuthResolved ? (
        <Component
          auth={this.props.auth}
          getMyActivities={(id) => this.props.onGetMyActivities(id)}
          myActivities={this.props.myActivities}
          loading={this.props.loading}
          currentUserId={this.props.currentUser}
          sentRequests={this.props.onSentRequests}
          receivedRequests={this.props.onReceivedRequests}
          sent={this.props.sentRequests}
          received={this.props.receivedRequests}
          changeParticipationStatus={this.props.onParticipantStatusChange}
          messages={this.props.messages}
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
      currentUser: state.auth.uid,
      sentRequests: state.requests.sent,
      receivedRequests: state.requests.received,
      messages: state.auth.user.messages,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      onGetMyActivities: (userId) => dispatch(actions.getMyActivities(userId)),
      onSentRequests: (id) => dispatch(actions.fetchSentRequests(id)),
      onReceivedRequests: (id) => dispatch(actions.fetchReceivedRequests(id)),
      onParticipantStatusChange: (confirmationId, status) =>
        dispatch(actions.changeParticipationStatus(confirmationId, status)),
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithAuthorization);
};

export default withAuthorization;
