import React from "react";
import {
  ScrollView,
  Share,
  TouchableOpacity,
  StyleSheet,
  Linking,
  View,
} from "react-native";
import {
  Text,
  Card,
  Title,
  Paragraph,
  Divider,
  withTheme,
  FAB,
  Chip,
} from "react-native-paper";
import HTML from "react-native-htmlview";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import FadeInView from "react-native-fade-in-view";
import { AsyncStorage } from "react-native";
import SmallContentCard from "../components/SmallContentCard";

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
      categories: [],
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
    this.retrieveCategory();
  }

  async retrieveCategory() {
    const { navigation } = this.props;
    try {
      const value = await AsyncStorage.getItem("categories");
      if (value.length !== 0) {
        const intersection = JSON.parse(value).filter((element) =>
          this.state.post[0].categories.includes(element.id)
        );
        this.setState({ categories: intersection });
        navigation.setOptions({ title: intersection[0].name });
      }
    } catch (error) {
      console.log(error);
    }
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
      return (
        <FadeInView duration={750} style={{ alignItems: "center" }}>
          <ScrollView>
            <Card>
              <Card.Content>
                <Title style={{ textAlign: "center", fontSize: 24 }}>
                  {post[0].title.rendered}
                </Title>
                <Divider
                  style={{ width: 50, alignSelf: "center", height: 1 }}
                />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {this.state.categories.map((category) => (
                    <Chip
                      style={{ margin: 4, padding: 0 }}
                      textStyle={{ fontSize: 12 }}
                    >
                      {category.name}
                    </Chip>
                  ))}
                </View>
                <Text style={{ textAlign: "center" }}>
                  By {post[0]._embedded.author[0].name}
                </Text>
                <Text style={{ textAlign: "center" }}>{`Published on ${moment(
                  post[0].date,
                  "YYYYMMDD"
                ).fromNow()}`}</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.onShare(post[0].title.rendered, post[0].link)
                  }
                  style={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text>Share this</Text>
                  <MaterialCommunityIcons name="share" size={25} />
                </TouchableOpacity>
                <Paragraph />
              </Card.Content>
              <Card.Cover
                source={{ uri: post[0].jetpack_featured_media_url }}
              />
              <Card.Content style={{ marginTop: 25 }}>
                <HTML
                  value={post[0].content.rendered}
                  addLineBreaks={false}
                  stylesheet={{
                    p: {
                      color: this.props.theme.colors.text,
                      marginBottom: -20,
                    },
                    pre: {
                      color: this.props.theme.colors.text,
                    },
                  }}
                />
              </Card.Content>
              <Card.Content style={{ marginBottom: 150 }}>
                <Title>Related Post</Title>
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                  {post[0]["jetpack-related-posts"].map((post) => (
                    <SmallContentCard
                      id={post.id}
                      image={post.img.src}
                      name={post.title}
                      date={post.date}
                      navigation={this.props.navigation}
                    />
                  ))}
                </ScrollView>
              </Card.Content>
            </Card>
          </ScrollView>
          <FAB
            style={styles.fab}
            onPress={() => Linking.openURL(`${post[0].link}#comments`)}
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
