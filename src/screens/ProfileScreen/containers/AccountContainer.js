import { View } from "react-native";
import React, { Component } from "react";

import { CardSection, Input } from "@common";
import { connect } from "react-redux";
import { onProfileChange } from "@reducers/ducks/profile/action";
// import EditHeader from "./EditHeader";

class AccountContainer extends Component {
  render() {
    return (
      <View>
        <CardSection showDivider={false}>
          <Input
            label="Username"
            onChangeText={text =>
              this.props.onProfileChange("account", "name", text)
            }
            value={this.props.account.name}
            // editable={this.props.meta.isEditable}
            editable={false}
          />
        </CardSection>

        <CardSection showDivider={false}>
          <Input
            label="Email"
            onChangeText={text =>
              this.props.onProfileChange("account", "mail", text)
            }
            value={this.props.account.mail}
            // editable={this.props.meta.isEditable}
            editable={false}
          />
        </CardSection>
      </View>
    );
  }
}

const styles = {
  defaultStyle: {
    flex: 1
  }
};

const mapStateToProps = state => ({ account, meta } = state.profile);

export default connect(mapStateToProps, { onProfileChange })(AccountContainer);
