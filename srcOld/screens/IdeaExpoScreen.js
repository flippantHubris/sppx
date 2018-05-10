import { Entypo } from '@expo/vector-icons';
import { StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { FontAwesome, Text, TouchableOpacity, View } from '../globals';
import { logout } from '../actions';

let data = [
  {
    nid: 0,
    quest: 'how erw ews',
    answer: 'qwee djdjd dddd ooo',
    showAnswer: false,
  },
];

const extractKey = ({ nid }) => nid;

class IdeaExpoScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'IDEA EXPO',
    tabBarIcon: ({ tintColor }) => <Entypo name="light-bulb" size={24} color={tintColor} />,
    // drawerLabel: 'Idea Expo',
    tabBarVisible: true,
  };

  state = {
    data: [
      {
        nid: 0,
        quest: 'how erw ews',
        answer: 'qwee djdjd dddd ooo',
        showAnswer: false,
      },
    ],
    one: {
      nid: 0,
      quest: 'how erw ews',
      answer: 'qwee djdjd dddd ooo',
      showAnswer: false,
    },
    showAnswer: [false, false, false],
  };

  renderList() {
    return (
      <FlatList
        style={styles.container}
        data={this.state.data}
        //data={this.props.invest.allIssues}
        renderItem={this.renderItem}
        keyExtractor={extractKey}
      />
    );
  }

  issueSelected(item) {
    //this.props.setNID(item.nid);
    //this.props.setIid(item.iid);
    //this.props.navigation.navigate('InvestDetail', { title: item.title });
    // item.showAnswer = !item.showAnswer;
    // let newItem = this.state.data[]
    // this.state.data[item.nid] = item
    // let newState = this.state.showAnswer;
    // newState[item.nid] = !newState[item.nid];
    // this.setState({ showAnswer: newState });
    // console.log(this.state.showAnswer);

    // let newItem = this.state.data[item.nid];
    // newItem.showAnswer = !newItem.showAnswer;
    // let newData = this.state.data;
    // newData[item.nid] = newItem;
    // this.setState({ data: newData });

    let newAray = this.state.showAnswer;
    newAray[item.nid] = !newAray[item.nid];
    this.setState({ showAnswer: newAray });
    console.log(this.state.showAnswer);
  }
  renderAnswer(item) {
    // if (item.showAnswer === true) {
    //   return <Text>{this.state.data[item.nid].answer}</Text>;
    // }
    if (this.state.showAnswer[item.nid] === true) {
      return <Text>{item.answer}</Text>;
    }
  }

  renderAnswerTest() {
    let item = { nid: 0, answer: 'qwee djdjd dddd ooo' };
    // if (item.showAnswer === true) {
    //   return <Text>{this.state.data[item.nid].answer}</Text>;
    // }
    if (this.state.showAnswer[item.nid] === true) {
      return <Text>{item.answer}</Text>;
    }
  }

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.issueSelected(item)}>
      <View style={styles.row}>
        <Text style={styles.rowText}>{item.quest}</Text>
        {this.renderAnswer(item)}
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <View style={styles.headerButton} />
          <View style={styles.titleView}>
            <Text h4>Current Opportunities</Text>
          </View>

          <TouchableOpacity onPress={() => console.log('stuff')}>
            <View style={styles.headerButton}>
              <FontAwesome name="question-circle" size={27} color="#2ecc71" />
            </View>
          </TouchableOpacity>
        </View>

        {this.renderList()}
        {this.renderAnswerTest()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerView: {
    marginTop: 200,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButton: {
    width: 50,
    height: 50,
    // backgroundColor: '#8b9dcc',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    // marginTop: 20,
    flex: 1,
    // backgroundColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  row: {
    marginBottom: 2,
    backgroundColor: '#2ecc71',

    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    color: '#ffffff',
    fontWeight: 'bold',
    padding: 15,
  },
  textView: {
    padding: 15,
  },
  titleView: {
    alignItems: 'center',
    position: 'relative',
    paddingTop: 20,
    paddingBottom: 20,
  },
});

const stylesOld = StyleSheet.create({
  card: {
    borderRadius: 10,
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

// export default LobbyScreen;
export default connect(mapStateToProps, { logout })(IdeaExpoScreen);
