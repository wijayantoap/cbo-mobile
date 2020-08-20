import React from "react";
import {
  ScrollView,
  Share,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  List,
  withTheme,
  FAB,
} from "react-native-paper";
import HTML from "react-native-htmlview";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import FadeInView from "react-native-fade-in-view";

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    backgroundColor: "#e85625",
    right: "5%",
    bottom: 100,
  },
});

class SinglePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      post: [],
      bookmark: false,
    };
  }

  componentDidMount() {
    this.fetchPost();
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
      isLoading: false,
    });
  }

  render() {
    let post = this.state.post;
    if (this.state.isLoading) {
      return (
        <LottieView
          autoPlay
          style={{
            backgroundColor: "#fff",
          }}
          source={require("../../assets/book.json")}
        />
      );
    } else {
      let post_id = this.props.route.params?.post_id;
      return (
        <FadeInView duration={750} style={{ alignItems: "center" }}>
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
                />
                <Paragraph />
              </Card.Content>
              <Card.Cover
                source={{ uri: post[0].jetpack_featured_media_url }}
              />
              <Card.Content style={{ marginBottom: 100 }}>
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
          <FAB
            style={styles.fab}
            onPress={() => Linking.openURL(post[0].link)}
            small
            label={"Comment"}
            icon="comment"
          />
        </FadeInView>
      );
    }
  }
}
export default withTheme(SinglePost);
