import {
  MaterialCommunityIcons,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import React, { Component } from "react";

import { profileActions } from "@reducers/ducks/profile/action";
import AccountContainer from "./containers/AccountContainer";
import EditHeader from "./containers/EditHeader";
import IndividualContainer from "./containers/IndividualContainer";
import InvestorContainer from "./containers/InvestorContainer";

class ProfileScreen extends Component {
  static navigationOptions = {
    tabBarLabel: "PROFILE",
    tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="account" size={26} color={tintColor} />
    )
  };

  onLogoutButtonPress() {
    this.props.logout(this.props.authToken);
    this.props.navigation.navigate("login");
  }

  componentWillMount() {
    this.props.getUser();
  }

  renderProfile() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <EditHeader />

        <ScrollView>
          {/* <Image resizeMode={'contain'} source={require('../../../assets/prairie.jpg')} /> */}
          <AccountContainer />
          <IndividualContainer />
          <InvestorContainer navigate={navigate} />

          {this.renderLogoutButton()}
        </ScrollView>
      </View>
    );
  }

  renderLogoutButton() {
    const { navigate } = this.props.navigation;
    const logout = () => {
      navigate("login");
      this.props.postLogout();
    };

    // const { navigate } = this.props.navigation;
    // return <Button onPress={logout}>Logout</Button>;
    return (
      <View style={styles.logoutView}>
        <Button onPress={logout}>Logout</Button>
      </View>
    );
  }

  render() {
    if (this.props.isLoaded) {
      return this.renderProfile();
    }
    // return (
    //   <View style={styles.spinnerView}>
    //     <Spinner size="large" />
    //   </View>
    // );
    return <View>{this.renderLogoutButton()}</View>;
  }
}

const styles = StyleSheet.create({
  logoutView: {
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10
  },
  spinnerView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  editSpinner: {
    marginTop: 10
  },
  editButtons: {
    flexDirection: "row"
  },
  editButton: {
    flex: 1
  },
  buttonView: {
    marginTop: 20,
    marginBottom: 30
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
    // alignItems: "center",
    // justifyContent: "center"
  }
});

const Button = ({ onPress, children, style = styles.buttonStyle }) => {
  const { buttonStyle, textStyle } = buttonStyles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const buttonStyles = {
  textStyle: {
    alignSelf: "center",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#2ecc71",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#2ecc71",
    marginLeft: 5,
    marginRight: 5
  }
};

const mapStateToProps = ({ profile }) => {
  const { account, meta, individual, investor } = profile;
  const {
    isLoaded,
    isEditable,
    showEditButton,
    showUpdateButton,
    cancelButtonPressed,
    updatingProfile,
    hasBeenEdited
  } = meta;
  return {
    isLoaded,
    isEditable,
    account,
    individual,
    showEditButton,
    showUpdateButton,
    updatingProfile,
    hasBeenEdited,
    investor
  };
};

export default connect(mapStateToProps, profileActions)(ProfileScreen);
