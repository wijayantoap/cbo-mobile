import React, { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Surface } from "react-native-paper";
import { List, Switch } from "react-native-paper";
import { ThemeContext } from "../components/ThemeController";
import LottieView from "lottie-react-native";
import { AppLoading } from "expo";
import {
  useFonts,
  DancingScript_600SemiBold,
} from "@expo-google-fonts/dancing-script";
import SurfaceCard from "../components/SurfaceCard";

const Miscellaneous = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  let [fontsLoaded] = useFonts({
    DancingScript_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: 100,
          paddingBottom: 150,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "DancingScript_600SemiBold",
            fontSize: 40,
            textAlign: "center",
          }}
        >
          Miscellaneous
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <SurfaceCard
            text={"Web"}
            source={require("../../assets/website.json")}
            onPress={() => alert("halo")}
          />
          <SurfaceCard
            text={"Contact"}
            source={require("../../assets/contact.json")}
            onPress={() => alert("halo")}
          />
          <SurfaceCard
            text={"Advertise"}
            source={require("../../assets/ads.json")}
            onPress={() => alert("halo")}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <SurfaceCard
            text={"Disclaimer"}
            source={require("../../assets/disclaimer.json")}
            onPress={() => alert("halo")}
          />
          <SurfaceCard
            text={"About"}
            source={require("../../assets/about.json")}
            onPress={() => alert("halo")}
          />
          <SurfaceCard
            text={"New Feature"}
            source={require("../../assets/coming-soon.json")}
            onPress={() => alert("halo")}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <SurfaceCard
            text={"Facebook"}
            source={require("../../assets/facebook.json")}
            onPress={() => alert("halo")}
          />
          <SurfaceCard
            text={"Twitter"}
            source={require("../../assets/twitter.json")}
            onPress={() => alert("halo")}
          />
          <SurfaceCard
            text={"Instagram"}
            source={require("../../assets/instagram.json")}
            onPress={() => alert("halo")}
          />
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
  }
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
