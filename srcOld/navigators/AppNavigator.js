import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LobbyScreen from '../screens/LobbyScreen';
import IdeaExpoScreen from '../screens/IdeaExpoScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InvestScreen from '../screens/InvestScreen';
import InvestDetailScreen from '../screens/InvestDetailScreen';
import InvestOverviewScreen from '../screens/InvestOverviewScreen';
import FAQScreen from '../screens/FAQScreen';


const InvestStack = StackNavigator({
  InvestList: {
    screen: InvestScreen,
  },
  InvestDetail: {
    // path: 'people/:name',
    screen: InvestDetailScreen,
  },
  InvestOverview: {
    screen: InvestOverviewScreen,
  },
}, {
  initialRouteName: 'InvestList',
},
);

const MainTab = TabNavigator({
  lobby: { screen: LobbyScreen },
  ideaExpo: { screen: IdeaExpoScreen },
  invest: { screen: InvestStack },
  profile: { screen: ProfileScreen },

}, {
  tabBarPosition: 'bottom',

  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#ffffff',
    inactiveTintColor: '#d5edce',
    // activeBackgroundColor: '#2cad63',
    activeBackgroundColor: '#2fbd6b',
    // inactiveBackgroundColor: '#eebf57',
    style: {
      backgroundColor: '#2ecc71',
      // backgroundColor: '#2e5fcc',
      height: 60,
    },
    labelStyle: {
      fontSize: 12,
    },
  },
});

const mainFunc = screen => TabNavigator({
  lobby: { screen: LobbyScreen },
  ideaExpo: { screen: IdeaExpoScreen },
  invest: { screen: InvestStack },
  profile: { screen: ProfileScreen },

}, {
  tabBarPosition: 'bottom',
  initialRouteName: screen,
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#ffffff',
    inactiveTintColor: '#d5edce',
    // activeBackgroundColor: '#2cad63',
    activeBackgroundColor: '#2fbd6b',
    // inactiveBackgroundColor: '#eebf57',
    style: {
      backgroundColor: '#2ecc71',
      // backgroundColor: '#2e5fcc',
      height: 60,
    },
    labelStyle: {
      fontSize: 12,
    },
  },
});

console.log(MainTab);
// getComponentForRouteName
export const DrawerNav = DrawerNavigator({
  Lobby: {
    screen: MainTab,
  },
  'Idea Expo': {
    screen: mainFunc('ideaExpo'),
  },
  InvestOverview: {
    screen: InvestOverviewScreen,
  },
  Invest: {
    screen: mainFunc('invest'),
  },
  Profile: {
    screen: mainFunc('profile'),
  },
  FAQ: {
    screen: FAQScreen,
  },
  Logout: {
    screen: LoginScreen,
  },

}, {
  contentOptions: {
    activeTintColor: '#24b621',
    style: {
      marginVertical: 0,
    },
  },
},
);


export const AppNavigator = TabNavigator({
  login: { screen: LoginScreen },
  register: { screen: RegisterScreen },
  main: {
    screen: DrawerNav,
  },
}, {

  lazy: true,
  // tabBarPosition: 'bottom',
  // tabBarOptions: {
  //   activeTintColor: '#eebf57',
  // },
  navigationOptions: {
    tabBarVisible: false,
  },
});


const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
