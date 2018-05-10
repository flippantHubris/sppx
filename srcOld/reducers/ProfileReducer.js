/* @flow */

import { fromJS } from 'immutable';
import * as R from 'ramda';
import { combineReducers } from 'redux';

const INTITIAL_STATE = {
  user: {},
  error: {},
  account: {},
  profiles: {},
  isLoaded: false,
  isEditable: true,
  hasBeenEdited: false,
};

const INTITIAL_ACCOUNT_STATE = {
  uid: '',
  mail: '',
  name: '',
  //picture: {},
};

const account = (state = INTITIAL_ACCOUNT_STATE, action) => {
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

const INTIT_IDIVID = {
  nameFirst: '',
  nameMiddle: '',
  nameLast: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
};

const individual = (state = INTIT_IDIVID, action) => {
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

const INTIT_META = {
  error: {},
  isLoaded: false,
  isEditable: false,
  hasBeenEdited: false,
  changed: {},
  showEditButton: true,
  showUpdateButton: false,
  updatingProfile: false,
};

const meta = (state = INTIT_META, action) => {
  switch (action.type) {
    case 'PROFILE_UPDATE_SUCCESSFUL':
      return {
        ...state,
        updatingProfile: false,
        isEditable: false,
        hasBeenEdited: false,
      };
    case 'UPDATING_PROFILE':
      return R.assoc('updatingProfile', true, state);
    case 'EDIT_BUTTON_PRESSED': {
      const isEditable = true;
      const showEditButton = false;
      return { ...state, isEditable, showEditButton };
    }

    case 'CANCEL_BUTTON_PRESSED': {
      const isEditable = false;
      const showEditButton = true;
      return { ...state, isEditable, showEditButton, hasBeenEdited: false };
    }

    case 'RESET_PROFILE':
      return R.assoc('isLoaded', true, state);
    case 'USER_FETCH_SUCCESS':
      return R.assoc('isLoaded', true, state);

    case 'ACCOUNT_FIELD_CHANGED':
      return R.assoc('hasBeenEdited', true, state);
    case 'PROFILE_FIELD_CHANGED': {
      const { profileType, field } = action;
      const changed = R.assoc(field, { profileType, field }, state.changed);
      return { ...state, changed, hasBeenEdited: true };
    }
    default:
      return state;
  }
};

const INTIT_BACKUP = {
  account: { ...INTITIAL_ACCOUNT_STATE },
  individual: { ...INTIT_IDIVID },
};

const backup = (state = INTIT_BACKUP, action) => {
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

const INTIT_INVEST = {
  ownership: {
    individual: false,
    jointTenents: false,
    tenantsInCommon: false,
    trustOrEntity: false,
  },
  individual: { ...INTIT_IDIVID },
};

const investor = (state = INTIT_INVEST, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        ownership: R.assoc(action.field, R.not(state.ownership[action.field]), state.ownership),
      };
    default:
      return state;
  }
};

const old = (state = INTITIAL_STATE, action) => {
  switch (action.type) {
    case 'USER_FETCH':
      return { ...state };
    case 'USER_FETCH_FAILED':
      return { ...state, error: action.payload };
    case 'USER_FETCH_SUCCESS':
      return {
        ...state,
        user: { ...action.payload },
        userBackup: fromJS(action.payload),
        account: action.payload.account,
        profiles: action.payload.profile,
        isLoaded: true,
      };

    case 'PROFILE_USERNAME_CHANGED':
      console.log('actinrecieved');
      console.log(`state = `);
      console.log(state);
      return { ...state, account: { ...state.account, name: action.payload } };
    case 'PROFILE_EMAIL_CHANGED':
      console.log('actinrecieved');
      console.log(`state = `);
      console.log(state);
      return { ...state, account: { ...state.account, mail: action.payload } };
    case 'FIELD_CHANGED': {
      console.log('FIELD_CHANGED');
      let newSection = { ...state[action.section] };
      newSection[action.field] = action.payload;
      state[action.section] = newSection;
      return { ...state };
    }
    case 'PROFILE_CHANGED': {
      let newProfile = { ...state.profiles[action.profileType] };
      newProfile[action.field] = action.payload;
      state.profiles[action.profileType] = newProfile;
      return { ...state };
    }
    default:
      return state;
  }
};

export default combineReducers({ account, meta, individual, investor, backup });
