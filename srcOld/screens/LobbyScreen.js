import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { logout } from '../actions';
import { TextIndent } from '../components/common';

class LobbyScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'LOBBY',
    tabBarIcon: ({ tintColor }) => <Entypo name="flower" size={26} color={tintColor} />,
    tabBarVisible: true,
    // drawerLabel: 'Lobby',
  };

  onLogoutButtonPress() {
    this.props.logout(this.props.authToken);
    this.props.navigation.navigate('login');
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Card containerStyle={styles.card} title="The Lobby">
            <TextIndent>
              Welcome CrowdfundFan to the Silicon Prairie, Where Good Ideas Grow!
            </TextIndent>

            <Divider style={{ marginTop: 5, marginBottom: 5 }} />
            <TextIndent>
              I'm personally very excited to have you join our growing community of investors,
              issuers and partners. Now that crowdfunding has finally come to Minnesota through
              MNvest, together we're going to re-level the investing playing field through a new
              democratization of capital to power up innovative entrepreneurs, the risk-takers and
              the dreamers!
            </TextIndent>
            <TextIndent>
              Be sure to fill out your Individual Profile including a picture of your Minnesota ID
              or proof of residency document to become eligible for Investor status! You'll find
              your profiles on the main menu to the upper right under your username.
            </TextIndent>
            <TextIndent>
              Once you have your Individual Profile filled out, then click here to learn more about
              becoming an approved investor to then be able to see investment opportunities near
              you!
            </TextIndent>
            <TextIndent>
              I'm delighted to announce that our company has been certified as a qualifying MN Angel
              Tax Credit company. This benefit can mean up to a 25% tax credit for ANY investor who
              invests a minimum of $10,000 in a qualifying offering!
            </TextIndent>

            <TextIndent>
              We also have a great investor perk as part of our offering: Anyone who invests at
              least $2,500 in our offering will get a matching portal services credit for up to two
              years! PERFECT for anyone thinking about doing a crowdfunding raise soon.
            </TextIndent>

            <TextIndent>
              If you have any questions or suggestions feel free to open a Support ticket from the
              main menu or send me an email directly david.duccini@sppx.io
            </TextIndent>

            <TextIndent>
              On behalf of our advisors, thank you for your support! Happy crowdfunding!
            </TextIndent>

            <Text>Sincerely,</Text>
            <Text>David V Duccini</Text>
            <Text>Founder & CEO</Text>
            <Text>Silicon Prairie Holdings, Inc.</Text>
          </Card>

          {/* <View style={styles.buttonView}>
          <Button
            buttonStyle={{ borderRadius: 5 }}
            raised
            title="Logout"
            backgroundColor="#2ecc71"
            textStyle={{ fontSize: 20 }}
            onPress={this.onLogoutButtonPress.bind(this)}
          />
        </View> */}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
  },
  divider: {
    paddingTop: 5,
    paddingBottom: 5,
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

const mapStateToProps = ({ auth }) => {
  const { authToken, error, loading, isLoggedIn } = auth;

  return { authToken, error, loading, isLoggedIn };
};

export default connect(mapStateToProps, { logout })(LobbyScreen);
