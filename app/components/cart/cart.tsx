import { databases, ID } from "@/lib/appwrite";
import { useAuthStore } from "@/store/AuthStore";
import UseCartStore from "@/store/CartStore";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

interface Error {
  number: string;
}
const Cart = () => {
  const [NumberInput, setNumberInput] = useState<number>(0);
  const [error, setErrors] = useState<Error>({
    number: "",
  });
  const [loading, setLoading] = useState(false);
  const [productError, setProductError] = useState("");
  const [ViewPrice, setViewPrcie] = useState(false);
  const { items, UpdateQuantity, removeFromCart, getTotalPrice, clearCart } =
    UseCartStore();
  const { user } = useAuthStore();
  const totalPrice = getTotalPrice();
  const router = useRouter();

  const handleCart = async () => {
    const itemsString = JSON.stringify(
      items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }))
    );
    try {
      setLoading(true);
      const orderData = {
        userId: user?.id,
        Username: user?.name,
        tableNumber: NumberInput,
        items: itemsString,
        total: totalPrice,
        createdAt: new Date().toISOString(),
      };
      await databases.createDocument(
        "68b96e8a000fd3222348",
        "orders_table",
        ID.unique(),
        orderData
      );
      router.replace("/(tabs)");
      clearCart();
    } catch {
      setProductError("An error occured while sending to the database");
    } finally {
      setLoading(false);
    }
  };

  const handleValidation = () => {
    const Error: Error = { number: "" };
    if (NumberInput === 0 || NumberInput < 0) {
      Error.number = "Enter a number more than 0 ";
    } else if (!NumberInput) {
      Error.number = "Enter table number";
    }
    setErrors(Error);
  };

  const handlesubmit = () => {
    handleValidation();
  };

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
            <View className="flex">
              <Text className="text-xl font-semibold">
                <TouchableOpacity onPress={() => setViewPrcie(!ViewPrice)}>
                  <Entypo
                    name={ViewPrice ? "eye-with-line" : "eye"}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                Total Price : {ViewPrice ? "******" : totalPrice.toFixed(2)}
              </Text>
            </View>
            <Button style={styles.button} onPress={clearCart} mode="contained">
              Clear cart
            </Button>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <TextInput
                keyboardType="number-pad"
                placeholder="Enter table number"
                onChangeText={(text) => setNumberInput(Number(text))}
                style={styles.input}
              />
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>

          {error && <Text className="text-red-500 mt-3">{error.number}</Text>}
          {productError && (
            <Text className="text-red-500 mt-3">{productError}</Text>
          )}
          <Button
            disabled={NumberInput === 0 || loading}
            mode="contained"
            onPress={() => {
              (handlesubmit(), handleCart());
            }}
          >
            Make order
          </Button>
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
  input: {
    width: 80,
  },
});
export default Cart;
