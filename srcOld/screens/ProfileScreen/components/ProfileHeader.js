// Import libraries for making a component
import { FontAwesome } from '@expo/vector-icons';
import { Text, View, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

import { connect } from '../../../globals';
import { profileActions } from '../../../reducers/ducks/profile/action';
import EditButton from './EditButton';

import UpdateButton, { SaveButton, CancelButton } from './UpdateButton';

const renderEditButtonOld = (showButton, onPress) => {
  if (showButton === true) {
    return <EditButton onPress={onPress} />;
  }
};

const renderUpdateButtons2 = showButtons => {
  if (showButtons === true) {
    return <UpdateButtons />;
  }
};

const renderEditButton = (showButton, onPress) => {
  if (showButton === true) {
    return (
      <View style={styles.viewStyle}>
        <EditButton onPress={onPress} />
      </View>
    );
  }
};

const renderUpdateButtons = props => {
  if (props.meta.isEditable === true) {
    return (
      <View style={styles.buttonView}>
        <SaveButton title="Save" touchable={false} />
        <CancelButton onPress={() => console.log('button pressed')} title="Cancel" />
      </View>
    );
  }
};

// Make a component
// isLoaded,
// isEditable,
// account,
// individual,
// showEditButton,
// showUpdateButton,
// updatingProfile,
// hasBeenEdited,
// investor,

class ProfileHeader extends Component {
  render() {
    const { viewStyle } = styles;
    let { showButton = true } = this.props;
    //let { onPress = () => console.log('button pressed2') } = this.props;
    const { onPress = () => this.props.editButtonPressed() } = this.props;
    const meta = this.props.meta;
    console.log('ProfileHeader');
    console.log(meta);

    // return (
    //   <View>
    //     <View style={styles.buttonView}>
    //       <SaveButton title="Save" touchable={true} />
    //       <CancelButton onPress={() => console.log('button pressed')} title="Cancel" />
    //     </View>
    //   </View>
    // );

    if (meta.isEditable) {
      return (
        <View style={styles.buttonView}>
          <SaveButton
            title="Save"
            touchable={this.props.meta.hasBeenEdited}
            onPress={this.props.updateProfile}
          />
          <CancelButton
            onPress={() => {
              this.props.resetProfile();
              this.props.cancelButtonPressed();
            }}
            title="Cancel"
          />
        </View>
      );
    } else {
      return (
        <View style={styles.viewStyle}>
          <EditButton onPress={this.props.editButtonPressed} />
        </View>
      );
    }
  }
}

// const ProfileHeader = props => {
//   const { textStyle, viewStyle } = styles;
//   let { showButton = true } = props;
//   let { onPress = () => console.log('button pressed') } = props;
//   const meta = this.props.meta;
//   return (
//     <View style={viewStyle}>
//       {renderEditButton(showButton, onPress)}
//       {renderUpdateButtons(meta.showUpdateButton)}
//
//       <UpdateButtons />
//     </View>
//   );
// };

const styles = {
  viewStyle: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: 'transparent',
    //backgroundColor: rgba(46, 190, 204, 0),
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    marginTop: 10,
    marginBottom: 0,
    //shadowColor: '#000',
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.2,
    //elevation: 2,
    position: 'relative',
  },
  textStyle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  touch: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  iconStyle: {
    // position: 'absolute',
    // alignSelf: 'flex-end',
    //marginRight: 20,
    paddingRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
  },
  buttonView: {
    // marginTop: 20,
    // marginBottom: 20,
    flexDirection: 'row',
    //height: 50,
  },
};

const mapStateToProps = state => {
  return ({ meta } = state.profile);
};

// Make the component available to other parts of the app
//export { ProfileHeader };

export default connect(mapStateToProps, profileActions)(ProfileHeader);
