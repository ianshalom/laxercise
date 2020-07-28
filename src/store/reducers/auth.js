import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utility/utility";

const initialState = {
  user: [],
  isAuth: false,
  isAuthResolved: true,
  uid: null,
  error: null,
  loading: false,
  redirect: false,
};

//##############################

const registerStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const registerSuccess = (state, action) => {
  return updateObject(state, { uid: action.uid });
};

const setAuthUser = (state, action) => {
  return updateObject(action.user, {
    user: action.user,
    isAuthResolved: true,
    isAuth: !!action.user,
    loading: false,
  });
};

const resetAuthState = (state, action) => {
  return updateObject(state, { isAuthResolved: false });
};

const logout = (state, action) => {
  return updateObject(state, {
    user: null,
    isAuth: false,
    isAuthResolved: false,
  });
};

const setAuthUserStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const authUserFail = (state, action) => {
  return updateObject(state, {
    user: null,
    isAuth: false,
    isAuthResolved: false,
  });
};

const registerFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

//REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_FAIL:
      return registerFail(state, action);
    case actionTypes.REGISTER_START:
      return registerStart(state, action);
    case actionTypes.REGISTER_SUCCESS:
      return registerSuccess(state, action);
    case actionTypes.SET_AUTH_USER:
      return setAuthUser(state, action);
    case actionTypes.LOGOUT:
      return logout(state, action);
    case actionTypes.SET_AUTH_USER_START:
      return setAuthUserStart(state, action);
    case actionTypes.AUTH_USER_FAIL:
      return authUserFail(state, action);
    case actionTypes.RESET_AUTH_STATE:
      return resetAuthState(state, action);
    default:
      return state;
  }
};

export default reducer;
