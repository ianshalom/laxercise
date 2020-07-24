import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utility/utility";

const initialState = {
  activityData: [],
  selectedActivity: [],
  lat: "",
  lng: "",
  loading: false,
  created: false,
};

//ADDING ACTIVITY TO DB
const createActivityStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const createActivityFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const createActivitySuccess = (state, action) => {
  const newActivity = updateObject(action.activityData, {
    id: action.activityId,
  });

  return updateObject(state, {
    loading: false,
    created: true,
    activityData: newActivity,
  });
};

//FETCHING ACTIVITIES TO LIST
const getActivitiesListStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const getActivitiesListSuccess = (state, action) => {
  return updateObject(state, {
    activityData: action.activities,
    loading: false,
  });
};
const getActivitiesListFail = (state, action) => {
  return updateObject(state, { loading: false });
};

//FETCH SELECTED ACTIVITY BASED ON ID
const displayActivitySuccess = (state, action) => {
  console.log(action.activity.data.coordinates);
  return updateObject(state, {
    selectedActivity: action.activity.data,
    lat: action.activity.data.coordinates.lat,
    lng: action.activity.data.coordinates.lng,
    loading: false,
  });
};
const displayActivityStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const displayActivityFail = (state, action) => {
  return updateObject(state, { loading: false });
};
//REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ACTIVITY_START:
      return createActivityStart(action, state);
    case actionTypes.CREATE_ACTIVITY_FAIL:
      return createActivityFail(action, state);
    case actionTypes.CREATE_ACTIVITY_SUCCESS:
      return console.log(createActivitySuccess(state, action));
    case actionTypes.GET_ACTIVITIES_LIST_START:
      return getActivitiesListStart(state, action);
    case actionTypes.GET_ACTIVITIES_LIST_FAIL:
      return getActivitiesListFail(state, action);
    case actionTypes.GET_ACTIVITIES_LIST_SUCCESS:
      return getActivitiesListSuccess(state, action);
    case actionTypes.DISPLAY_ACTIVITY_START:
      return displayActivityStart(state, action);
    case actionTypes.DISPLAY_ACTIVITY_FAIL:
      return displayActivityFail(state, action);
    case actionTypes.DISPLAY_ACTIVITY_SUCCESS:
      return displayActivitySuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
