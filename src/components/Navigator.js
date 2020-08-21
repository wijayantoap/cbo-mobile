import React, { useContext, useState, useEffect } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home.js";
import Categories from "../screens/Categories.js";
import CategorieList from "../screens/CategorieList.js";
import Miscellaneous from "../screens/Miscellaneous.js";
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
import { Image } from "react-native";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";

export default function Navigator() {
  const [isLoaded, setIsLoaded] = useState(false);

  const { theme } = useContext(ThemeContext);
  let paper_theme = theme ? PaperDarkTheme : PaperDefaultTheme;
  let nav_theme = theme ? DarkTheme : DefaultTheme;

  setTimeout(() => {
    setIsLoaded(true);
  }, 1500);

  const Stack = createStackNavigator();

  function LogoTitle() {
    return (
      <Image
        style={{
          width: 250,
          height: 50,
          resizeMode: "contain",
          alignSelf: "center",
        }}
        source={require("../../assets/logo-header.png")}
      />
    );
  }

  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: (props) => <LogoTitle {...props} />,
          }}
        />
        <Stack.Screen
          name="Details"
          component={SinglePost}
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    );
  }

  function CategorieStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen
          name="Categorie List"
          component={CategorieList}
          options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen
          name="Details"
          component={SinglePost}
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    );
  }

  function MiscellaneousStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Miscellaneous" component={Miscellaneous} />
      </Stack.Navigator>
    );
  }

  const Tabs = AnimatedTabBarNavigator();
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
          <Tabs.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Categories") {
                  iconName = focused ? "apps" : "apps-box";
                } else if (route.name === "Miscellaneous") {
                  iconName = "dropbox";
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
              activeTintColor: "#fff",
              inactiveTintColor: "gray",
              activeBackgroundColor: "#0e598c",
              labelStyle: {
                fontWeight: "bold",
              },
            }}
            appearence={{
              floating: true,
              horizontalPadding: 10,
            }}
          >
            <Tabs.Screen name="Home" component={HomeStack} />
            <Tabs.Screen name="Categories" component={CategorieStack} />
            <Tabs.Screen name="Miscellaneous" component={MiscellaneousStack} />
          </Tabs.Navigator>
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
