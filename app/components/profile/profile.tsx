import { useAuthStore } from "@/store/AuthStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Text, View } from "react-native";

const Profile = () => {
  const { user } = useAuthStore();
  return (
    <View className="bg-black h-full w-full">
      <View className="bg-gray-900 mx-4 mt-5 rounded-md border-r-orange-500 border-4 border-l-orange-500">
        <View className="flex flex-row border-b-slate-700 border mb-5">
          <View>
            <AntDesign name="smile-circle" size={50} color="pink" />
          </View>
          <View className="text-center justify-center ml-10 mb-4">
            <Text className="text-white text-2xl">{user?.name}</Text>
            <Text className="text-white text-2xl">Welcome Back</Text>
          </View>
        </View>
        <View className="flex flex-row gap-5">
          <MaterialCommunityIcons name="dolphin" size={28} color="white" />
          <Text className="text-white text-xl">Avatar</Text>
        </View>
      </View>
      <View></View>
      <View></View>
      <View></View>
    </View>
  );
};

export default Profile;
