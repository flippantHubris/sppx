import { View } from "react-native";
import React, { Component } from "react";

import { Card, CardSection, Header, Input } from "@common";
import { connect } from "react-redux";

import { onProfileChange } from "@reducers/ducks/profile/action";

// showButton={R.not(this.props.isEditable)}
// onPress={() => this.props.editButtonPressed()}
// onPress={() => this.refs['name'].focus()}

class IndividualContainer extends Component {
  render() {
    const { individual } = this.props;
    const isEditable = this.props.meta.isEditable;
    const onProfileChange = this.props.onProfileChange;
    return (
      <View>
        <Card rounded>
          <Header headerText="Individual" />

          <CardSection>
            <Input
              label="First Name"
              value={individual.nameFirst}
              onChangeText={text =>
                onProfileChange("individual", "nameFirst", text)
              }
              editable={isEditable}
              // autoFocus={isEditable}
            />
          </CardSection>
          <CardSection>
            <Input
              label="Middle Name"
              value={individual.nameMiddle}
              onChangeText={text =>
                onProfileChange("individual", "nameMiddle", text)
              }
              editable={isEditable}
            />
          </CardSection>
          <CardSection>
            <Input
              label="Last Name"
              value={individual.nameLast}
              onChangeText={text =>
                onProfileChange("individual", "nameLast", text)
              }
              editable={isEditable}
            />
          </CardSection>
          <CardSection>
            <Input
              label="Phone"
              value={individual.phone}
              onChangeText={text =>
                onProfileChange("individual", "phone", text)
              }
              editable={isEditable}
            />
          </CardSection>
          <CardSection>
            <Input
              label="Address"
              value={individual.address}
              onChangeText={text =>
                onProfileChange("individual", "address", text)
              }
              editable={isEditable}
            />
          </CardSection>
          <CardSection>
            <Input
              label="City"
              value={individual.city}
              onChangeText={text => onProfileChange("individual", "city", text)}
              editable={isEditable}
            />
          </CardSection>
          <CardSection>
            <Input
              label="State"
              value={individual.state}
              onChangeText={text =>
                onProfileChange("individual", "state", text)
              }
              editable={isEditable}
            />
          </CardSection>
          <CardSection>
            <Input
              label="Zip"
              value={individual.zip}
              onChangeText={text => onProfileChange("individual", "zip", text)}
              editable={isEditable}
            />
          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = {
  defaultStyle: {
    flex: 1
  }
};

const mapStateToProps = state => ({ individual, meta } = state.profile);

export default connect(mapStateToProps, { onProfileChange })(
  IndividualContainer
);
