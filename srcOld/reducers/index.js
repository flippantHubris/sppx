/* flow */
import { combineReducers } from 'redux';

import { ProfileReducer } from './ducks/profile/reducers';
import AuthReducer from './AuthReducer';
import HeaderReducer from './HeaderReducer';
import InvestReducer from './InvestReducer';
import NavReducer from './NavReducer';
import RegisterReducer from './RegisterReducer';
import UserReducer from './UserReducer';

// home/flip/Documents/nepo/sppxManager/src/reducers/RegisterReducer.js

export default combineReducers({
  auth: AuthReducer,
  nav: NavReducer,
  reg: RegisterReducer,
  invest: InvestReducer,
  header: HeaderReducer,
  profile: ProfileReducer,
  //profile: ProfileReducerNew,
  //profileNew: ProfileReducerNew,
  user: UserReducer,
});
