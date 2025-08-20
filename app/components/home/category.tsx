import React from "react";
import { ScrollView, Text, View } from "react-native";

const types = ["All types", "Junk", "Local", "Breakfast", "Drinks"];

const Category = () => {
  return (
    <View className="mt-7">
      <Text className="text-white font-bold text-xl mb-7">Sushi Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="py-2"
      >
        <View className="flex flex-row gap-x-4">
          {types.map((type) => (
            <View key={type} className="flex-col mb-3">
              <View className="bg-[#06D6A0] p-2 rounded-3xl w-32">
                <Text className="text-white text-xl text-center">{type}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Category;
