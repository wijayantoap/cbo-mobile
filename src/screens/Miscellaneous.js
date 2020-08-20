import React, { Component, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { Surface } from "react-native-paper";
import { List, Switch } from "react-native-paper";
import { ThemeContext } from "../components/ThemeController";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const Miscellaneous = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 50,
        paddingBottom: 200,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => alert("halo")}
          activeOpacity={0.5}
          underlayColor="white"
        >
          <Surface style={styles.surface}>
            <LottieView
              autoPlay
              loop
              style={{
                height: 70,
                width: 70,
              }}
              source={require("../../assets/website.json")}
            />

            <Text>Web</Text>
          </Surface>
        </TouchableOpacity>
        <Surface style={styles.surface}>
          <LottieView
            autoPlay
            loop
            style={{
              height: 70,
              width: 70,
            }}
            source={require("../../assets/contact.json")}
          />
          <Text>Contact</Text>
        </Surface>
        <Surface style={styles.surface}>
          <LottieView
            autoPlay
            loop
            style={{
              height: 70,
              width: 70,
            }}
            source={require("../../assets/ads.json")}
          />
          <Text>Advertise</Text>
        </Surface>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Surface style={styles.surface}>
          <LottieView
            autoPlay
            loop
            style={{
              height: 70,
              width: 70,
            }}
            source={require("../../assets/disclaimer.json")}
          />
          <Text>Disclaimer</Text>
        </Surface>
        <Surface style={styles.surface}>
          <LottieView
            autoPlay
            loop
            style={{
              height: 70,
              width: 70,
            }}
            source={require("../../assets/about.json")}
          />
          <Text>About App</Text>
        </Surface>
        <Surface style={styles.surface}>
          <LottieView
            autoPlay
            loop
            style={{
              height: 70,
              width: 70,
            }}
            source={require("../../assets/coming-soon.json")}
          />
          <Text>New Feature</Text>
        </Surface>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Surface style={styles.surface}>
          <LottieView
            autoPlay
            loop
            style={{
              height: 70,
              width: 70,
            }}
            source={require("../../assets/facebook.json")}
          />
          <Text>Facebook</Text>
        </Surface>
        <Surface style={styles.surface}>
          <LottieView
            autoPlay
            loop
            style={{
              height: 70,
              width: 70,
            }}
            source={require("../../assets/twitter.json")}
          />
          <Text>Twitter</Text>
        </Surface>
        <Surface style={styles.surface}>
          <LottieView
            autoPlay
            loop
            style={{
              height: 70,
              width: 70,
            }}
            source={require("../../assets/instagram.json")}
          />
          <Text>Instagram</Text>
        </Surface>
      </View>
      <View>
        <List.Item
          title="Dark Mode"
          left={() => <List.Icon icon="brightness-4" />}
          right={() => <Switch value={theme} onValueChange={toggleTheme} />}
        />
      </View>
    </View>
  );
};

export default Miscellaneous;

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
