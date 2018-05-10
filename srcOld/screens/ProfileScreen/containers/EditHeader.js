import { View } from 'react-native';
import React, { Component } from 'react';

import { CancelButton, SaveButton } from '../components/UpdateButton';
import { connect } from '../../../globals';
import { profileActions } from '../../../reducers/ducks/profile/action';
import EditButton from '../components/EditButton';

class EditHeader extends Component {
  render() {
    const { viewStyle } = styles;
    let { showButton = true } = this.props;
    const { onPress = () => this.props.editButtonPressed() } = this.props;
    const meta = this.props.meta;

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

const styles = {
  viewStyle: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    marginTop: 10,
    marginBottom: 0,
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
    paddingRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
  },
  buttonView: {
    flexDirection: 'row',
    //backgroundColor: 'rgb(33, 156, 217)',
  },
};

const mapStateToProps = state => {
  return ({ meta } = state.profile);
};

export default connect(mapStateToProps, profileActions)(EditHeader);
