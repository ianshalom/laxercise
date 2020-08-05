import * as actionTypes from "../actions/actionTypes";
// import { updateObject } from "../../utility/utility";

const initialState = {
  statusChanged: false,
};

// const createConfirmationSuccess = (state, action) => {
//   return updateObject(state, { awaiting: true });
// };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CONFIRMATION_SUCCESS:
      return (state.statusChanged = !state.statusChanged);
    default:
      return state;
  }
};

export default reducer;
