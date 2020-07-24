import React, { Component } from "react";
// import Activities from "../../components/Activities/Activities";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class MyActivities extends Component {
  componentDidMount() {
    // console.log(this.props.userId);
    // console.log(this.props.loading);
    // console.log(this.props.error);
    // console.log(this.props.allActivities);
    // this.props.onGetActivities(this.props.userId);
  }

  render() {
    console.log(this.props.token);
    console.log(this.props.userId);
    console.log(this.props.activities);
    return (
      // <Activities />
      <h1>HELLLO</h1>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.tokenId,
    userId: state.auth.userId,
    activities: state.myActivities.myActivities,
    loading: state.myActivities.loading,
    error: state.myActivities.error,
    allActivities: state.activity.activityData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetActivities: (userId) => dispatch(actions.getMyActivities(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyActivities);
