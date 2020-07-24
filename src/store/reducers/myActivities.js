import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utility/utility";

const initialState = {
  myActivities: [],
  loading: false,
  error: null,
};

const myActivitiesStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const myActivitiesSuccess = (state, action) => {
  const myActivities = updateObject(action.fetchActivities);
  return updateObject(state, {
    loading: false,
    myActivities: state.myActivities.push(myActivities),
  });
};

const myActivitiesFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MY_ACTIVITIES_START:
      return myActivitiesStart(state, action);
    case actionTypes.MY_ACTIVITIES_SUCCESS:
      return myActivitiesSuccess(state, action);
    case actionTypes.MY_ACTIVITIES_FAIL:
      return myActivitiesFail(state, action);
    default:
      return state;
  }
};

export default reducer;
