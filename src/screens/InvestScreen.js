import {
  Foundation,
  FontAwesome,
  MaterialCommunityIcons,
  SimpleLineIcons
} from '@expo/vector-icons';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Button
} from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import {
  InvestThunk,
  setNID,
  resetDetails,
  getAllIssueDetail,
  getIssues,
  setIid
} from '@actions';
import { Spinner } from '@common';
import HeaderButton from '@components/HeaderButton';
import SpinnerView from '@components/SpinnerView';

const extractKey = ({ nid }) => nid.toString();

class InvestScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <HeaderButton
        Comp={SimpleLineIcons}
        name="user"
        onPress={() => navigation.navigate('profile')}
      />
    )
  });
  // componentWillMount() {
  //   if (this.props.issuesFetched === false) {
  //     // this.props.InvestThunk();
  //     this.props.getIssues();
  //   }
  //   this.props.resetDetails();
  // }

  componentDidMount() {
    if (this.props.issuesFetched === false) {
      // this.props.InvestThunk();
      this.props.getIssues();
    }
    this.props.resetDetails();
  }

  renderList() {
    if (this.props.issuesFetched === false) {
      return (
        // <View style={styles.spinnerView}>
        //   <Spinner size="large" />
        // </View>
        <SpinnerView />
      );
    }
    return (
      <FlatList
        style={styles.container}
        data={this.props.invest.newAllIssues}
        // data={this.props.invest.allIssues}
        renderItem={this.renderItem}
        keyExtractor={extractKey}
      />
    );
  }

  issueSelected(item) {
    // this.props.setNID(item.nid);

    this.props.setIid(item.iid);

    this.props.navigation.navigate('investDetail', { title: item.title });
  }

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.issueSelected(item)}>
      <View style={styles.row}>
        <Image
          style={{ height: 60, width: 60 }}
          // source={require('../../assets/prairie.jpg')}
          source={{
            // uri: 'https://api.sppx.io/sites/default/files/issues/GarlicShrimp-1024x749.png',
            uri: item.imageUrl
          }}
        />
        <Text style={styles.rowText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.newTitleView}>
          <Text h4>Current Opportunities</Text>
        </View>
        {this.renderList()}
      </View>
    );
  }

  renderOld() {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <View style={styles.headerButton} />
          <View style={styles.newTitleView}>
            <Text h4>Current Opportunities</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('InvestOverview')}
          >
            {/* <View style={styles.headerButton}>
              <FontAwesome name="question-circle" size={27} color="#2ecc71" />
            </View> */}
          </TouchableOpacity>
        </View>

        {this.renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerView: {
    // marginTop: 200,
    flex: 1,
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerButton: {
    width: 50,
    height: 50,
    // backgroundColor: '#8b9dcc',
    alignItems: 'center',
    justifyContent: 'center'
  },

  container: {
    // marginTop: 20,
    flex: 1,
    // backgroundColor: '#e0e0e0',
    backgroundColor: '#ffffff'
  },
  row: {
    marginBottom: 2,
    backgroundColor: '#2ecc71',

    flexDirection: 'row',
    alignItems: 'center'
  },
  rowText: {
    color: '#ffffff',
    fontWeight: 'bold',
    padding: 15
  },
  textView: {
    padding: 15
  },
  titleView: {
    alignItems: 'center',
    position: 'relative',
    paddingTop: 20,
    paddingBottom: 20
  },
  newTitleView: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = ({ auth, invest }) => {
  const { authToken, error, loading, isLoggedIn } = auth;
  const { issuers, loadingIssues, issuesFetched } = invest;
  return {
    authToken,
    error,
    loading,
    isLoggedIn,
    invest,
    issuers,
    loadingIssues,
    issuesFetched
  };
};

// export default LobbyScreen;
export default connect(mapStateToProps, {
  InvestThunk,

  setNID,
  setIid,

  resetDetails,
  getAllIssueDetail,
  getIssues
})(InvestScreen);
