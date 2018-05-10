import * as R from 'ramda';
import INTIT_IDIVID from './individual';

export const INTIT_INVEST = {
  ownership: {
    individual: false,
    jointTenents: false,
    tenantsInCommon: false,
    trustOrEntity: false,
  },
  accredited: false,
  accreditation: {
    networth: false,
    income: false,
    jointIncome: false,
  },
  individual: { ...INTIT_IDIVID },
  stateID: {},
  stateIDSet: false,
  hasStateId: false,
  uploadResponse: {},
  stateIdFid: 0,
  fileUploaded: false,
  stateIdSetSuccess: false,
  data: {
    idState: {},
  },
};

const getUrl = url => `https://api.sppx.io/system/files${url.replace('private:/', '')}`;

const getUrl2 = url => `https://api.sppx.io/sites/default/files${url.replace('public:/', '')}`;

const toggleWith = field => (val, key, obj) => field === key;

export const investor = (state = INTIT_INVEST, action) => {
  switch (action.type) {
    case 'USER_FETCH_SUCCESS':
      if (action.payload.investor.idState != null) {
        return {
          ...state,
          stateID: {
            uri: getUrl2(action.payload.investor.idState.uri),
          },
          //stateIDSet: true,
          hasStateId: true,
          //ownership: R.assoc(action.field, R.not(state.ownership[action.field]), state.ownership),
          data: R.pick(R.keys(state.data), action.payload.investor),
        };
      } else {
        return {
          ...state,
          stateID: {},
          //stateIDSet: true,
          hasStateId: false,
          //ownership: R.assoc(action.field, R.not(state.ownership[action.field]), state.ownership),
        };
      }

    case 'TOGGLE':
      return {
        ...state,
        //ownership: R.assoc(action.field, R.not(state.ownership[action.field]), state.ownership),
        ownership: R.mapObjIndexed(toggleWith(action.field), state.ownership),
      };
    case 'TOGGLE2':
      if (action.object === 'investor') {
        return R.assoc(action.field, R.not(state[action.field]), state);
      } else if (action.object === 'accreditation') {
        return {
          ...state,
          accreditation: R.mapObjIndexed(toggleWith(action.field), state.accreditation),
        };
      } else {
        return state;
      }
    case 'SET_IMAGE':
      return {
        ...state,
        stateID: action.payload,
        stateIDSet: true,
        fileUploaded: false,
      };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        uploadResponse: action.payload,
        stateIdFid: action.payload.fid,
        fileUploaded: true,
      };

    case 'ID_SET_SUCCESS':
      return { ...state, stateIdSetSuccess: true };
    default:
      return state;
  }
};
