import { View } from 'react-native';
import React, { Component } from 'react';

import { Card, CardSection, Header, Input, InputSection } from '../../../components/common';
import { CheckCircle } from '../components/CheckCircle';
import { Image, Text, TouchableOpacity, connect } from '../../../globals';
import { profileActions } from '../../../reducers/ducks/profile/action';
import { postLogout } from '../../../actions/Login';

class InvestorContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Card rounded={true}>
          <Header headerText="Investor" />

          {this.renderStateIDSectionNew()}

          {/* {this.renderLogoutButton()} */}
        </Card>
      </View>
    );
  }

  renderStateIDSection() {
    return (
      <CardSection>
        <Input label="State ID" />

        <SubField>
          <View style={styles.row}>
            <Button onPress={() => this.props.takePicture()}>Take Picture</Button>
            <Button onPress={() => this.props.getPicture()}>Use Picture</Button>
          </View>
          {this.renderImage()}
          {/* {this.renderUploadButton()}

          {this.renderSetButton()} */}
          {/* {this.renderUploadAndSetButton()} */}
        </SubField>
      </CardSection>
    );
  }

  renderStateIDSectionNew() {
    return (
      <View style={styles.cardSection}>
        <Input label="State ID" editable={false} />

        <View>
          <View style={styles.row}>
            <Button onPress={() => this.props.takePicture()}>Take Picture</Button>
            <Button onPress={() => this.props.getPicture()}>Use Picture</Button>
          </View>
          {this.renderImage()}
          {/* {this.renderUploadButton()}

          {this.renderSetButton()} */}
          {this.renderUploadAndSetButton()}
        </View>
      </View>
    );
  }

  renderUploadButton() {
    if (this.props.investor.stateIDSet === true && this.props.investor.fileUploaded === false) {
      return <Button onPress={() => this.props.uploadPicture()}>Upload</Button>;
    }
  }

  renderUploadAndSetButton() {
    if (this.props.investor.stateIDSet === true && this.props.investor.fileUploaded === false) {
      return <Button onPress={() => this.props.uploadAndSet()}>Upload</Button>;
    }
  }

  renderLogoutButton() {
    const logout = () => {
      this.props.navigate('login');
      this.props.postLogout();
    };

    //const { navigate } = this.props.navigation;
    return <Button onPress={logout}>Logout</Button>;
  }

  renderSetButton() {
    if (
      this.props.investor.fileUploaded === true &&
      this.props.investor.stateIdSetSuccess === false
    ) {
      return (
        <View style={{ paddingTop: 10 }}>
          <Button onPress={() => this.props.setStateFid()}>Set as State ID</Button>
        </View>
      );
    }
  }

  renderImage() {
    if (this.props.investor.stateID || this.props.investor.hasStateId) {
      return (
        <View style={styles.imageView}>
          <Image
            source={{ uri: this.props.investor.stateID.uri }}
            style={{ width: '100%', maxHeight: 350, minHeight: 300 }}
          />
        </View>
      );
    }
  }

  renderOld() {
    return (
      <View>
        <Card rounded={true}>
          <Header headerText="Investor" />

          {this.renderStateIDSection()}

          <CardSection>
            <InputSection label="Ownership">
              <View style={styles.ownership}>
                <CheckCircle
                  checked={this.props.investor.ownership.individual}
                  onToggle={() => this.props.toggle('individual')}
                />
                <Text style={styles.ownershipText}>Individual</Text>
              </View>

              <View style={styles.ownership}>
                <CheckCircle
                  checked={this.props.investor.ownership.jointTenents}
                  onToggle={() => this.props.toggle('jointTenents')}
                />
                <Text style={styles.ownershipText}>Joint Tenants*</Text>
              </View>

              <View style={styles.ownership}>
                <CheckCircle
                  checked={this.props.investor.ownership.tenantsInCommon}
                  onToggle={() => this.props.toggle('tenantsInCommon')}
                />
                <Text style={styles.ownershipText}>Tenants in Common*</Text>
              </View>
              <View style={styles.ownership}>
                <CheckCircle
                  checked={this.props.investor.ownership.trustOrEntity}
                  onToggle={() => this.props.toggle('trustOrEntity')}
                />
                <Text style={styles.ownershipText}>Trust or Entity</Text>
              </View>
            </InputSection>
          </CardSection>

          <CardSection>
            <Input label="*Relationship" />
            {/* // value={individual.nameFirst}
              // onChangeText={text => onProfileChange('individual', 'nameFirst', text)}
              // editable={isEditable}
            //autoFocus={isEditable} */}
            <SubField>
              <Description>
                If the Ownership is "Joint Tenants" or "Tenants in Common" please describe the
                relationship (e.g. Married, Domestic Partners, Investment Club, etc)
              </Description>
            </SubField>
          </CardSection>

          <CardSection>
            <InputSection label="Accreditation">
              <View style={styles.ownership}>
                <CheckCircle
                  checked={this.props.investor.accredited}
                  onToggle={() => this.props.toggle2('accredited', 'investor')}
                />
                <Text style={styles.ownershipText}>Accredited</Text>
              </View>
            </InputSection>
            <SubField>
              <View style={styles.accreditedSub}>
                <View style={styles.accreditedSubItem}>
                  <CheckCircle
                    checked={this.props.investor.accreditation.networth}
                    onToggle={() => this.props.toggle2('networth', 'accreditation')}
                  />
                  <View style={styles.accreditedItemDetailView}>
                    <Text style={styles.accreditedItemTitle}>Networth</Text>
                    <Text style={styles.descriptionText}>
                      I have a net worth, or a joint net worth together with my spouse, in excess of
                      $1,000,000, excluding the value of my primary residence.
                    </Text>
                  </View>
                </View>

                <View style={styles.accreditedSubItem}>
                  <CheckCircle
                    checked={this.props.investor.accreditation.income}
                    onToggle={() => this.props.toggle2('income', 'accreditation')}
                  />
                  <View style={styles.accreditedItemDetailView}>
                    <Text style={styles.accreditedItemTitle}>Income</Text>
                    <Text style={styles.descriptionText}>
                      I had an individual income in excess of $200,000 in each of the prior two
                      years and reasonably expect an income in excess of $200,000 in the current
                      year.
                    </Text>
                  </View>
                </View>

                <View style={styles.accreditedSubItem}>
                  <CheckCircle
                    checked={this.props.investor.accreditation.jointIncome}
                    onToggle={() => this.props.toggle2('jointIncome', 'accreditation')}
                  />
                  <View style={styles.accreditedItemDetailView}>
                    <Text style={styles.accreditedItemTitle}>Joint Income</Text>
                    <Text style={styles.descriptionText}>
                      I had joint income with my spouse in excess of $300,000 in each of the prior
                      two years and reasonably expect joint income in excess of $300,000 in the
                      current year.
                    </Text>
                  </View>
                </View>
              </View>
            </SubField>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const Description = props => {
  console.log(props);
  return (
    <View style={styles.description}>
      <Text style={styles.descriptionText}>{`${props.children}`}</Text>
    </View>
  );
};

const SubField = props => {
  return <View style={styles.subfield}>{props.children}</View>;
};

const Button = ({ onPress, children, style = styles.buttonStyle }) => {
  const { buttonStyle, textStyle } = buttonStyles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const buttonStyles = {
  textStyle: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#2ecc71',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2ecc71',
    marginLeft: 5,
    marginRight: 5,
  },
};

// If the Ownership is "Joint Tenants" or "Tenants in Common" please describe the relationship (e.g. Married, Domestic Partners, Investment Club, etc)

const styles = {
  container: {
    paddingBottom: 20,
  },
  cardSection: {
    paddingTop: 10,
  },
  ownership: {
    flex: 1,
    //backgroundColor: 'rgb(32, 194, 189)',
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 40,
  },
  ownershipText: {
    paddingLeft: 20,
    fontSize: 18,
  },
  description: {
    //height: 50,
    //paddingLeft: 25,
  },
  subfield: {
    //paddingLeft: 25,
  },
  descriptionText: {
    fontSize: 12,
  },
  accreditedSub: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  accreditedSubItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    //justifyContent: 'space-between',
  },
  accreditedItemDetailView: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  accreditedItemTitle: {
    fontSize: 18,
  },
  row: {
    //flex: 1,
    flexDirection: 'row',
    padding: 15,
    //alignItems: 'flex-end',
  },
  blue: {
    backgroundColor: 'rgb(72, 156, 224)',
  },
  green: {
    backgroundColor: 'rgb(72, 224, 128)',
  },
  imageView: {
    alignItems: 'center',
    padding: 15,
  },
};

const mapStateToProps = state => {
  return ({ investor, meta } = state.profile);
};

// const actions = {
//   ...profileActions,
//   postLogout,
// };

export default connect(mapStateToProps, profileActions)(InvestorContainer);
