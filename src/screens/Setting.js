import React, { Component, useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { List, Switch } from "react-native-paper";
import { ThemeContext } from "../components/ThemeController";

const Setting = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  return (
    <View>
      <List.Item
        title="Dark Mode"
        left={() => <List.Icon icon="brightness-4" />}
        right={() => <Switch value={theme} onValueChange={toggleTheme} />}
      />
    </View>
  );
};

export default Setting;
