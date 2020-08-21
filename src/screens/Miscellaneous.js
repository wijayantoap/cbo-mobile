import React, { useContext } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { List, Switch } from "react-native-paper";
import { ThemeContext } from "../components/ThemeController";
import { AppLoading } from "expo";
import {
  useFonts,
  DancingScript_600SemiBold,
} from "@expo-google-fonts/dancing-script";
import SurfaceCard from "../components/SurfaceCard";
import LottieView from "lottie-react-native";

const Miscellaneous = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  let [fontsLoaded] = useFonts({
    DancingScript_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <View
          style={{
            backgroundColor: "#368deb",
            width: "100%",
            height: "100%",
          }}
        >
          <LottieView
            autoPlay
            loop={true}
            style={{
              height: 200,
              width: 200,
              top: "5%",
              left: "17.5%",
            }}
            source={require("../../assets/dino-dance.json")}
          />
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            width: 150,
            height: 150,
            borderRadius: 150,
            top: "0%",
            left: "-15%",
            opacity: 0.2,
          }}
        />

        <View
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            width: 150,
            height: 150,
            borderRadius: 150,
            top: "7.5%",
            left: "-15%",
            opacity: 0.4,
          }}
        />
        <View
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            width: 150,
            height: 150,
            borderRadius: 150,
            top: "-5%",
            left: "5%",
            opacity: 0.1,
          }}
        />

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            paddingTop: 20,
            paddingBottom: 150,
            paddingHorizontal: 20,
            backgroundColor: "white",
            position: "absolute",
            bottom: 0,
            width: "100%",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
        >
          <Text
            style={{
              fontFamily: "DancingScript_600SemiBold",
              fontSize: 40,
              textAlign: "center",
              marginBottom: 20,
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
      </>
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
