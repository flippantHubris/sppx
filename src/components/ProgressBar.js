import { React, StyleSheet, Text, View } from "react-native";
import { Component } from "react";

export default class ProgressBar extends Component {
  constructor() {
    super();
    this.state = {
      progress: 0
    };
  }

  componentDidMount() {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    // LayoutAnimation.spring()
    // setTimeout(() => {
    //   this.setState({ progress: this.props.progress });
    // }, 0);
    // this.setState({ progress: this.props.progress });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ progress: nextProps.progress });
  }

  componentWillUpdate() {
    // LayoutAnimation.spring();
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  render() {
    let value = false;
    let valueBalloon = false;
    let label = false;
    let marginTop = 0;

    switch (this.props.valueStyle) {
      case "balloon":
        valueBalloon = (
          <View style={styles.flexBox}>
            <View style={[{ flex: this.state.progress }]}>
              <View style={styles.progressBar__balloon}>
                <View style={styles.progressBar__balloonArrow} />
                <Text style={styles.progressBar__balloonVal}>
                  {this.state.progress}%
                </Text>
              </View>
            </View>
            <View style={[{ flex: 100 - this.state.progress }]} />
          </View>
        );
        marginTop = 30;

        break;
      case "none":
        break;
      default:
        value = (
          <View style={styles.progressBar_mes}>
            <Text style={styles.progressBar__val}>{this.state.progress}%</Text>
          </View>
        );
        break;
    }

    if (this.props.valuestyles !== "balloon" && this.props.label) {
      marginTop = 20;
      label = (
        <View style={styles.labelWrap}>
          <Text style={styles.label}>
            {this.props.label} {this.props.value && `: ${this.props.value}`}
          </Text>
        </View>
      );
    }

    const chart = (
      <View>
        {valueBalloon}
        {label}
        <View style={[styles.flexBox, styles.progressBar, { marginTop }]}>
          <View
            style={[styles.progressBar_left, { flex: this.state.progress }]}
          >
            {value}
          </View>
          <View
            style={[
              styles.progressBar_right,
              { flex: 100 - this.state.progress }
            ]}
          />
        </View>
      </View>
    );
    return chart;
  }
}

ProgressBar.defaultProps = {
  progress: 0
};

const styles = StyleSheet.create({
  flexBox: {
    flex: 1,
    flexDirection: "row"
  },
  progressBar: {
    overflow: "hidden",
    height: 20,
    borderWidth: 2,
    // borderColor: 'rgb(0, 122, 255)',
    borderColor: "#20ba61",
    borderRadius: 10,
    marginBottom: 5
  },
  progressBar_left: {
    backgroundColor: "#2ecc71"
  },
  progressBar_right: {
    backgroundColor: "#fff"
  },
  progressBar_mes: {
    position: "absolute",
    right: 0,
    paddingRight: 5,
    // lineHeight: 30,
    backgroundColor: "rgba(0,0,0,0)",
    flexDirection: "row"
  },
  progressBar__balloon: {
    position: "absolute",
    padding: 3,
    right: -15,
    backgroundColor: "#62aeff",
    borderRadius: 2,
    paddingRight: 5,
    flexDirection: "row"
  },
  progressBar__balloonArrow: {
    position: "absolute",
    bottom: -10,
    right: 0,
    backgroundColor: "#62aeff",
    borderRadius: 30,
    width: 30,
    height: 30
  },
  progressBar__val: {
    // textAlign: 'center',
    color: "#fff"
    // lineHeight: 30,
  },
  progressBar__balloonVal: {
    textAlign: "center",
    color: "#fff"
    // lineHeight: 30,
  },
  labelWrap: {
    position: "absolute",
    top: 0,
    left: 0.2
  },
  label: {
    color: "rgb(0, 122, 255)",
    paddingHorizontal: 10,
    backgroundColor: "rgba(0, 0, 0, 0)",
    textAlign: "center"
  }
});
