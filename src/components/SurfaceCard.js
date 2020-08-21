import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Surface } from "react-native-paper";
import LottieView from "lottie-react-native";

export default SurfaceCard = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.5}>
      <Surface style={styles.surface}>
        <LottieView
          autoPlay
          loop={false}
          style={{
            height: 70,
            width: 70,
          }}
          source={props.source}
        />
        <Text>{props.text}</Text>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 110,
    width: 110,
    alignItems: "center",
    justifyContent: "center",
    elevation: 0,
    borderRadius: 30,
  },
});
