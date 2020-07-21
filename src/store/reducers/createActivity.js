import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utility/utility";

const initialState = {
  activityData: [],
  lat: "",
  lng: "",
  loading: false,
  created: false,
};

const createActivityStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const createActivityFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const createActivitySuccess = (state, action) => {
  const newActivity = updateObject(action.activityData);
  return updateObject(state, {
    loading: false,
    created: true,
    activityData: state.activityData.push(newActivity),
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ACTIVITY_START:
      return createActivityStart(action, state);
    case actionTypes.CREATE_ACTIVITY_FAIL:
      return createActivityFail(action, state);
    case actionTypes.CREATE_ACTIVITY_SUCCESS:
      return createActivitySuccess(action, state);
    default:
      return state;
  }
};

export default reducer;
