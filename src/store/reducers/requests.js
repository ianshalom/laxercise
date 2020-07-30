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
      case actionTypes.CHANGE_PARTICIPATION_STATUS_SUCCESS:
        const nextState = [...state];
        const confirmationIndex = nextState.findIndex(
          (o) => o.id === action.confirmationId
        );
        nextState[confirmationIndex].status = action.status;
        return nextState;
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
