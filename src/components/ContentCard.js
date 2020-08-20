import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import moment from "moment";
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  List,
  withTheme,
} from "react-native-paper";

const ContentCard = ({ item, navigation, theme }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SinglePost", {
            post_id: item.id,
          })
        }
      >
        <Card
          style={{
            marginBottom: 10,
          }}
        >
          <Card.Cover source={{ uri: item.jetpack_featured_media_url }} />
          <Card.Content>
            <Title>{item.title.rendered}</Title>
          </Card.Content>
          <Card.Content>
            <Text
              style={{
                color: theme.colors.text,
              }}
            >
              {moment(item.date).format("DD MMMM YYYY")}
            </Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </View>
  );
};
export default withTheme(ContentCard);
