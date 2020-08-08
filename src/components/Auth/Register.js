import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
// import { useToasts } from "react-toast-notifications";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { register } from "../../store/actions/auth";

class Register extends Component {
  state = {
    redirect: false,
  };

  registerUser = (userData) => {
    register(userData);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) return <Redirect />;

    return (
      <div className="auth-page">
        <div className="container has-text-centered">
          <div className="column is-4 is-offset-4">
            <h3 className="title has-text-grey">Register</h3>
            <p className="subtitle has-text-grey">
              Please Register to proceed.
            </p>
            <div className="box">
              <RegisterForm onRegister={this.registerUser} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  // // const { addToast } = useToasts();
  // const [redirect, setRedirect] = useState(false);

  // const registerUser = (userData) => {

  // .then(
  //   (_) => setRedirect(true)

  // (errorMessage) =>
  //   addToast(errorMessage, {
  //     appearance: "error",
  //     autoDismiss: true,
  //     autoDimissTimeout: 3000,
  //   })
  // );
  // };

  // if (redirect) {
  //   return <Redirect to="/" />;
  // }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (data) => dispatch(actions.register(data)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Register));
