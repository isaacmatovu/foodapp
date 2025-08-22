import categories from "@/data/data";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";

const AllCategories = () => {
  return (
    <View>
      {/* Header */}
      <View className="flex flex-row justify-between items-center mb-4">
        <View className="flex flex-row gap-2 items-center">
          <FontAwesome5 name="crown" size={24} color="#F87060" />
          <Text className="text-[#F87060] text-xl">Premium</Text>
        </View>
        <Text className="text-white text-xl">See All</Text>
      </View>

      {/* Categories List */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: category }) => (
          <View className="mb-6">
            <Text className="text-white text-lg font-light mb-2">
              {category.name}
            </Text>

            {/* Subcategories */}
            {category.subcategories.map((sub) => (
              <View key={sub.name} className="bg-black rounded-2xl p-3 mb-3">
                <View className="flex-row justify-between items-center">
                  <Image source={sub.image} className="w-40 h-24 rounded-lg" />
                  <View className="flex-1 ml-4">
                    <Text className="text-white text-xl font-bold">
                      {sub.name}
                    </Text>
                    <Text className="text-white text-lg font-light">
                      ${sub.price.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default AllCategories;
