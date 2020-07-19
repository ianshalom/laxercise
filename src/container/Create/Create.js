import React, { Component } from "react";
import Create from "../../components/Create/Create";

class CreateActivity extends Component {
  state = {
    title: "",
    description: "",
    date: "",
    location: "",
  };

  render() {
    return (
      <Create
        title={this.state.title}
        description={this.state.description}
        date={this.state.date}
        location={this.state.location}
      />
    );
  }
}

export default CreateActivity;
