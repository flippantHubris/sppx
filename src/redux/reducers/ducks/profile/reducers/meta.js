import * as R from 'ramda';

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

export const meta = (state = INTIT_META, action) => {
  switch (action.type) {
    case 'PROFILE_UPDATE_SUCCESSFUL':
      return {
        ...state,
        updatingProfile: false,
        isEditable: false,
        hasBeenEdited: false,
      };
    // case 'UPDATING_PROFILE':
    //   return R.assoc('updatingProfile', true, state);
    case 'UPDATING_PROFILE': {
      //return R.assoc('updatingProfile', true, state);
      const updatingProfile = true;
      const isEditable = false;
      return { ...state, updatingProfile, isEditable };
    }
    //return R.assoc('updatingProfile', true, state);

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
