import categories from "@/data/data";
import UseCartStore from "@/store/CartStore";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

interface QuantityState {
  [key: string]: number;
}

const AllCategories = () => {
  const [quantities, setQuantities] = useState<QuantityState>({});
  const { addToCart } = UseCartStore();

  // Initialize quantities for all subcategories
  React.useEffect(() => {
    const initialQuantities: QuantityState = {};
    categories.forEach((category) => {
      category.subcategories.forEach((sub) => {
        initialQuantities[sub.id] = 1; // Default quantity is 1
      });
    });
    setQuantities(initialQuantities);
  }, []);

  const addQuantity = (subId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [subId]: (prev[subId] || 1) + 1,
    }));
  };

  const subtractQuantity = (subId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [subId]: Math.max(0, (prev[subId] || 1) - 1),
    }));
  };

  const handleInputChange = (subId: number, text: string) => {
    const numericValue = parseInt(text) || 0;
    setQuantities((prev) => ({
      ...prev,
      [subId]: Math.max(0, numericValue),
    }));
  };

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
            {category.subcategories.map((sub) => {
              const currentQuantity = quantities[sub.id] || 1;
              const product = {
                id: sub.id,
                name: sub.name,
                price: sub.price,
                image: sub.image,
                quantity: currentQuantity,
              };
              return (
                <View key={sub.id} className="bg-white rounded-2xl p-3 mb-3">
                  <View className="flex-row justify-between items-center">
                    <Image
                      source={sub.image}
                      className="w-48 h-40 rounded-lg"
                    />
                    <View>
                      <View className="flex justify-between text-start">
                        <Text className="text-black text-xl font-bold max-w-28">
                          {sub.name}
                        </Text>
                        <Text className="text-black text-lg font-light">
                          ${currentQuantity * Number(sub.price.toFixed(2))}
                        </Text>
                      </View>
                      <View className="justify-center text-center">
                        <TextInput
                          keyboardType="number-pad"
                          style={styles.textInput}
                          onChangeText={(text) =>
                            handleInputChange(sub.id, text)
                          }
                          value={currentQuantity.toString()}
                        />
                        <View className="gap-3">
                          <View className="flex flex-row gap-2">
                            <Button
                              onPress={() => addQuantity(sub.id)}
                              mode="contained"
                            >
                              +
                            </Button>
                            <Button
                              onPress={() => subtractQuantity(sub.id)}
                              disabled={currentQuantity === 0}
                              mode="contained"
                            >
                              -
                            </Button>
                          </View>
                          <Button
                            mode="contained"
                            onPress={() => addToCart(product, currentQuantity)}
                          >
                            Order Now
                          </Button>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: 50,
    height: 50,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
  },
});

export default AllCategories;
