import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator, MainFlow } from '../navigators/AppNavigator';


// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('lobby');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('login');
const INTITIAL_STATE = AppNavigator.router.getStateForAction(
  secondAction,
  tempNavState,
);
const getStateFor = (first, second, state) => {
  const navigateAction = NavigationActions.navigate({
    routeName: first,
    params: {},
    action: NavigationActions.navigate({ routeName: second }),
  });
  return AppNavigator.router.getStateForAction(navigateAction, state);
};

export default (state = INTITIAL_STATE, action) => {
  let nextState;
  switch (action.type) {
    case 'LOGIN_SUCCESSFUL':
      nextState = AppNavigator.router.getStateForAction(
        // NavigationActions.back(),
        NavigationActions.navigate({ routeName: 'lobby' }),
        state,
      );
      break;
    case 'REGISTER_SUCCESS':
      nextState = AppNavigator.router.getStateForAction(
          // NavigationActions.back(),
          NavigationActions.navigate({ routeName: 'login' }),
          state,
        );
      break;

    case 'Logout':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'login' }),
        state,
      );
      break;
    case 'GO_BACK':
      nextState = AppNavigator.router.getStateForAction(
          NavigationActions.back(),
          state,
        );
      break;
    case 'OPEN_DRAWER':
      nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'DrawerOpen' }),
            state,
          );
      break;
    case 'CLOSE_DRAWER':
      nextState = AppNavigator.router.getStateForAction(
              NavigationActions.navigate({ routeName: 'DrawerClose' }),
              state,
            );
      break;
    case 'DETAIL_BACK_PRESSED':
      console.log('detalback');
      nextState = AppNavigator.router.getStateForAction(
          // NavigationActions.back(),
          AppNavigator.router.getActionForPathAndParams('invest'),
          state,
        );
    case 'DETAIL_BACK_PRESSED':
      console.log('detalback');
      nextState = AppNavigator.router.getStateForAction(
              // NavigationActions.back(),
              AppNavigator.router.getActionForPathAndParams('invest'),
              state,
            );
      break;
    case 'Navigation/NAVIGATE':
      if (action.routeName === 'invest') {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'InvestList' }),
          ],
        });
        nextState = AppNavigator.router.getStateForAction(
                resetAction,
                state,
              );
      } else if (action.routeName === 'InvestOverview') {
        nextState = getStateFor('Lobby', 'InvestOverview', state);
      } else if (action.routeName === 'InvestOverview') {
        nextState = getStateFor('Lobby', 'InvestOverview', state);
      } else if (action.routeName === 'Invest') {
        nextState = getStateFor('Lobby', 'Invest', state);
      } else {
        nextState = AppNavigator.router.getStateForAction(action, state);
      }
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};


// case 'DETAIL_BACK_PRESSED':
//   console.log('detalback');
//   nextState = AppNavigator.router.getStateForAction(
//       // NavigationActions.back(),
//       AppNavigator.router.getActionForPathAndParams('invest'),
//       state,
//     );
const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

// const AppReducer = combineReducers({
//   nav,
//   auth,
// });
//
// export default AppReducer;
