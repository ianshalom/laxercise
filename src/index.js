import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import activityReducer from "./store/reducers/createActivity";
import authReducer from "./store/reducers/auth";
import myActivitiesReducer from "./store/reducers/myActivities";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import confirmation from "./store/reducers/confirmation";
import requests from "./store/reducers/requests";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  activity: activityReducer,
  auth: authReducer,
  myActivities: myActivitiesReducer,
  confirmation: confirmation,
  requests: requests,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App style={{ height: "100%" }} />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
