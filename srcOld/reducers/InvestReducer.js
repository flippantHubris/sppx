/* flow */
import R from 'ramda';

const INTITIAL_STATE = {
  issuers: {},
  error: {},
  selectedIssueNID: 0,
  selectedIssueIid: 0,
  selectedIssueDetail: {},
  issueSummary: '',
  loadingIssues: true,
  loadingDetails: true,
  issuesFetched: false,
  allIssues: [],
  newAllIssues: [],
};

const getNIDS = payload => {
  const getValue = x => R.pathOr('N/A', ['nid'], x);
  const reduced = R.map(getValue, payload);
  return reduced;
};

export default (state = INTITIAL_STATE, action) => {
  // console.log(state);
  // console.log('--------------');
  // console.log('action recieved:');
  // console.log(action);
  switch (action.type) {
    case 'INVEST_FETCH':
      return { ...state, issuers: action.payload };
    case 'INVEST_FETCH_FAILED':
      return { ...state, error: action.payload };
    case 'INVEST_FETCH_SUCCESS':
      return {
        ...state,
        issuers: action.payload,
        loadingIssues: false,
        issuesFetched: true,
        nids: getNIDS(action.payload),
      };
    case 'INVEST_DETAIL_FETCH':
      return { ...state, loadingDetails: true };
    case 'INVEST_DETAIL_FETCH_SUCCESS':
      return {
        ...state,
        selectedIssueDetail: action.payload,
        loadingDetails: false,
      };
    case 'ISSUES_FETCH_SUCCESS':
      return {
        ...state,
        newAllIssues: action.payload,
        loadingDetails: false,
      };
    case 'NEW_ISSUES_FETCH_SUCCESS':
      return {
        ...state,
        issuesFetched: true,
        newAllIssues: action.payload,
        loadingDetails: false,
      };

    case 'SET_NID':
      return {
        ...state,
        selectedIssueNID: action.payload,
        selectedIssueIid: action.payload,
      };
    case 'SET_IID':
      return { ...state, selectedIssueIid: action.payload };
    case 'ADD_DETAIL_ISSUE':
      return { ...state, allIssues: state.allIssues.concat(action.payload) };
    case 'RESET_DETAILS':
      return { ...state, loadingDetails: true };
    default:
      return state;
  }
};
