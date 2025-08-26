import UseCartStore from "@/store/CartStore";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

const Cart = () => {
  const { items, UpdateQuantity, removeFromCart, getTotalPrice, clearCart } =
    UseCartStore();
  const totalPrice = getTotalPrice();
  return (
    <View>
      {items.length === 0 ? (
        <View className="w-full h-full justify-center items-center">
          <Text className="text-2xl font-bold">No items in the cart</Text>
        </View>
      ) : (
        <ScrollView>
          {items.map((item) => (
            <View key={item.id} className="bg-white rounded-2xl p-3 mb-3">
              <View className="flex-row justify-between items-center">
                <Image source={item.image} className="w-48 h-40 rounded-lg" />
                <View>
                  <View className="flex justify-between text-start">
                    <View className="flex flex-row justify-between">
                      <Text className="text-black text-xl font-bold max-w-28">
                        {item.name}
                      </Text>
                      <EvilIcons
                        className=""
                        name="trash"
                        size={30}
                        color="red"
                        onPress={() => removeFromCart(item.id)}
                      />
                    </View>
                    <Text className="text-black text-lg font-light">
                      {item.price * item.quantity}
                    </Text>
                  </View>
                  <View className="justify-center text-center">
                    <TextInput
                      keyboardType="number-pad"
                      style={styles.textInput}
                      value={item.quantity.toString()}
                      onChangeText={(text) =>
                        UpdateQuantity(item.id, Number(text))
                      }
                    />
                    <View className="gap-3">
                      <View className="flex flex-row gap-2">
                        <Button
                          onPress={() =>
                            UpdateQuantity(item.id, item.quantity + 1)
                          }
                          mode="contained"
                        >
                          +
                        </Button>
                        <Button
                          onPress={() =>
                            UpdateQuantity(item.id, item.quantity - 1)
                          }
                          mode="contained"
                        >
                          -
                        </Button>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
          <View className="flex flex-row justify-between items-center">
            <Text className="text-xl font-semibold">
              Total Price : {totalPrice.toFixed(2)}
            </Text>
            <Button style={styles.button} onPress={clearCart} mode="contained">
              Clear cart
            </Button>
          </View>
        </ScrollView>
      )}
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
  button: {
    width: 200,
  },
});
export default Cart;
