import * as R from 'ramda';

const INTITIAL_USER_STATE = {};

export default (state = INTITIAL_USER_STATE, action) => {
  switch (action.type) {
    // case 'RESET_PROFILE':
    //   //return R.pick(['mail', 'name'], action.payload.account);
    //   return R.pick(R.keys(state), action.payload.account);
    // case 'USER_FETCH_SUCCESS':
    //   return R.pick(R.keys(state), action.payload.account);
    case 'USER_FETCH_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};
