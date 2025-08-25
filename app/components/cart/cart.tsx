import UseCartStore from "@/store/CartStore";
import React from "react";
import { Text, View } from "react-native";

const Cart = () => {
  const { items } = UseCartStore();
  return (
    <View className="flex-1 h-screen">
      {items.length === 0 && (
        <View className="flex-1 justify-center items-center">
          <Text>No items added to the cart</Text>
        </View>
      )}
    </View>
  );
};

export default Cart;
