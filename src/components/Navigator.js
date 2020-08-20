import React, { useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home.js";
import Bookmark from "../screens/Bookmark.js";
import Categories from "../screens/Categories.js";
import CategorieList from "../screens/CategorieList.js";
import Setting from "../screens/Setting.js";
import SinglePost from "../screens/SinglePost.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import { ThemeContext } from "../components/ThemeController";
import { AdMobBanner } from "expo-ads-admob";
import AnimatedSplash from "react-native-animated-splash-screen";

export default function Navigator() {
  const [isLoaded, setIsLoaded] = useState(false);

  const { theme } = useContext(ThemeContext);
  let paper_theme = theme ? PaperDarkTheme : PaperDefaultTheme;
  let nav_theme = theme ? DarkTheme : DefaultTheme;

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  });

  const Stack = createStackNavigator();

  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SinglePost" component={SinglePost} />
      </Stack.Navigator>
    );
  }

  function CategorieStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="CategorieList" component={CategorieList} />
      </Stack.Navigator>
    );
  }

  function SettingStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Settings" component={Setting} />
      </Stack.Navigator>
    );
  }

  const Tab = createBottomTabNavigator();
  return (
    <PaperProvider theme={paper_theme}>
      <AnimatedSplash
        translucent={true}
        isLoaded={isLoaded}
        logoImage={require("../../assets/logo.png")}
        backgroundColor={"#fff"}
        logoHeight={400}
        logoWidth={400}
      >
        <NavigationContainer theme={nav_theme}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Bookmark") {
                  iconName = focused ? "bookmark" : "bookmark-outline";
                } else if (route.name === "Categories") {
                  iconName = focused ? "apps" : "apps-box";
                } else if (route.name === "Settings") {
                  iconName = focused ? "settings" : "settings-box";
                }
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              },
            })}
            tabBarOptions={{
              activeTintColor: "tomato",
              inactiveTintColor: "gray",
            }}
          >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Categories" component={CategorieStack} />
            <Tab.Screen name="Bookmark" component={Bookmark} />
            <Tab.Screen name="Settings" component={SettingStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </AnimatedSplash>
      {/* <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3940256099942544/6300978111"
        servePersonalizedAds
        // onDidFailToReceiveAdWithError={this.bannerError}
      /> */}
    </PaperProvider>
  );
}

// ca-app-pub-1112252263707173/8125312198 real banner
