import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utility/utility";

const initialState = {
  token: null,
  id: null,
  error: null,
  loading: false,
  redirect: false,
};

//##############################

const registerStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const registerSuccess = (state, action) => {
  return updateObject(state, { redirect: true });
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
    default:
      return state;
  }
};

export default reducer;
