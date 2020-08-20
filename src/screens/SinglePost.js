import React, { Component } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Share,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
  withTheme,
} from "react-native-paper";
import HTML from "react-native-htmlview";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class SinglePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isloading: true,
      post: [],
      bookmark: false,
    };
  }

  componentDidMount() {
    this.fetchPost().then(() => {
      this.renderBookMark(this.props.navigation.getParam("post_id"));
    });
  }

  onShare = async (title, uri) => {
    try {
      const result = await Share.share({
        message: `${title} | ${uri}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  async fetchPost() {
    let post_id = this.props.route.params?.post_id;

    const response = await fetch(
      `https://caribeasiswa.online/wp-json/wp/v2/posts?_embed&include=${post_id}`
    );
    const post = await response.json();
    this.setState({
      post: post,
      isloading: false,
    });
  }

  renderBookMark = async (post_id) => {
    await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);
      let data = res.find((value) => value === post_id);
      if (data !== null) {
        let data = res.find((value) => value === post_id);
        return data == null
          ? this.setState({ bookmark: false })
          : this.setState({ bookmark: true });
      }
    });
  };

  saveBookMark = async (post_id) => {
    this.setState({ bookmark: true });
    await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);
      if (res !== null) {
        let data = res.find((value) => value === post_id);
        if (data == null) {
          res.push(post_id);
          AsyncStorage.setItem("bookmark", JSON.stringify(res));
        }
      } else {
        let bookmark = [];
        bookmark.push(post_id);
        AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
      }
    });
  };

  removeBookMark = async (post_id) => {
    this.setState({ bookmark: false });
    const bookmark = await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);
      return res.filter((e) => e !== post_id);
    });
    await AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
  };

  render() {
    let post = this.state.post;
    if (this.state.isloading) {
      return null;
    } else {
      return (
        <ScrollView>
          <Card>
            <Card.Content>
              <Title>{post[0].title.rendered} </Title>
              <List.Item
                title={`${post[0]._embedded.author[0].name}`}
                description={`${post[0]._embedded.author[0].description}`}
                left={(props) => {
                  return (
                    <Avatar.Image
                      size={55}
                      source={{
                        uri: `${post[0]._embedded.author[0].avatar_urls[96]}`,
                      }}
                    />
                  );
                }}
                right={(props) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.onShare(post[0].title.rendered, post[0].link)
                      }
                    >
                      <MaterialCommunityIcons name="share" size={30} />
                    </TouchableOpacity>
                  );
                }}
              />
              <List.Item
                title={`Published on ${moment(
                  post[0].date,
                  "YYYYMMDD"
                ).fromNow()}`}
                right={(props) => {
                  if (this.state.bookmark) {
                    return (
                      <TouchableOpacity
                        onPress={() => this.removeBookMark(post[0].id)}
                      >
                        <MaterialCommunityIcons name="bookmark" size={30} />
                      </TouchableOpacity>
                    );
                  } else {
                    return (
                      <TouchableOpacity
                        onPress={() => this.saveBookMark(post[0].id)}
                      >
                        <MaterialCommunityIcons
                          name="bookmark-outline"
                          size={30}
                        />
                      </TouchableOpacity>
                    );
                  }
                }}
              />
              <Paragraph />
            </Card.Content>
            <Card.Cover source={{ uri: post[0].jetpack_featured_media_url }} />
            <Card.Content>
              <HTML
                value={post[0].content.rendered}
                addLineBreaks={false}
                stylesheet={{
                  p: {
                    color: this.props.theme.colors.text,
                  },
                  pre: {
                    color: this.props.theme.colors.text,
                  },
                }}
              />
            </Card.Content>
          </Card>
        </ScrollView>
      );
    }
  }
}
export default withTheme(SinglePost);
