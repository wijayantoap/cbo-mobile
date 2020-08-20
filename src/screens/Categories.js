import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Card, Title } from "react-native-paper";
import LottieView from "lottie-react-native";
export default class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      categories: [],
    };
  }

  componentDidMount() {
    this.animation.play();
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
          ref={(animation) => {
            this.animation = animation;
          }}
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
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("CategorieList", {
                  categorie_id: item.id,
                  categorie_name: item.name,
                })
              }
            >
              <Card>
                <Card.Content>
                  <Title>{item.name}</Title>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
  }
}
