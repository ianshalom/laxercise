import React, { useState } from "react";

import { withRouter, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../store/actions/auth";

import { useToasts } from "react-toast-notifications";
import "./Login.scss";

const Login = (props) => {
  const [redirect, setRedirect] = useState(false);
  const { addToast } = useToasts();
  const { register, handleSubmit } = useForm();

  const loginUser = (userData) => {
    login(userData).then(
      (_) => setRedirect(true),
      (errorMessage) =>
        addToast(errorMessage, {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        })
    );
  };

  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div className="auth-page">
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <h3 className="title has-text-grey">Login</h3>
          <p className="subtitle has-text-grey">Please login to proceed.</p>
          <div className="box">
            <figure className="avatar">
              <img src="https://placehold.it/128x128" alt="" />
            </figure>
            <form onSubmit={handleSubmit(loginUser)}>
              <div className="field">
                <div className="control">
                  <input
                    ref={register}
                    className="input is-large"
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input
                    ref={register}
                    name="password"
                    className="input is-large"
                    type="password"
                    placeholder="Your Password"
                    autoComplete="current-password"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="button is-block is-info is-large is-fullwidth"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
