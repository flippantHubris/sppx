import { Foundation } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { WebBrowser, MapView } from "expo";
import { connect } from "react-redux";
import R from "ramda";
import React, { Component } from "react";

import { Header, Card as MyCard } from "@common";

import { getIssueDetail, showBackButton } from "@actions";
import ProgressBar from "@components/ProgressBar";

const parseHTML = str => {
  str = str.normalize();
  // str = str.replace(/\r/g, 'RETURN');
  // str = str.replace(/\n/g, 'FEED');
  str = str.replace(/\r/g, "");
  str = str.replace(/\n/g, "");
  str = str.replace(/<br \/>/g, "");
  str = str.replace(/\t/g, "");

  // str = str.replace(/<p>/g, '\t');
  str = str.replace(/<p>/g, "");
  str = str.replace(/<\/p>/g, "\n\r");
  str = str.replace(/<ul>/g, "");
  str = str.replace(/<\/ul>/g, "\n\r");
  str = str.replace(/<li>/g, "\t*");
  str = str.replace(/<\/li>/g, "\r");
  str = str.replace(/&amp;/g, "&");
  str = str.replace(/&nbsp;/g, " ");
  str = str.replace("<em><strong>", "");
  str = str.replace("</strong></em>", "");

  // str = str.replace(/i([\s\S]*?)Vimeo</a>/g, ' ');

  return str;
};

class InvestDetailScreen extends Component {
  // static navigationOptions = ({ navigation }) => ({
  //   // title: navigation.state.params.title,
  //   tabBarLabel: "INVEST",
  //   tabBarIcon: ({ tintColor }) => (
  //     <Foundation name="dollar-bill" size={27} color={tintColor} />
  //   ),
  //   header: null
  // });

  getSelectedIssue(iid) {
    return R.find(R.propEq("iid", this.props.invest.selectedIssueIid))(
      this.props.invest.newAllIssues
    );
  }

  componentWillMount() {
    this.props.showBackButton();
    this.issue = this.getSelectedIssue();
  }

  renderCard() {
    return (
      <ScrollView>
        <View>
          <MyCard>
            <Image
              style={{ width: "100%", maxHeight: 300, minHeight: 200 }}
              resizeMode="cover"
              source={{
                uri: this.issue.imageUrl
              }}
            />
            <View style={styles.titleView}>
              <Text style={styles.titleText}>
                {this.props.navigation.state.params.title}
              </Text>
            </View>

            {/* <Text >{parseInt(this.issue.rtd / this.issue.targetAmount * 100)}</Text>
            <ProgressBar progress={parseInt(this.issue.rtd / this.issue.targetAmount * 100)} /> */}

            <View style={styles.cardBody}>
              <View>
                {/* <Text style={styles.description}>{this.issue.description}</Text> */}
                {/* <Text style={styles.description}>{this.issue.description}</Text> */}
                <Text style={styles.description}>
                  {parseHTML(this.issue.descriptionFull.value)}
                </Text>
              </View>
              {/* {this.renderDetails()} */}

              <Header headerText="Details" />

              <View style={styles.progressView}>
                <Text style={styles.bold}>Funded</Text>
                <View style={{ flex: 1, paddingLeft: 10 }} />
              </View>
            </View>
            <View>
              <Details details={this.issue.detailsArray} />

              <Details details={this.issue.datesArray} />

              <Files files={this.issue.files} />

              {this.renderMap()}
            </View>
          </MyCard>
        </View>
      </ScrollView>
    );
  }

  renderMap() {
    if (this.issue.map.hasCoord === true) {
      return (
        <MapView
          style={{ flex: 1, height: 200, padding: 10, marginTop: 20 }}
          initialRegion={{
            latitude: this.issue.map.lat,
            longitude: this.issue.map.lon,
            latitudeDelta: 0.0052,
            longitudeDelta: 0.0051
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.issue.map.lat,
              longitude: this.issue.map.lon
            }}
            title={this.issue.title}
            // description={'description'}
          />
        </MapView>
      );
    }
    return <View />;
  }

  renderDetails() {
    return (
      <View>
        <View style={styles.rowView}>
          <Text style={styles.bold}>Funded:</Text>
          {/* <ProgressBar progress={parseInt(this.issue.rtd / this.issue.targetAmount * 100)} /> */}
        </View>
        <ProgressBar
          progress={parseInt(this.issue.rtd / this.issue.targetAmount * 100)}
        />

        <View style={styles.rowView}>
          <Text style={styles.bold}>ID:</Text>
          <Text>{this.issue.id}</Text>
        </View>

        <View style={styles.rowView}>
          <Text style={styles.bold}>Raised to date:</Text>
          <Text>${this.issue.rtd}</Text>
        </View>

        <View style={styles.rowView}>
          <Text style={styles.bold}>Accredited Only:</Text>
          <Text>{this.issue.accreditedOnly}</Text>
        </View>

        <View style={styles.rowView}>
          <Text style={styles.bold}>Target Amount:</Text>
          <Text>${this.issue.targetAmount}</Text>
        </View>

        <View style={styles.rowView}>
          <Text style={styles.bold}>Minimum Amount:</Text>
          <Text>${this.issue.minAmount}</Text>
        </View>

        <View style={styles.rowView}>
          <Text style={styles.bold}>Maximum Amount:</Text>
          <Text>${this.issue.maxAmount}</Text>
        </View>

        <View style={styles.rowView}>
          <Text style={styles.bold}>Minimum Investment:</Text>
          <Text>${this.issue.minInvest}</Text>
        </View>

        <View style={styles.rowView}>
          <Text style={styles.bold}>Suggested Investment:</Text>
          <Text>${this.issue.suggestInvest}</Text>
        </View>

        <View style={styles.rowView}>
          <Text style={styles.bold}>Minimum Lot:</Text>
          <Text>${this.issue.minLot}</Text>
        </View>

        <View style={styles.rowView}>
          <Text style={styles.bold}>Raise Start Date:</Text>
          <Text>{this.issue.startDate}</Text>
        </View>

        <View style={styles.rowView}>
          <Text style={styles.bold}>Raise Target Date:</Text>
          <Text>{this.issue.targetDate}</Text>
        </View>

        <View style={styles.rowView}>
          <Text style={styles.bold}>Raise End Date:</Text>
          <Text>{this.issue.endDate}</Text>
        </View>
      </View>
    );
  }

  render() {
    return this.renderCard();
  }
}

const Details = ({ details }) => (
  // const isAvailable = file => file.available === true;
  // const filesFiltered = R.filter(isAvailable, files);
  // const filesArray = R.values(filesFiltered);

  <View>
    {details.map(detail => <TextRow key={detail.title} detail={detail} />)}
  </View>
);

const TextRow = ({ detail }) => {
  const { value, title } = detail;

  return (
    <View style={styles.newRow}>
      <View style={styles.halfRowView}>
        <Text style={styles.bold}>{title}</Text>
      </View>
      <View style={styles.halfRowView}>
        <Text>{value}</Text>
      </View>

      {/* <Input label={title} value={value} editable={false} /> */}
    </View>
  );
};

const FileRow = ({ file }) => {
  const { filename, url, title } = file;

  return (
    <View style={styles.rowView}>
      <Text style={styles.bold}>{title}:</Text>
      <Link title={filename} url={url} />
    </View>
  );
};

const Files = ({ files }) => {
  const isAvailable = file => file.available === true;
  const filesFiltered = R.filter(isAvailable, files);
  const filesArray = R.values(filesFiltered);

  return (
    <View>
      {filesArray.map(file => <FileRow key={file.title} file={file} />)}
    </View>
  );
};

const Link = ({ style = {}, title = "Open Link", url = "https://sppx.io" }) => {
  const openLink = () => WebBrowser.openBrowserAsync(url);
  return (
    <TouchableOpacity onPress={openLink} style={style} activeOpacity={0.2}>
      <Text style={styles.urlText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  progressView: {
    justifyContent: "center",
    flexDirection: "row",
    // paddingTop: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
    // paddingBottom: 10,
    padding: 10,
    // height: 50,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ddd"
  },
  newRow: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  halfRowView: {
    flex: 1,
    paddingTop: 2,

    justifyContent: "center",
    paddingLeft: 10,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ddd"
  },
  urlText: {
    color: "rgb(29, 64, 250)"
  },
  webUrl: {
    fontSize: 12,
    backgroundColor: "#ecf0f1"
  },
  cardBody: {
    padding: 10
    // backgroundColor: 'rgb(255, 255, 255)',
  },
  bold: {
    fontWeight: "bold"
  },
  rowView: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 2,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1
  },
  titleView: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 25
  },
  spinnerView: {
    marginTop: 200,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  rowDark: {
    // borderTopLeftRadius: 10,
    // backgroundColor: '#a8a8a8',
    backgroundColor: "#99e4b9",
    paddingLeft: 2,
    paddingTop: 2,
    paddingBottom: 2
  },
  rowLight: {
    // borderTopLeftRadius: 10,
    // backgroundColor: '#dddddd',
    backgroundColor: "#b4e0c6",
    paddingLeft: 2,
    paddingTop: 2,
    paddingBottom: 2
  },
  gridView: {
    // padding: 10,
    // borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  description: {
    // margin: 20,
    // textAlign: 'justify',
    // textBreakStrategy: 'balanced',
  },
  dateLabel: {
    // fontFamily: 'Roboto',
    fontWeight: "bold",
    color: "#363636"
  },
  dateCol: {
    paddingLeft: 35
  },
  date: {
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ddd",
    // backgroundColor: '#e0e0e0',
    height: 30,
    width: 100,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },

  card: {
    // borderWidth: 1,
    borderRadius: 10
    // borderColor: '#ddd',
    // borderBottomWidth: 0,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 1,
    // marginLeft: 5,
    // marginRight: 5,
    // marginTop: 10,
  },
  divider: {
    paddingTop: 5,
    paddingBottom: 5
  },
  buttonView: {
    marginTop: 20,
    marginBottom: 30
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  webContainer: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  }
});

const mapStateToProps = ({ invest }) => {
  const { selectedIssueDetail, issueSummary, loadingDetails } = invest;
  return { selectedIssueDetail, issueSummary, loadingDetails, invest };
};

export default connect(mapStateToProps, { getIssueDetail, showBackButton })(
  InvestDetailScreen
);
