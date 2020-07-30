import * as actionTypes from "../actions/actionTypes";

const initialState = {
  confirmed: false,
  statusChange: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CONFIRMATION:
      return (state.confirmed = true);
    default:
      return state;
  }
};

export default reducer;
