import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import * as actions from "./store/actions/index";
import Spinner from "./components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import Create from "./container/Create/Create";
// import Listing from "./container/Listing/Listing";
import ListingPage from "./components/Listings/Listing";
import Home from "./components/Home/Home";
import MyActivities from "./container/MyActivities/MyActivities";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

class App extends Component {
  componentDidMount() {
    this.unsubscribeAuth = actions.onAuthStateChanged((authUser) => {
      this.props.onResetAuth();
      this.props.onStoreAuth(authUser);
    });
  }

  componentWillUnmount() {
    this.unsubscribeAuth();
  }

  render() {
    let renderApplication = <Spinner />;
    if (this.props.authResolved) {
      renderApplication = (
        <ToastProvider>
          <Router>
            <Layout />
            <Switch>
              <Route path="/listings/:listingId" component={ListingPage} />
              <Route path="/create" component={Create} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/myactivities" component={MyActivities} />
              <Route path="/" component={Home} />
            </Switch>
          </Router>
        </ToastProvider>
      );
    }

    return <div>{renderApplication}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    authResolved: state.auth.isAuthResolved,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStoreAuth: (authUser) => dispatch(actions.storeAuthUser(authUser)),
    onResetAuth: () => dispatch(actions.resetAuthState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
