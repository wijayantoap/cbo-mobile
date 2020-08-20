import React from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { Title } from "react-native-paper";
import ContentCard from "../components/ContentCard.js";
import LottieView from "lottie-react-native";

export default class CategorieList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      post: [],
      page: 1,
      lastPage: false,
    };
  }

  componentDidMount() {
    this.fetchPost();
    const { navigation } = this.props;
    let categorie_name = this.props.route.params?.categorie_name;
    navigation.setOptions({ title: categorie_name });
  }

  async fetchPost(isRefresh = false) {
    let categorie_id = this.props.route.params?.categorie_id;
    const response = await fetch(
      `https://caribeasiswa.online/wp-json/wp/v2/posts?categories=${categorie_id}&page=${
        isRefresh ? 1 : this.state.page
      }`
    );
    const posts = await response.json();
    if (posts.data && posts.data.status === 400) {
      this.setState({
        lastPage: true,
        isLoading: false,
      });
    } else {
      this.setState({
        posts: isRefresh
          ? posts
          : this.state.page === 1
          ? posts
          : [...this.state.posts, ...posts],
        isLoading: false,
      });
    }
  }

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.fetchPost();
      }
    );
  };

  onRefresh() {
    this.setState(
      {
        isLoading: true,
      },
      function () {
        this.fetchPost(true);
      }
    );
  }

  renderFooter = () => {
    if (this.state.isLoading || this.state.lastPage)
      return (
        <View
          style={{ display: "flex", alignItems: "center", paddingBottom: 120 }}
        >
          <LottieView
            autoPlay
            loop
            style={{
              height: 150,
              width: 150,
            }}
            source={require("../../assets/success.json")}
          />
        </View>
      );
    if (!this.state.lastPage) {
      return (
        <View
          style={{
            paddingBottom: 100,
            borderTopWidth: 1,
            borderColor: "#CED0CE",
          }}
        >
          <ActivityIndicator animating size="large" />
        </View>
      );
    }
  };

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
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isLoading}
            onEndReached={!this.state.lastPage && this.handleLoadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter}
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
