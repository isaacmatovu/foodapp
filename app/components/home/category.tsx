import categories from "@/data/data";
import React, { useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { Button } from "react-native-paper";

interface Categoty {
  name: string;
}

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Junk Food");

  //find the current selected object
  const currentCategory = categories.find(
    (cat) => cat.name === selectedCategory
  );
  return (
    <View>
      <View className="mt-7">
        <Text className="text-white font-bold text-xl mb-7">
          Sushi Category
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="py-2"
        >
          <View className="flex flex-row gap-x-4">
            {categories.map((category) => (
              <View key={category.name} className="flex-col mb-3">
                <View className="bg-[#06D6A0] p-2 rounded-3xl w-32">
                  <Button
                    onPress={() => {
                      setSelectedCategory(category.name);
                    }}
                    className="text-white text-xl text-center"
                  >
                    {category.name}
                  </Button>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      {/* subcategories */}
      <View>
        <Text className="text-white text-2xl">{selectedCategory}</Text>

        {currentCategory && (
          <FlatList
            data={currentCategory.subcategories}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="bg-white rounded-2xl p-4 mb-4 w-[48%] shadow-sm">
                <View className="items-center mb-3">
                  <Image source={item.image} className="w-full h-24" />
                </View>
                <Text className="text-lg font-semibold text-gray-800 text-center mb-1">
                  {item.name}
                </Text>
                <Text className="text-green-600 font-bold text-center">
                  ${item.price.toFixed(2)}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Category;
