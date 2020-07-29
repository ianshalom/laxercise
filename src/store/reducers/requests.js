import { combineReducers } from "redux";
import * as actionTypes from "../actions/actionTypes";

const createRequestList = (requestType) => {
  return (state = [], action) => {
    if (action.requestType !== requestType) {
      return state;
    }
    switch (action.type) {
      case actionTypes.FETCH_REQUESTS_SUCCESS:
        return action.requests;
      case actionTypes.USER_INFO_SUCCESS:
        return action.userInfo;
      default:
        return state;
    }
  };
};

const requests = combineReducers({
  received: createRequestList("received"),
  sent: createRequestList("sent"),
});

export default requests;
