import React from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import ContentPlaceHolder from "../components/ContentPlaceholder";
import { AdMobBanner } from "expo-ads-admob";
import ContentCard from "../components/ContentCard.js";
import { useScrollToTop } from "@react-navigation/native";
import LottieView from "lottie-react-native";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      isLoading: true,
      page: 1,
      lastPage: false,
    };
  }

  componentDidMount() {
    this.fetchPost();
  }

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

  async fetchPost(isRefresh = false) {
    const response = await fetch(
      `https://caribeasiswa.online/wp-json/wp/v2/posts?per_page=5&page=${
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
      return <ContentPlaceHolder />;
    } else {
      return (
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
          ref={this.props.scrollRef}
        />
      );
    }
  }
}

export default function (props) {
  const ref = React.useRef(null);

  useScrollToTop(ref);

  return <Home {...props} scrollRef={ref} />;
}
