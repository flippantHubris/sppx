import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import SpinnerView from '@components/SpinnerView';

import { branch, renderComponent, compose } from 'recompose';

import HeaderButton from '@components/HeaderButton';
import { profileActions } from '@actions/profile';
import AccountContainer from './containers/AccountContainer';
import EditHeader from './containers/EditHeader';
import IndividualContainer from './containers/IndividualContainer';
import InvestorContainer from './containers/InvestorContainer';

const Spinner = () => (
  <View style={styles.spinnerView}>
    <ActivityIndicator size="large" />
    <Text> Loading </Text>
  </View>
);

const test = props => {
  console.log(props);
  return true;
};

const spinnerWhileLoading = branch(
  test,
  renderComponent(Spinner) // render Loading, else on to the next component
);

class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <HeaderButton
        Comp={MaterialCommunityIcons}
        name="logout"
        onPress={() => navigation.navigate('auth')}
      />
    )
  });

  onLogoutButtonPress() {
    this.props.logout(this.props.authToken);
    this.props.navigation.navigate('auth');
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
      navigate('login');
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
    console.log(this.props);

    // if (this.props.isLoaded) {
    //   return this.renderProfile();
    // }
    // return (
    //   // <View style={styles.spinnerView}>{/* <Spinner size="large" /> */}</View>
    //   <SpinnerView />
    // );
    return this.renderProfile();
    //
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  editSpinner: {
    marginTop: 10
  },
  editButtons: {
    flexDirection: 'row'
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
    backgroundColor: '#fff'
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
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#2ecc71',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2ecc71',
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
    hasBeenEdited,
    loading
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
    investor,
    loading
  };
};

const withRedux = connect(mapStateToProps, profileActions)(ProfileScreen);

// export default connect(mapStateToProps, profileActions)(ProfileScreen);

export default spinnerWhileLoading(withRedux);
