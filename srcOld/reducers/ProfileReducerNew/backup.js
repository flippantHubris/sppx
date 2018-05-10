import * as R from 'ramda';
import { INTITIAL_ACCOUNT_STATE } from './account';
import { INTIT_IDIVID } from './individual';

const INTIT_BACKUP = {
  account: { ...INTITIAL_ACCOUNT_STATE },
  individual: { ...INTIT_IDIVID },
};

export const backup = (state = INTIT_BACKUP, action) => {
  switch (action.type) {
    case 'USER_FETCH_SUCCESS':
      return {
        individual: R.pick(R.keys(state.individual), action.payload.individual),
        account: R.pick(R.keys(state.account), action.payload.account),
      };
    default:
      return state;
  }
};
