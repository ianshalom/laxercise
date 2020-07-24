import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import Create from "./container/Create/Create";
// import Listing from "./container/Listing/Listing";
import ListingPage from "./components/Listings/Listing";
import Home from "./components/Home/Home";
import MyActivities from "./container/MyActivities/MyActivities";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

class App extends Component {
  render() {
    return (
      <ToastProvider>
        <Router>
          <div>
            <Layout />
            <Switch>
              {/* <Route path="/listings" exact component={Listing} /> */}
              <Route path="/listings/:listingId" component={ListingPage} />
              {/* <Route path="/mappedLocation" component={MappedLocation} /> */}
              <Route path="/create" component={Create} />

              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/myactivities" component={MyActivities} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </Router>
      </ToastProvider>
    );
  }
}

export default App;
