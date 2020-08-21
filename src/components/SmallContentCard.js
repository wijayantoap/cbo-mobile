import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { withTheme } from "react-native-paper";

const SmallContentCard = (props, { theme }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() =>
        props.navigation.push("Details", {
          post_id: props.id,
        })
      }
    >
      <View
        style={{
          height: 160,
          width: 160,
          marginRight: 20,
          borderWidth: 0.5,
          borderColor: "#ddddd",
        }}
      >
        <View style={{ flex: 2 }}>
          <Image
            source={{
              uri: props.image,
            }}
            style={{ flex: 1, width: null, height: null }}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
          <Text numberOfLines={3} style={{ fontSize: 10 }}>
            {props.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default withTheme(SmallContentCard);
