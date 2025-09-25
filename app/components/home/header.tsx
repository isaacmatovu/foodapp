import { useAuthStore } from "@/store/AuthStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Text, View } from "react-native";

const Header = () => {
  const { user } = useAuthStore();
  return (
    <View className="flex flex-row justify-between text-center">
      <View className="border border-white rounded-full">
        <FontAwesome
          name="user-circle"
          size={70}
          color="white"
          className="h-20 w-20"
        />
      </View>
      <View className="justify-center items-start">
        <Text className="text-white text-xl font-bold">Hello {user?.name}</Text>
        <Text className="text-white text-xl font-thin">
          Let us explore <Text className="text-red-500">SU</Text>shi World
        </Text>
      </View>
      <View className="text-center justify-center border-2 border-white rounded-full p-3">
        <MaterialIcons name="notifications-on" size={30} color="white" />
      </View>
    </View>
  );
};

export default Header;
