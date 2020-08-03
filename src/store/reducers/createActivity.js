import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utility/utility";

const initialState = {
  activityData: [],
  selectedActivity: [],
  participantData: [],
  lat: "",
  lng: "",
  loading: false,
  created: false,
  activityId: null,
  joining: false,
};

//ADDING ACTIVITY TO DB
const createActivityStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const createActivitySuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    created: true,
    activityData: action.activityData,
  });
};

const createInit = (state, action) => {
  return updateObject(state, { created: false });
};

const createActivityFail = (state, action) => {
  return updateObject(state, { loading: false });
};

//FETCHING ACTIVITIES TO LIST
const getActivitiesListStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const getActivitiesListSuccess = (state, action) => {
  return updateObject(state, {
    activityData: action.activities,
    loading: false,
    activityId: action.activityId,
  });
};
const getActivitiesListFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchUserDataByActivityIdSuccess = (state, action) => {
  return updateObject(state, { participantData: action.data });
};

//FETCH SELECTED ACTIVITY BASED ON ID
const displayActivitySuccess = (state, action) => {
  return updateObject(state, {
    selectedActivity: action.activity,
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

//JOIN ACTIVITY
const joinActivity = (state, action) => {
  return updateObject(state, { joining: true });
};

//MODAL
const modalClosed = (state, action) => {
  return updateObject(state, { joining: false });
};

//REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ACTIVITY_START:
      return createActivityStart(state, action);
    case actionTypes.CREATE_ACTIVITY_FAIL:
      return createActivityFail(state, action);
    case actionTypes.CREATE_ACTIVITY_SUCCESS:
      return createActivitySuccess(state, action);
    case actionTypes.CREATE_INIT:
      return createInit(state, action);
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
    case actionTypes.JOIN_ACTIVITY:
      return joinActivity(state, action);
    case actionTypes.MODAL_CLOSED:
      return modalClosed(state, action);
    case actionTypes.FETCH_USER_DATA_BY_ACTIVITY_ID:
      return fetchUserDataByActivityIdSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
