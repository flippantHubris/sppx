import EditHeader from './EditHeader';
import { View } from 'react-native';
import React, { Component } from 'react';

import { CardSection, Input } from '../../../components/common';
import { connect } from '../../../globals';
import { onProfileChange } from '../../../reducers/ducks/profile/action';

class AccountContainer extends Component {
  render() {
    return (
      <View>
        <CardSection showDivider={false}>
          <Input
            label="Username"
            onChangeText={text => this.props.onProfileChange('account', 'name', text)}
            value={this.props.account.name}
            // editable={this.props.meta.isEditable}
            editable={false}
          />
        </CardSection>

        <CardSection showDivider={false}>
          <Input
            label="Email"
            onChangeText={text => this.props.onProfileChange('account', 'mail', text)}
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
    flex: 1,
  },
};

const mapStateToProps = state => {
  return ({ account, meta } = state.profile);
};

export default connect(mapStateToProps, { onProfileChange })(AccountContainer);
