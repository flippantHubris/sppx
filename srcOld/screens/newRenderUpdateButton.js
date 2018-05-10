import React from 'react';
import { View, Text } from 'react-native';

const newRenderUpdateButton = ({ props }) => {
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
};

const styles = {
  defaultStyle: {
    flex: 1,
  }
};

export default newRenderUpdateButton;
