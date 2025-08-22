import React from "react";
import { FlatList, ImageBackground, View } from "react-native";
import AllCategories from "../components/home/AllCategories";
import Category from "../components/home/category";
import Header from "../components/home/header";

const Home = () => {
  const image = require("../components/images/dark.webp");

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={image} style={{ flex: 1 }} resizeMode="cover">
        <FlatList
          data={[]}
          renderItem={null}
          ListHeaderComponent={
            <View style={{ paddingTop: 20, paddingHorizontal: 16 }}>
              <Header />
              <Category />
              <AllCategories />
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
    </View>
  );
};

export default Home;
