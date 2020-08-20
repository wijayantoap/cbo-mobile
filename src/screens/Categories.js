import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Card, Title } from "react-native-paper";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useScrollToTop } from "@react-navigation/native";

const colors = [
  "#badbff",
  "#ffeeba",
  "#e3f1ce",
  "#e9e9ff",
  "#fadcb1",
  "#b6f0fe",
  "#fad1dd",
  "#b4f8fb",
  "#b7fff0",
  "#badbff",
];

const fontColors = [
  "#304f70",
  "#695c38",
  "#576642",
  "#50506b",
  "#6e593b",
  "#355b63",
  "#63454e",
  "#325e61",
  "#325c53",
  "#35485c",
];

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategorie();
  }

  async fetchCategorie() {
    const response = await fetch(
      `https://caribeasiswa.online/wp-json/wp/v2/categories?per_page=100`
    );
    const categories = await response.json();

    this.setState({
      categories: categories,
      isLoading: false,
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <LottieView
          autoPlay
          style={{
            backgroundColor: "#fff",
          }}
          source={require("../../assets/books.json")}
        />
      );
    } else {
      return (
        <FlatList
          data={this.state.categories}
          style={{ backgroundColor: "#fff" }}
          renderItem={({ item, index }) => (
            <Card
              elevation={0}
              style={{
                borderRadius: 8,
                marginTop: 15,
                marginLeft: 30,
                marginRight: 30,
                marginBottom:
                  index === this.state.categories.length - 1 ? 100 : 5,
                padding: 15,
                backgroundColor: colors[index % 10],
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("Categorie List", {
                    categorie_id: item.id,
                    categorie_name: item.name,
                  })
                }
              >
                <Card.Content>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ marginRight: 10 }}>
                      {item.name.includes("Beasiswa") ? (
                        <Entypo
                          name="graduation-cap"
                          size={24}
                          color={fontColors[index % 10]}
                        />
                      ) : (
                        <FontAwesome5
                          name="lightbulb"
                          size={24}
                          color={fontColors[index % 10]}
                        />
                      )}
                    </View>
                    <Title style={{ color: fontColors[index % 10] }}>
                      {item.name}
                    </Title>
                    <AntDesign
                      name="right"
                      size={24}
                      color={fontColors[index % 10]}
                      style={{ marginLeft: "auto" }}
                    />
                  </View>
                </Card.Content>
              </TouchableOpacity>
            </Card>
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

  return <Categories {...props} scrollRef={ref} />;
}
