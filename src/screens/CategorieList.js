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
    this.fetchPost();
    const { navigation } = this.props;
    let categorie_name = this.props.route.params?.categorie_name;
    navigation.setOptions({ title: categorie_name });
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
    if (this.state.isLoading) {
      return (
        <LottieView
          autoPlay
          style={{
            backgroundColor: "#fff",
          }}
          source={require("../../assets/shape-types.json")}
        />
      );
    } else if (this.state.posts.length === 0) {
      return (
        <LottieView
          autoPlay
          style={{
            backgroundColor: "#fff",
          }}
          source={require("../../assets/empty-box.json")}
        />
      );
    } else {
      return (
        <View>
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
