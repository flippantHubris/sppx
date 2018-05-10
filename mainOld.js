import Expo from 'expo';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './src/reducers';
import TheHeader from './src/components/TheHeader';
import AppWithNavigationState from './src/navigators/AppNavigator';
import { composeWithDevTools } from 'redux-devtools-extension';
//import rootReducer from '../reducers/index';
//console.disableYellowBox = true;
//global.__DEV__ = false;
// function configureStore(initialState) {
//   const store = createStore(reducers, initialState, applyMiddleware(ReduxThunk, logger));
//   //const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));
//
//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//       const nextRootReducer = require('./src/reducers');
//       store.replaceReducer(nextRootReducer);
//     });
//   }
//
//   return store;
// }

function configureStore(initialState) {
  //const storeOld = createStore(reducers, initialState, applyMiddleware(ReduxThunk, logger));

  //const store = createStore(reducers, composeWithDevTools(applyMiddleware(ReduxThunk, logger)));

  const store = createStore(reducers, composeWithDevTools(applyMiddleware(ReduxThunk)));

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./src/reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

class App extends React.Component {
  render() {
    //const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));
    const hotStore = configureStore({});
    return (
      <Provider store={hotStore}>
        <View style={styles.container}>
          <TheHeader />
          <AppWithNavigationState />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  logoView: {
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
