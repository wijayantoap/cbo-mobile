import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import moment from "moment";
import HTML from "react-native-htmlview";
import ContentCard from "../components/ContentCard.js";

export default class CategorieList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: [],
    };
  }

  componentDidMount() {
    this.fetchPost();
  }

  async fetchPost() {
    let categorie_id = this.props.route.params?.categorie_id;
    const response = await fetch(
      `https://caribeasiswa.online/wp-json/wp/v2/posts?categories=${categorie_id}`
    );
    const posts = await response.json();
    this.setState({ posts });
  }

  render() {
    let categorie_name = this.props.route.params?.categorie_name;
    return (
      <View>
        <Title style={{ marginLeft: 30 }}>{categorie_name}</Title>
        <FlatList
          data={this.state.posts}
          renderItem={({ item }) => (
            <ContentCard item={item} navigation={this.props.navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
