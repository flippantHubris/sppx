const INTITIAL_STATE = {
  showBackButton: false,
  showMenuButton: false,
  showDrawerCloseButton: false,
};


export default (state = INTITIAL_STATE, action) => {
  switch (action.type) {
    case 'SHOW_BACK_BUTTON':
      return { ...state, showBackButton: true, showMenuButton: false, showDrawerCloseButton: false };
    case 'HIDE_BACK_BUTTON':
      return { ...state, showBackButton: false };
    case 'SHOW_MENU_BUTTON':
      return { ...state, showMenuButton: true, showBackButton: false, showDrawerCloseButton: false };
    case 'HIDE_MENU_BUTTON':
      return { ...state, showMenuButton: false };
    case 'SHOW_CLOSE_DRAWER_BUTTON':
      return { ...state, showDrawerCloseButton: true, showBackButton: false, showMenuButton: false };
    case 'HIDE_CLOSE_DRAWER_BUTTON':
      return { ...state, showDrawerCloseButton: false };

    case 'DETAIL_BACK_PRESSED':
      return { ...state, showDrawerCloseButton: false };
    case 'GO_BACK':
      return { ...state, showDrawerCloseButton: false, showBackButton: false, showMenuButton: true };
    case 'Navigation/NAVIGATE':

      if (action.routeName === 'DrawerOpen') {
        return { ...state, showDrawerCloseButton: true, showMenuButton: false };
      } else if (action.routeName === 'DrawerClose') {
        return { ...state, showDrawerCloseButton: false, showMenuButton: true };
      } else if (action.routeName === 'InvestDetail') {
        return { ...state, showDrawerCloseButton: false, showMenuButton: false, showBackButton: true };
      } else if (action.routeName === 'InvestOverview') {
        return { ...state, showDrawerCloseButton: false, showMenuButton: false, showBackButton: true };
      } else if (action.routeName === 'register') {
        return { ...state, showDrawerCloseButton: false, showMenuButton: false, showBackButton: true };
      } else if (action.routeName === 'InvestDetail') {
        return { ...state, showDrawerCloseButton: false, showMenuButton: false, showBackButton: true };
      } else if (action.routeName === 'Logout') {
        return { ...state, showDrawerCloseButton: false, showMenuButton: false, showBackButton: false };
      }
      return { ...state, showDrawerCloseButton: false, showMenuButton: true };
    case 'CLOSE_DRAWER':
      return { ...state, showDrawerCloseButton: false, showMenuButton: true, showBackButton: false };
    default:
      return state;
  }
};
