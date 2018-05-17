import { View, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
import { profileActions } from "@reducers/ducks/profile/action";
import {
  Foundation,
  FontAwesome,
  MaterialCommunityIcons,
  SimpleLineIcons
} from "@expo/vector-icons";
import EditButton from "../components/EditButton";
import { CancelButton, SaveButton } from "../components/UpdateButton";

// const EditButton = props => {
//   const { onPress = () => console.log("button pressed") } = props;

//   return (
//     <TouchableOpacity onPress={onPress}>
//       <FontAwesome name="edit" size={28} color="rgb(46, 204, 113)" />
//     </TouchableOpacity>
//   );
// };

class EditHeader extends Component {
  render() {
    const { viewStyle } = styles;
    const { showButton = true } = this.props;
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
    }
    return (
      <View style={styles.viewStyle}>
        <EditButton onPress={this.props.editButtonPressed} />
        {/* <TouchableOpacity onPress={this.props.editButtonPressed}>
          <FontAwesome name="edit" size={28} color="rgb(46, 204, 113)" />
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    marginTop: 10,
    marginBottom: 0,
    position: "relative"
  },
  textStyle: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold"
  },
  touch: {
    position: "absolute",
    alignSelf: "flex-end"
  },
  iconStyle: {
    paddingRight: 10,
    backgroundColor: "rgba(255, 255, 255, 0.0)"
  },
  buttonView: {
    flexDirection: "row"
    // backgroundColor: 'rgb(33, 156, 217)',
  }
};

const mapStateToProps = state => ({ meta } = state.profile);

export default connect(mapStateToProps, profileActions)(EditHeader);
