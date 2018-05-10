// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { profileActions, myProfileChange } from '../actions';
import * as R from 'ramda';
import { Button as SaveButton } from '../components/SaveButton';
import { Card, CardSection, Input, Spinner, Header, InputSection } from '../components/common';
import { CheckCircle } from '../components/CheckCircle';
//import CircleCheckBox from 'react-native-circle-checkbox';

import InvestorSection from './InvestorSection';

const input = (props, section, field) => (
  <CardSection key={field}>
    <Input
      label={field}
      onChangeText={text => props.onProfileChange(section, field, text)}
      value={props[section][field]}
      //editable={false}
    />
  </CardSection>
);

const cInput = R.curry(input);

const createSection = (props, section, fields, options) => {
  return fields.map(cInput(props, section));
};

const inject = (props, func) => {
  const newFunc = R.curry(func);
  return newFunc(props);
};

const makeToggle = () => {
  let tog = true;
  const func = () => {
    console.log('testing2');
    return (tog = R.not(tog));
  };
  console.log('testing3');
  return func;
};
const toggle = makeToggle();

class ProfileScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'PROFILE',
    tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="account" size={26} color={tintColor} />
    ),
  };

  onLogoutButtonPress() {
    this.props.logout(this.props.authToken);
    this.props.navigation.navigate('login');
  }

  componentWillMount() {
    this.props.getUser();
  }

  renderAccount() {
    if (this.props.isLoaded) {
      return (
        <View>
          <Text>isLoaded</Text>
        </View>
      );
    }
    return (
      <View style={styles.spinnerView}>
        <Spinner size="large" />
      </View>
    );
  }

  newRenderUpdateButton() {
    if (this.props.updatingProfile) {
      return (
        <View style={styles.editSpinner}>
          <Spinner size="large" />
        </View>
      );
    } else if (this.props.isEditable) {
      if (this.props.hasBeenEdited) {
        return (
          <View style={styles.editButtons}>
            <SaveButton
              onPress={() => {
                this.props.resetProfile();
                this.props.cancelButtonPressed();
              }}
              title="Cancel"
            />
            <SaveButton
              onPress={() => this.props.updateProfile()}
              style={{
                backgroundColor: 'rgb(124, 208, 140)',
                borderColor: 'rgb(2, 173, 76)',
              }}
              title="Save"
            />
          </View>
        );
      } else {
        return (
          <View style={styles.editButtons}>
            <SaveButton
              onPress={() => {
                this.props.resetProfile();
                this.props.cancelButtonPressed();
              }}
              title="Cancel"
            />
            <SaveButton
              touchable={false}
              onPress={() => null}
              style={{
                backgroundColor: 'rgb(108, 108, 108)',
                borderColor: 'rgb(64, 64, 64)',
              }}
              title="Save"
            />
          </View>
        );
      }
    }
  }

  renderInvestProfile() {
    return (
      <Card rounded={true}>
        <Header
          headerText="Investor"
          showButton={R.not(this.props.isEditable)}
          onPress={() => this.props.editButtonPressed()}
          //onPress={() => this.refs['name'].focus()}
        />
        {this.newRenderUpdateButton()}

        <CardSection>
          <InputSection label="Ownership">
            <CheckCircle
              checked={this.props.investor.ownership.individual}
              onToggle={() => this.props.toggle('individual')}
            />
            <CheckCircle
              checked={this.props.investor.ownership.individual}
              onToggle={() => this.props.toggle('individual')}
            />
          </InputSection>
        </CardSection>
      </Card>
    );
  }

  renderProfile() {
    const { isEditable, onProfileChange, individual } = this.props;
    const onInd = (field, text) => onProfileChange('individual', field, text);

    return (
      <ScrollView>
        <InvestorSection props={this.props} />
        <View>
          {this.renderInvestProfile()}
          {/* {createSection(this.props, 'account', ['name', 'mail'], {})} */}
          <CardSection showDivider={false}>
            <Input
              label="Username"
              onChangeText={text => onProfileChange('account', 'name', text)}
              value={this.props.account.name}
              editable={false}
            />
          </CardSection>

          <CardSection showDivider={false}>
            <Input
              label="Email"
              onChangeText={text => onProfileChange('account', 'mail', text)}
              value={this.props.account.mail}
              editable={false}
            />
          </CardSection>

          <Card rounded={true}>
            <Header
              headerText="Personal"
              showButton={R.not(this.props.isEditable)}
              onPress={() => this.props.editButtonPressed()}
              //onPress={() => this.refs['name'].focus()}
            />
            {this.newRenderUpdateButton()}

            <CardSection>
              <Input
                label="First Name"
                value={individual.nameFirst}
                onChangeText={text => onProfileChange('individual', 'nameFirst', text)}
                editable={isEditable}
                //autoFocus={isEditable}
              />
            </CardSection>
            <CardSection>
              <Input
                label="Middle Name"
                value={individual.nameMiddle}
                onChangeText={text => onProfileChange('individual', 'nameMiddle', text)}
                editable={isEditable}
              />
            </CardSection>
            <CardSection>
              <Input
                label="Last Name"
                value={individual.nameLast}
                onChangeText={text => onProfileChange('individual', 'nameLast', text)}
                editable={isEditable}
              />
            </CardSection>
            <CardSection>
              <Input
                label="Phone"
                value={individual.phone}
                onChangeText={text => onProfileChange('individual', 'phone', text)}
                editable={isEditable}
              />
            </CardSection>
            <CardSection>
              <Input
                label="Address"
                value={individual.address}
                onChangeText={text => onProfileChange('individual', 'address', text)}
                editable={isEditable}
              />
            </CardSection>
            <CardSection>
              <Input
                label="City"
                value={individual.city}
                onChangeText={text => onProfileChange('individual', 'city', text)}
                editable={isEditable}
              />
            </CardSection>
            <CardSection>
              <Input
                label="State"
                value={individual.state}
                onChangeText={text => onProfileChange('individual', 'state', text)}
                editable={isEditable}
              />
            </CardSection>
            <CardSection>
              <Input
                label="Zip"
                value={individual.zip}
                onChangeText={text => onProfileChange('individual', 'zip', text)}
                editable={isEditable}
              />
            </CardSection>
          </Card>
        </View>
      </ScrollView>
    );
  }

  render() {
    if (this.props.isLoaded) {
      return this.renderProfile();
    }
    return (
      <View style={styles.spinnerView}>
        <Spinner size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerView: {
    //marginTop: 200,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editSpinner: {
    marginTop: 10,
  },
  editButtons: {
    // flex: 1,
    // justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  editButton: {
    flex: 1,
  },
  buttonView: {
    marginTop: 20,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
  };
};
// getUser,
// logout,
// onChange,
// onFieldChange,
// onProfileChange,
// resetProfile,
// updateProfile,
// editButtonPressed,
// cancelButtonPressed,

export default connect(mapStateToProps, profileActions)(ProfileScreen);
function newFunction() {
  input();
}
