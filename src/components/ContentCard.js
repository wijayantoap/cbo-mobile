import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import moment from "moment";
import { Card, Title, withTheme } from "react-native-paper";

const ContentCard = ({ item, navigation, theme }) => {
  return (
    <View>
      <Card
        style={{
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate("Details", {
              post_id: item.id,
            })
          }
          style={{ paddingBottom: 10 }}
        >
          <Card.Cover source={{ uri: item.jetpack_featured_media_url }} />
          <Card.Content>
            <Title>{item.title.rendered}</Title>
          </Card.Content>
          <Card.Content>
            <Text>{moment(item.date).format("DD MMMM YYYY")}</Text>
          </Card.Content>
        </TouchableOpacity>
      </Card>
    </View>
  );
};
export default withTheme(ContentCard);
