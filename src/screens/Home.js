import React from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import ContentPlaceHolder from "../components/ContentPlaceholder";
import { AdMobBanner } from "expo-ads-admob";
import ContentCard from "../components/ContentCard.js";
import { useScrollToTop } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { AsyncStorage } from "react-native";

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
    this.fetchCategory();
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

  async fetchCategory() {
    const response = await fetch(
      `https://caribeasiswa.online/wp-json/wp/v2/categories?per_page=100`
    );
    const categories = await response.json();
    const _categories = categories.map(({ id, name }) => ({ id, name }));
    try {
      await AsyncStorage.setItem("categories", JSON.stringify(_categories));
    } catch (error) {
      alert(error);
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
            loop={false}
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
          renderItem={({ item, index }) => (
            <>
              {index % 4 === 0 && index !== 0 && (
                <AdMobBanner
                  bannerSize="banner"
                  adUnitID="ca-app-pub-1112252263707173/8085019402"
                  servePersonalizedAds
                  style={{ alignSelf: "center", marginBottom: 25 }}
                />
              )}
              <ContentCard item={item} navigation={this.props.navigation} />
            </>
          )}
          keyExtractor={(item) => item.id.toString()}
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
