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
import SentRequestsPage from "./components/participation/SentRequest";
import ReceivedRequestsPage from "./components/participation/ReceivedRequest";
import Messages from "./components/Messages/ReceivedMessages";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faKey, faHome } from "@fortawesome/free-solid-svg-icons";

library.add(faEnvelope, faKey, faHome);
class App extends Component {
  componentDidMount() {
    this.unsubscribeAuth = actions.onAuthStateChanged((authUser) => {
      this.props.onResetAuth();
      this.props.onStoreAuth(authUser);
      if (authUser) {
        this.props.onGetMessages(authUser.uid);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeAuth();
  }

  render() {
    // {
    //   /* ; */
    // }
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
              <Route path="/requests/sent" component={SentRequestsPage} />
              <Route
                path="/requests/received"
                component={ReceivedRequestsPage}
              />
              <Route path="/myactivities" component={MyActivities} />
              <Route path="/messages" component={Messages} />
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
    onGetMessages: (authUserId) =>
      dispatch(actions.subscribeToMsgs(authUserId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
