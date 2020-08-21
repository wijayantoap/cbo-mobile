import React, { useContext, useState } from "react";
import { Text, View, Linking, StyleSheet, Image } from "react-native";
import { List, Switch, Dialog, Portal, Button } from "react-native-paper";
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
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

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
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Image
                source={require("../../assets/logo-header.png")}
                style={{
                  width: 300,
                  height: 100,
                  resizeMode: "contain",
                }}
              />
              <Text style={{ textAlign: "center" }}>version 1.0.0-alpha</Text>
              <Text style={{ textAlign: "center" }}>
                Copyright © 2020 caribeasiswa.online
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                style={{ color: "red" }}
                icon="close"
                onPress={hideDialog}
              >
                Close
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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
              onPress={() => Linking.openURL("https://caribeasiswa.online")}
            />
            <SurfaceCard
              text={"Contact"}
              source={require("../../assets/contact.json")}
              onPress={() =>
                Linking.openURL("https://caribeasiswa.online/contact/")
              }
            />
            <SurfaceCard
              text={"Advertise"}
              source={require("../../assets/ads.json")}
              onPress={() =>
                Linking.openURL("https://caribeasiswa.online/advertise/")
              }
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
              onPress={() =>
                Linking.openURL("https://caribeasiswa.online/disclaimer/")
              }
            />
            <SurfaceCard
              text={"About"}
              source={require("../../assets/about.json")}
              onPress={showDialog}
            />
            <SurfaceCard
              text={"New Feature"}
              source={require("../../assets/coming-soon.json")}
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
              onPress={() => Linking.openURL("fb://caribeasiswa.online")}
            />
            <SurfaceCard
              text={"Twitter"}
              source={require("../../assets/twitter.json")}
              onPress={() =>
                Linking.openURL("https://twitter.com/caribeasiswa_ol")
              }
            />
            <SurfaceCard
              text={"Instagram"}
              source={require("../../assets/instagram.json")}
              onPress={() =>
                Linking.openURL(
                  "https://www.instagram.com/caribeasiswa.online/"
                )
              }
            />
          </View>
          {/* <View>
            <List.Item
              title="Dark Mode"
              left={() => <List.Icon icon="brightness-4" />}
              right={() => <Switch value={theme} onValueChange={toggleTheme} />}
            />
          </View> */}
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
