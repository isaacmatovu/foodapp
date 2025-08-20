import React from "react";
import { ImageBackground, View } from "react-native";
import Category from "../components/home/category";
import Header from "../components/home/header";

const Home = () => {
  const image = require("../components/images/dark.webp");

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={image} style={{ flex: 1 }} resizeMode="cover">
        <View
          style={{
            paddingTop: 20, // Add small padding to avoid notch overlap
            paddingHorizontal: 16,
          }}
        >
          <Header />
          <Category />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Home;
