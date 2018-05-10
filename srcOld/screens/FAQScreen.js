import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { logout } from '../actions';
import { TextIndent } from '../components/common';

class IdeaExpoScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'FAQ',
  };

  render() {
    return (
      <ScrollView>
        <Card containerStyle={styles.card} title="FAQ">
          <Text style={styles.question}>When do I get my stock/units/interest?</Text>
          <View style={styles.answer}>
            <TextIndent>
              On average an offering will run a campaign of about 90 days before it closes. You have
              the right to change your mind (rescind) your investment in the issue up to 48 hours
              before it closes. You will be asked to sign a SUBSCRIPTION AGREEMENT and once fully
              executed the issuer is expected to provide the investors with their certificates or
              other instruments.
            </TextIndent>
          </View>

          <Divider />

          <Text style={styles.question}>How do ACH transfers work?</Text>
          <View style={styles.answer}>
            <TextIndent>
              ACH, or Automatic Clearing House, is the main way all money transfers from one bank to
              another in the US. Our system follows industry best-practices when enrolling an
              account by making two "micro-deposits" in your designated account and then requiring
              you to tell us how much we deposited. Once confirmed, we'll withdraw the same amount
              deposited as a single transaction to confirm that your account supports two-way
              transfers. You'll then be able to make investments directly using your bank account.
              Our system bundles all transactions and sends them to our escrow bank once a day.
            </TextIndent>
          </View>

          <Divider />

          <Text style={styles.question}>When does money transfer to escrow?</Text>
          <View style={styles.answer}>
            <TextIndent>
              Only when an investor with a connected bank account “Funds via ACH”, by mailing a
              check or doing a wire transfer.
            </TextIndent>
          </View>

          <Divider />

          <Text style={styles.question}>
            What is the difference between a ‘Pledge’ and an ‘Offer’ ?
          </Text>
          <View style={styles.answer}>
            <TextIndent>
              A Pledge is an expression of support for a given campaign that has fixed terms set by
              the issuer whereas an Offer is made by an investor on their terms. Our CrowdRate™
              system gives investors the ability to select an interest rate and amount individually
              and then Offer the issuer the opportunity to review and approve or decline.
            </TextIndent>
          </View>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  answer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
  card: {
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    marginTop: 10,
    fontWeight: 'bold',
    color: '#2e2e2e',
    fontSize: 15,
  },
});

const mapStateToProps = ({ auth }) => {
  const { authToken, error, loading, isLoggedIn } = auth;
  return { authToken, error, loading, isLoggedIn };
};

// export default LobbyScreen;
export default connect(mapStateToProps, { logout })(IdeaExpoScreen);
