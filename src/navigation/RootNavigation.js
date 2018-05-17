import React from "react";
import { Notifications } from "expo";
import { createSwitchNavigator, createStackNavigator } from "react-navigation";
// import MainTabNavigator from "./MainTabNavigator";
import registerForPushNotificationsAsync from "../api/registerForPushNotificationsAsync";

import LoginScreen from "@screens/Login";
import RegisterScreen from "@screens/RegisterScreen";
import InvestScreen from "@screens/InvestScreen";
import InvestDetail from "@screens/InvestDetailScreen";

import ProfileScreen from "@screens/ProfileScreen";

const basicHeader = {
  headerStyle: {
    backgroundColor: "#2ecc71"
  },
  headerMode: "float",
  headerBackTitle: null,
  title: "Silcon Prairie",
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 20
  }
};

const MainNavigation = createStackNavigator(
  {
    invest: InvestScreen,
    investDetail: InvestDetail,
    profile: ProfileScreen
  },
  {
    initialRouteName: "invest",
    navigationOptions: basicHeader
  }
);

const AuthNavigation = createStackNavigator(
  {
    login: LoginScreen,
    reg: RegisterScreen
  },
  {
    initialRouteName: "login",
    navigationOptions: basicHeader
  }
);

const RootNavigation = createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    auth: AuthNavigation,
    main: MainNavigation
  },
  {
    initialRouteName: "auth"
  }
);

export default RootNavigation;

// export default class RootNavigation extends React.Component {
//   componentDidMount() {
//     this._notificationSubscription = this._registerForPushNotifications();
//   }

//   componentWillUnmount() {
//     this._notificationSubscription && this._notificationSubscription.remove();
//   }

//   render() {
//     return <AppNavigator />;
//   }

//   _registerForPushNotifications() {
//     // Send our push token over to our backend so we can receive notifications
//     // You can comment the following line out if you want to stop receiving
//     // a notification every time you open the app. Check out the source
//     // for this function in api/registerForPushNotificationsAsync.js
//     registerForPushNotificationsAsync();

//     // Watch for incoming notifications
//     this._notificationSubscription = Notifications.addListener(
//       this._handleNotification
//     );
//   }

//   _handleNotification = ({ origin, data }) => {
//     console.log(
//       `Push notification ${origin} with data: ${JSON.stringify(data)}`
//     );
//   };
// }
