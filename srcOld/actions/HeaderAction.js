
// export const menuPressed = () => ({ type: 'OPEN_DRAWER' });
export const goBack = () => ({ type: 'GO_BACK' });

export const menuPressed = () => (dispatch: *, getState: *) => {
  dispatch({ type: 'OPEN_DRAWER' });
  dispatch({ type: 'HIDE_MENU_BUTTON' });
  dispatch({ type: 'SHOW_CLOSE_DRAWER_BUTTON' });
};

export const closePressed = () => (dispatch: *, getState: *) => {
  dispatch({ type: 'CLOSE_DRAWER' });
  // dispatch({ type: 'SHOW_MENU_BUTTON' });
  // dispatch({ type: 'SHOW_CLOSE_DRAWER_BUTTON' });
};

export const detailBackPressed = () => (dispatch: *, getState: *) => {
  dispatch({ type: 'DETAIL_BACK_PRESSED' });
  dispatch({ type: 'SHOW_MENU_BUTTON' });
  dispatch({ type: 'HIDE_BACK_BUTTON' });
};

export const showBackButton = () => ({ type: 'SHOW_BACK_BUTTON' });
