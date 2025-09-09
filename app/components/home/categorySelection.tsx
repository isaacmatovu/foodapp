import categories from "@/data/data";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { Button } from "react-native-paper";

interface Category {
  handleSelectedCategory: (className: string) => void;
}

const CategorySelection = (props: Category) => {
  console.log("category selection rendered");
  const { handleSelectedCategory } = props;
  return (
    <View>
      <View className="mt-7">
        <Text className="text-white font-bold text-xl mb-7">
          Sushi Category
        </Text>

        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View className="flex-col mb-3 mr-4">
              <View className="bg-[#06D6A0] p-2 rounded-3xl w-32">
                <Button
                  onPress={() => handleSelectedCategory(item.name)}
                  className="text-white text-xl text-center"
                >
                  {item.name}
                </Button>
              </View>
            </View>
          )}
          className="py-2"
        />
      </View>
    </View>
  );
};

export default CategorySelection;
