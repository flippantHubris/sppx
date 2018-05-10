import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { Foundation } from '@expo/vector-icons';
import { TextIndent } from '../components/common';

class InvestOverview extends Component {
  static navigationOptions = ({ navigation }) => ({
    // title: navigation.state.params.title,
    tabBarLabel: 'INVEST',
    tabBarIcon: ({ tintColor }) => <Foundation name="dollar-bill" size={27} color={tintColor} />,
    header: null,
    drawerLabel: 'Invest Overview',
  });

  render() {
    return (
      <ScrollView>
        <View>
          <Card containerStyle={styles.card} title="Invest Overview">
            <TextIndent>
              Silicon Prairie Online (SPPX) offers a variety of investment opportunities including
              both debt and equity issues as well as grants for non-profit organizations. Our portal
              is a great place for businesses looking to raise capital as well as for investors who
              are looking to earn a good return on their investments. We support:
            </TextIndent>
            <TextIndent>
              {
                '\u2022 Debt based offerings including fixed interest rates as well as a "Dutch Auction" style that can drive the cost of capital down'
              }
            </TextIndent>
            <TextIndent>{'\u2022 Equity'}</TextIndent>
            <TextIndent>
              {'\u2022 Convertibles including Simple Agreements for Future Equity (SAFE)'}
            </TextIndent>
            <TextIndent>{'\u2022 Grants (donations) for qualifying non-profits'}</TextIndent>
            <Button
              buttonStyle={{ borderRadius: 5, marginTop: 15 }}
              raised
              title="Register for Investor Access"
              backgroundColor="#2ecc71"
              textStyle={{ fontSize: 18 }}
              onPress={() => console.log('d')}
            />
          </Card>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
  },
  buttonView: {
    marginTop: 20,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default InvestOverview;
