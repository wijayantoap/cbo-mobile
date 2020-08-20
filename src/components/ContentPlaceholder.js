import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";

const styles = StyleSheet.create({
  placeholderMedia: {
    marginRight: 10,
    height: 195,
    width: "100%",
  },
  placeholderLine: {
    height: 15,
    width: "92.5%",
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 0,
  },
  placeholderLineSmall: {
    height: 15,
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 0,
  },
  placeholderBottom: {
    marginTop: 15,
    height: 1,
  },
});

export class ContentPlaceholder extends Component {
  render() {
    return (
      <View>
        <Placeholder Animation={Fade}>
          <PlaceholderMedia style={styles.placeholderMedia} />
          <PlaceholderLine style={styles.placeholderLine} />
          <PlaceholderLine style={styles.placeholderLine} />
          <PlaceholderLine width={30} style={styles.placeholderLineSmall} />
          <PlaceholderLine style={styles.placeholderBottom} />
        </Placeholder>
        <Placeholder Animation={Fade}>
          <PlaceholderMedia style={styles.placeholderMedia} />
          <PlaceholderLine style={styles.placeholderLine} />
          <PlaceholderLine style={styles.placeholderLine} />
          <PlaceholderLine width={30} style={styles.placeholderLineSmall} />
          <PlaceholderLine style={styles.placeholderBottom} />
        </Placeholder>
        <Placeholder Animation={Fade}>
          <PlaceholderMedia style={styles.placeholderMedia} />
          <PlaceholderLine style={styles.placeholderLine} />
          <PlaceholderLine style={styles.placeholderLine} />
          <PlaceholderLine width={30} style={styles.placeholderLineSmall} />
          <PlaceholderLine style={styles.placeholderBottom} />
        </Placeholder>
      </View>
    );
  }
}
export default ContentPlaceholder;
