import * as R from 'ramda';
import meta from './meta';

export const INTIT_IDIVID = {
  nameFirst: '',
  nameMiddle: '',
  nameLast: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  streetAddress: ''
};

export default (state = INTIT_IDIVID, action) => {
  switch (action.type) {
    case 'RESET_PROFILE':
      return R.pick(R.keys(state), action.payload.individual);
    case 'USER_FETCH_SUCCESS': {
      const fields = R.pick(
        ['nameFirst', 'nameMiddle', 'nameLast', 'phone'],
        action.payload.individual
      );
      const {
        thoroughfare,
        postal_code,
        locality,
        administrative_area
      } = action.payload.individual.streetAddress;
      const address = {
        address: thoroughfare,
        city: locality,
        state: administrative_area,
        zip: postal_code
      };
      return { ...fields, ...address };
    }

    case 'PROFILE_FIELD_CHANGED':
      if (R.equals(R.prop('profileType', action), 'individual')) {
        return R.assoc(action.field, action.payload, state);
      }
      return state;

    default:
      return state;
  }
};
