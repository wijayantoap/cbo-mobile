import React, { useEffect } from "react";
import Navigators from "./src/components/Navigator";
import { ThemeController } from "./src/components/ThemeController";
import { useFonts, OpenSans_400Regular } from "@expo-google-fonts/open-sans";
import { Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { setCustomText } from "react-native-global-props";
import { AppLoading } from "expo";

export default function App() {
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    const customTextProps = {
      style: {
        fontFamily: "OpenSans_400Regular",
      },
    };
    setCustomText(customTextProps);
  }

  return (
    <ThemeController>
      <Navigators />
    </ThemeController>
  );
}
