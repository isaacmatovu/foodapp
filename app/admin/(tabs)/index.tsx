import Admin from "@/app/components/admin/admin";
import { useAuthStore } from "@/store/AuthStore";
import React from "react";
import { View } from "react-native";

const Orders = () => {
  const { user } = useAuthStore();
  return (
    <View className="flex-1 bg-[#102542] ">
      {/* <View className="bg-gray-600 flex justify-center items-center mt-6 ml-4 mr-4 border-2 border-r-yellow-500 border-l-yellow-500 rounded-xl border-t-0 border-b-0">
        <View className="flex flex-row gap-5">
          <Text className="text-green-300 text-xl">Welcome</Text>
          <Text className="text-white text-xl">{user?.name}</Text>
        </View>
      </View>
      <View>
        <Text>Orders</Text>
      </View> */}
      <Admin />
    </View>
  );
};

export default Admin;
