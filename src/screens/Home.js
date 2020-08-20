import React from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import ContentPlaceHolder from "../components/ContentPlaceholder";
import { AdMobBanner } from "expo-ads-admob";
import ContentCard from "../components/ContentCard.js";
import { useScrollToTop } from "@react-navigation/native";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      isFetching: true,
      page: 1,
    };
  }

  componentDidMount() {
    this.fetchLastestPost();
  }

  onRefresh() {
    this.setState(
      {
        isFetching: true,
      },
      function () {
        this.fetchLastestPost();
      }
    );
  }

  async fetchLastestPost() {
    const response = await fetch(
      `https://caribeasiswa.online/wp-json/wp/v2/posts?per_page=5&page=${this.state.page}`
    );
    const posts = await response.json();
    this.setState({
      posts: this.state.page === 1 ? posts : [...this.state.posts, ...posts],
      isFetching: false,
    });
  }

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.fetchLastestPost();
      }
    );
  };

  renderFooter = () => {
    if (this.state.isFetching) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE",
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    if (this.state.isFetching) {
      return <ContentPlaceHolder />;
    } else {
      return (
        <FlatList
          data={this.state.posts}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          onEndReached={this.handleLoadMore}
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
