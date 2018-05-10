import * as R from 'ramda';

export const INTIT_IDIVID = {
  nameFirst: '',
  nameMiddle: '',
  nameLast: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
};

export const individual = (state = INTIT_IDIVID, action) => {
  switch (action.type) {
    case 'RESET_PROFILE':
      return R.pick(R.keys(state), action.payload.individual);
    case 'USER_FETCH_SUCCESS':
      return R.pick(R.keys(state), action.payload.individual);
    case 'PROFILE_FIELD_CHANGED':
      if (R.equals(R.prop('profileType', action), 'individual')) {
        return R.assoc(action.field, action.payload, state);
      } else {
        return state;
      }
    default:
      return state;
  }
};
