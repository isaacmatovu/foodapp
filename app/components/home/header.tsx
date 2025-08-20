import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Image, Text, View } from "react-native";

const Header = () => {
  const image = require("../images/isaac.webp");
  return (
    <View className="flex flex-row justify-between text-center">
      <View className="border border-white rounded-full">
        <Image source={image} className="rounded-full h-20 w-20" />
      </View>
      <View className="justify-center items-start">
        <Text className="text-white text-xl font-bold">Hello Luis</Text>
        <Text className="text-white text-xl font-thin">
          Let us expore SUshi World
        </Text>
      </View>
      <View className="text-center justify-center border-2 border-white rounded-full p-3">
        <MaterialIcons name="notifications-on" size={30} color="white" />
      </View>
    </View>
  );
};

export default Header;
