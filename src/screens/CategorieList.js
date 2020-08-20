import React from "react";
import { View, FlatList } from "react-native";
import { Title } from "react-native-paper";
import ContentCard from "../components/ContentCard.js";
import LottieView from "lottie-react-native";

export default class CategorieList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      post: [],
    };
  }

  componentDidMount() {
    this.animation.play();
    this.fetchPost();
  }

  async fetchPost() {
    let categorie_id = this.props.route.params?.categorie_id;
    const response = await fetch(
      `https://caribeasiswa.online/wp-json/wp/v2/posts?categories=${categorie_id}`
    );
    const posts = await response.json();
    this.setState({ posts, isLoading: false });
  }

  render() {
    let categorie_name = this.props.route.params?.categorie_name;
    if (this.state.isLoading) {
      return (
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{
            backgroundColor: "#fff",
          }}
          source={require("../../assets/shape-types.json")}
        />
      );
    } else {
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
}
