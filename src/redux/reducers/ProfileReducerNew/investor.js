import * as R from 'ramda';
import INTIT_IDIVID from './individual';

export const INTIT_INVEST = {
  ownership: {
    individual: false,
    jointTenents: false,
    tenantsInCommon: false,
    trustOrEntity: false,
  },
  individual: { ...INTIT_IDIVID },
};

const toggleWith = field => (val, key, obj) => field === key;

export const investor = (state = INTIT_INVEST, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        //ownership: R.assoc(action.field, R.not(state.ownership[action.field]), state.ownership),
        ownership: R.mapObjIndexed(toggleWith(action.field), state.ownership),
      };
    default:
      return state;
  }
};
