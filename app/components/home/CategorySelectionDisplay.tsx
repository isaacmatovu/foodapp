import categories from "@/data/data";
import React, { useMemo } from "react";
import { FlatList, Image, Text, View } from "react-native";

interface CategorySelectionDisplayProps {
  selectedCategory: string;
}

const CategorySelectionDisplay = (props: CategorySelectionDisplayProps) => {
  console.log("category selection display rendered");
  const { selectedCategory } = props;
  //find the current selected object
  const currentCategory = useMemo(
    () => categories.find((cat) => cat.name === selectedCategory),
    [selectedCategory]
  );
  return (
    <View>
      <View>
        <Text className="text-white text-2xl">{selectedCategory}</Text>

        {currentCategory && (
          <FlatList
            data={currentCategory.subcategories}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true} // Unmount off-screen items
            maxToRenderPerBatch={4} // Render 4 items per batch
            updateCellsBatchingPeriod={50} // Batch updates every 50ms
            initialNumToRender={6} // Render 6 items initially
            windowSize={5} // Keep 5 screens worth of items in memory
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

export default CategorySelectionDisplay;
