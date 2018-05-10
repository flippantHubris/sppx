import R from 'ramda';

// https://api.sppx.io/rest/node?parameters[type]=issue

export const getIssues = () => async (dispatch, getState) => {
  dispatch({ type: 'ISSUES_FETCH' });
  const logHeaders = new Headers();
  logHeaders.append('Content-Type', 'application/json');
  logHeaders.append('X-CSRF-Token', getState().auth.authToken);
  const logInit = {
    method: 'POST',
    headers: logHeaders,
    cache: 'no-cache',
  };
  // // console.log(logInit.body);
  //const url = 'https://api.sppx.io/rest/profile/test';
  const url = 'https://api.sppx.io/rest/profile/issue';
  const response = await fetch(url, logInit);
  const json = await response.json();
  if (response.status == '200') {
    dispatch({ type: 'NEW_ISSUES_FETCH_SUCCESS', payload: json });
  }
};

export const getIssueNids = () => async (dispatch, getState) => {
  dispatch({ type: 'ISSUES_FETCH' });
  const logHeaders = new Headers();
  logHeaders.append('Content-Type', 'application/json');
  logHeaders.append('X-CSRF-Token', getState().auth.authToken);
  const logInit = {
    method: 'POST',
    headers: logHeaders,
    cache: 'no-cache',
  };
  // // console.log(logInit.body);
  const url = 'https://api.sppx.io/rest/profile/test';
  const response = await fetch(url, logInit);
  const json = await response.json();
  if (response.status == '200') {
    dispatch({ type: 'ISSUES_FETCH_SUCCESS', payload: json });
  } else {
    dispatch({
      type: 'ISSUES_FETCH_FAIL',
      error: response.status.toString(),
      payload: json,
    });
  }
};

export const setNID = nid => ({ type: 'SET_NID', payload: nid });

export const setIID = iid => ({ type: 'SET_IID', payload: iid });

export const setIid = iid => ({ type: 'SET_IID', payload: iid });

export const test = () => ({ type: 'TESTING' });

export const resetDetails = () => ({ type: 'RESET_DETAILS' });

export const InvestThunk = () => async (dispatch, getState) => {
  // console.log('InvestThunk');
  dispatch({ type: 'INVEST_FETCH' });
  const logHeaders = new Headers();
  logHeaders.append('Content-Type', 'application/json');
  logHeaders.append('X-CSRF-Token', getState().auth.authToken);
  const logInit = {
    method: 'GET',
    headers: logHeaders,
    cache: 'no-cache',
  };
  // console.log(logInit.body);
  const response = await fetch(getState().auth.url.issues, logInit);
  const json = await response.json();
  if (response.status == '200') {
    dispatch({ type: 'INVEST_FETCH_SUCCESS', payload: json });
    getAllIssueDetail()(dispatch, getState);
  } else {
    dispatch({
      type: 'INVEST_FETCH_FAIL',
      error: response.status.toString(),
      payload: json,
    });
  }
};

export const printThunk = () => async (dispatch, getState) => {
  console.log(getState());
};

const sanitize = json => {
  // console.log(json);
  const renameBy = R.curry((fn, obj) =>
    R.pipe(R.toPairs, R.map(R.adjust(fn, 0)), R.fromPairs)(obj)
  );
  const details = [
    'field_issue_accredited_only',
    'field_issue_amount_max',
    'field_issue_amount_min',
    'field_issue_amount_target',
    'field_issue_auto_accept',
    'field_issue_auto_amount',
    'field_issue_auto_rate',
    'field_issue_category_other',
    'field_issue_date_end',
    'field_issue_date_maturity',
    'field_issue_date_start',
    'field_issue_date_target',
    'field_issue_fin_review',
    'field_issue_invest_min',
    'field_issue_invest_suggest',
    'field_issue_invest_unit',
    'field_issue_rate',
    'field_issue_rate_market',
    'field_issue_rate_max',
    'field_issue_term',
    'field_issue_type',
  ];
  const dates = ['date_end', 'date_maturity', 'date_start', 'date_target'];
  const dates2 = [
    'field_issue_date_end',
    'field_issue_date_maturity',
    'field_issue_date_start',
    'field_issue_date_target',
  ];

  const picked = R.pick(details, json);

  const getValue = x => R.pathOr('N/A', ['und', '0', 'value'], x);
  const reduced = R.map(getValue, picked);
  const renamed = renameBy(R.replace('field_issue_', ''), reduced);
  const summary = {
    summary: R.pathOr('N/A', ['body', 'und', '0', 'summary'], json),
  };
  const description = {
    description: R.pathOr('N/A', ['body', 'und', '0', 'value'], json),
  };
  const nid = {
    nid: R.pathOr('N/A', ['nid'], json),
  };
  const title = {
    title: R.pathOr('N/A', ['title'], json),
  };

  const getUrl = () => {
    const rawUrl = R.pathOr('N/A', ['field_issue_image', 'und', '0', 'uri'], json);
    const cleanUrl = R.replace('public://issues/', '', rawUrl);
    const fullUrl = 'https://api.sppx.io/sites/default/files/issues/' + cleanUrl;
    return fullUrl;
  };

  const imageUrl = {
    imageUrl: getUrl(),
  };

  console.log('imageUrl');
  //console.log(getImageUrl.imageUrl);
  console.log(imageUrl);
  // console.log(getUrl());
  // console.log('https://api.sppx.io/sites/default/files/issues/' + getUrl());
  // const merged = R.mergeAll([renamed, summary, description]);

  const pickedDates = R.pick(dates, renamed);

  const reducedDates = R.map(getValue, picked);
  const cleanDate = date => R.replace(' 00:00:00', '', date);
  const cleanedDates = R.map(cleanDate, pickedDates);
  const renamedDates = renameBy(R.replace('date_', ''), cleanedDates);
  const dateObj = { dates: renamedDates };
  const merged = R.mergeAll([
    title,
    nid,
    renamed,
    summary,
    description,
    dateObj,
    renamedDates,
    imageUrl,
  ]);
  return merged;
};

// issueSummary: action.payload.body.und[0].value

export const getIssueDetail = () => async (dispatch, getState) => {
  // console.log('getInvestDetai');
  dispatch({ type: 'INVEST_DETAIL_FETCH' });
  const logHeaders = new Headers();
  logHeaders.append('Content-Type', 'application/json');
  logHeaders.append('X-CSRF-Token', getState().auth.authToken);
  const logInit = {
    method: 'GET',
    headers: logHeaders,
    cache: 'no-cache',
  };
  const nodeURL = getState().auth.url.node + getState().invest.selectedIssueNID;
  console.log(nodeURL);
  const response = await fetch(nodeURL, logInit);
  const json = await response.json();
  if (response.status == '200') {
    dispatch({
      type: 'INVEST_DETAIL_FETCH_SUCCESS',
      payload: sanitize(json),
      json,
    });
    //getAllIssueDetail()(dispatch, getState);
  } else {
    dispatch({
      type: 'INVEST_DETAIL_FETCH_FAIL',
      error: response.status.toString(),
      payload: json,
    });
  }
};

// export const getIssueDetailFromNid = nid => {
//   // console.log('getInvestDetai');
//   dispatch({ type: 'INVEST_DETAIL_FETCH' });
//   const logHeaders = new Headers();
//   logHeaders.append('Content-Type', 'application/json');
//   logHeaders.append('X-CSRF-Token', getState().auth.authToken);
//   const logInit = {
//     method: 'GET',
//     headers: logHeaders,
//     cache: 'no-cache',
//   };
//   const nodeURL = getState().auth.url.node + getState().invest.selectedIssueNID;
//   console.log(nodeURL);
//   const response = await fetch(nodeURL, logInit);
//   const json = await response.json();
//   if (response.status == '200') {
//     dispatch({
//       type: 'INVEST_DETAIL_FETCH_SUCCESS',
//       payload: sanitize(json),
//       json,
//     });
//   } else {
//     dispatch({
//       type: 'INVEST_DETAIL_FETCH_FAIL',
//       error: response.status.toString(),
//       payload: json,
//     });
//   }
// };

export const getAllIssueDetail = () => async (dispatch, getState) => {
  // console.log('getInvestDetai');
  dispatch({ type: 'ALL_ISSUE_DETAIL', payload: getState().invest.nids });

  const getDetail = async nid => {
    const logHeaders = new Headers();
    logHeaders.append('Content-Type', 'application/json');
    logHeaders.append('X-CSRF-Token', getState().auth.authToken);

    const logInit = {
      method: 'GET',
      headers: logHeaders,
      cache: 'no-cache',
    };
    console.log('nid =');
    console.log(nid);
    const nodeURL = getState().auth.url.node + nid;
    console.log(nodeURL);
    const response = await fetch(nodeURL, logInit);
    const json = await response.json();
    //return sanitize(json);
    console.log('json =');
    console.log(sanitize(json));
    dispatch({ type: 'ADD_DETAIL_ISSUE', payload: sanitize(json), json });
    return json;
  };
  console.log('getState.invest.nids =');
  console.log(getState().invest.nids);
  const reduced = await R.map(getDetail, getState().invest.nids);

  dispatch({
    type: 'INVEST_GET_ALL',
    payload: reduced,
  });
};
