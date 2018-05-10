import * as R from 'ramda';

export const INTITIAL_ACCOUNT_STATE = {
  uid: '',
  mail: '',
  name: '',
  //picture: {},
};

export const account = (state = INTITIAL_ACCOUNT_STATE, action) => {
  switch (action.type) {
    case 'RESET_PROFILE':
      //return R.pick(['mail', 'name'], action.payload.account);
      return R.pick(R.keys(state), action.payload.account);
    case 'USER_FETCH_SUCCESS':
      return R.pick(R.keys(state), action.payload.account);
    case 'ACCOUNT_FIELD_CHANGED':
      return R.assoc(action.field, action.payload, state);
    case 'PROFILE_FIELD_CHANGED':
      if (R.equals(R.prop('profileType', action), 'account')) {
        return R.assoc(action.field, action.payload, state);
      } else {
        return state;
      }
    default:
      return state;
  }
};
