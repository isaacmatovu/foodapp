import { useAuthStore } from "@/store/AuthStore";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Text, View } from "react-native";

const Settings = () => {
  const { logOut } = useAuthStore();
  return (
    <View className="flex-1 bg-black">
      <View>
        <Text className="text-white font-medium text-2xl mb-20">
          Sushi food!
        </Text>
        <View className="flex flex-row gap-6 mb-12">
          <FontAwesome5 name="grin-wink" size={24} color="white" />
          <Text className="text-white text-xl">Beneficiaries</Text>
        </View>
        <View className="flex flex-row gap-6 mb-12">
          <FontAwesome name="address-book-o" size={24} color="white" />
          <Text className="text-white text-xl">More information</Text>
        </View>
        <View className="flex flex-row gap-6 mb-12">
          <MaterialIcons name="support-agent" size={24} color="white" />
          <Text className="text-white text-xl">Support</Text>
        </View>
        <View className="flex flex-row gap-6 mb-12">
          <Feather name="settings" size={24} color="white" />
          <Text className="text-white text-xl">Settings</Text>
        </View>
        <View className="flex flex-row gap-6 mb-12">
          <FontAwesome5 name="receipt" size={24} color="white" />
          <Text className="text-white text-xl">Get Reciept</Text>
        </View>
        <View className="flex flex-row gap-6 mb-12">
          <MaterialIcons name="logout" size={24} color="white" />
          <Text className="text-white text-xl" onPress={logOut}>
            Logout
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Settings;
