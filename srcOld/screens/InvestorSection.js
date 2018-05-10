import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { profileActions } from '../actions';

import { Button as SaveButton } from '../components/SaveButton';
import { Card, CardSection, Input, Spinner, Header, InputSection } from '../components/common';
import { CheckCircle } from '../components/CheckCircle';

const InvestorSection = ({ props }) => {
  return (
    <Card rounded={true}>
      <Header
        headerText="Investor"
        showButton={R.not(props.isEditable)}
        onPress={() => props.editButtonPressed()}
        //onPress={() => refs['name'].focus()}
      />
      {/* {newRenderUpdateButton()} */}

      <CardSection>
        <InputSection label="Ownership">
          <CheckCircle
            checked={props.investor.ownership.individual}
            onToggle={() => props.toggle('individual')}
          />
          <CheckCircle
            checked={props.investor.ownership.jointTenents}
            onToggle={() => props.toggle('jointTenents')}
          />
          <CheckCircle
            checked={props.investor.ownership.tenantsInCommon}
            onToggle={() => props.toggle('tenantsInCommon')}
          />
        </InputSection>
      </CardSection>
    </Card>
  );
};

export default InvestorSection;
