import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Card, Title } from "react-native-paper";
import moment from "moment";
import ContentPlaceHolder from "../components/ContentPlaceholder";
import { AdMobBanner } from "expo-ads-admob";

export default class Home extends React.Component {
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
        <View>
          <FlatList
            data={this.state.posts}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                  this.props.navigation.navigate("SinglePost", {
                    post_id: item.id,
                  })
                }
              >
                <Card
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <Card.Cover
                    source={{ uri: item.jetpack_featured_media_url }}
                  />
                  <Card.Content>
                    <Title>{item.title.rendered}</Title>
                  </Card.Content>
                  <Card.Content>
                    <Text>{moment(item.date).format("DD MMMM YYYY")}</Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
  }
}
