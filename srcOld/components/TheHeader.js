import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { goBack, InvestThunk, menuPressed, closePressed, detailBackPressed } from '@actions';

class TheHeader extends Component {
  renderLeftButton() {
    if (this.props.header.showMenuButton) {
      return (
        <TouchableOpacity onPress={() => this.props.menuPressed()}>
          <SimpleLineIcons name="menu" size={25} color="#ffffff" />
        </TouchableOpacity>
      );
    } else if (this.props.header.showBackButton) {
      return (
        <TouchableOpacity onPress={() => this.props.goBack()}>
          <Ionicons name="md-arrow-round-back" size={30} color="#ffffff" />
        </TouchableOpacity>
      );
    } else if (this.props.header.showDrawerCloseButton) {
      return (
        <TouchableOpacity onPress={() => this.props.closePressed()}>
          <MaterialCommunityIcons name="window-close" size={30} color="#ffffff" />
        </TouchableOpacity>
      );
    }
  }

  render() {
    return (
      <View style={styles.headerView}>
        <View style={styles.buttonView}>{this.renderLeftButton()}</View>
        <View style={styles.headerTitleView}>
          <Text style={styles.textStyle}>Silicon Prairie</Text>
        </View>
        <View style={styles.buttonView} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerTitleView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    // backgroundColor: '#24b621',
    minWidth: 50,
    flex: 10,
    // borderWidth:1,
    // borderColor: '#000000'
  },
  buttonView: {
    paddingLeft: 15,
    justifyContent: 'center',
    height: 50,
    // backgroundColor: '#24b621',
    minWidth: 50,
    flex: 1,
    // borderWidth:1,
    // borderColor: '#000000'
  },
  headerView: {
    height: 70,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    // flex: 1,
    // height: 60,
    backgroundColor: '#2ecc71',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

const mapStateToProps = ({ header }) => {
  const { showBackButton } = header;
  return { showBackButton, header };
};

// export default TheHeader;
export default connect(mapStateToProps, {
  goBack,
  InvestThunk,
  menuPressed,
  closePressed,
  detailBackPressed,
})(TheHeader);
