import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default store;
