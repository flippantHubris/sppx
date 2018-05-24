import { combineReducers } from 'redux';
import account from './account';
import individual from './individual';
import investor from './investor';
import backup from './backup';
import meta from './meta';

export const ProfileReducer = combineReducers({
  account,
  individual,
  investor,
  backup,
  meta
});

export default combineReducers({ account, individual, investor, backup, meta });
