import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Navigation from "../Navigation/Navigation";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Backdrop2 from "../Navigation/SideDrawer/Backdrop2";

class Layout extends Component {
  state = {
    sideDrawerOpen: false,
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop2 click={this.backdropClickHandler} />;
    }

    return (
      <Aux>
        <Navigation drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
      </Aux>
    );
  }
}

export default Layout;
