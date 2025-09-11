import { databases, ID } from "@/lib/appwrite";
import { useAuthStore } from "@/store/AuthStore";
import UseCartStore from "@/store/CartStore";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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

  useEffect(() => {
    handleValidation();
  }, [NumberInput]);

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
      clearCart();
      router.replace("/(tabs)/notifications");
    } catch {
      setProductError("An error occured while sending to the database");
    } finally {
      setLoading(false);
    }
  };

  const handleValidation = () => {
    const Error: Error = { number: "" };
    if (!NumberInput || NumberInput === 0) {
      Error.number = "Enter table number ";
    }
    setErrors(Error);
  };

  const handlesubmit = () => {
    handleValidation();
    handleCart();
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
              <View className="flex  flex-row gap-3">
                <TouchableOpacity onPress={() => setViewPrcie(!ViewPrice)}>
                  <Entypo
                    name={ViewPrice ? "eye-with-line" : "eye"}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <Text className="text-xl font-semibold">
                  Total Price : Ugshs.
                  {ViewPrice ? "******" : totalPrice.toFixed(2)}
                </Text>
              </View>
            </View>
            <Button style={styles.button} onPress={clearCart} mode="contained">
              Clear cart
            </Button>
          </View>

          {error?.number && (
            <Text className="text-red-500 text-xl">{error?.number}</Text>
          )}
          <TextInput
            keyboardType="number-pad"
            placeholder="Enter number"
            onChangeText={(text: string) => {
              setNumberInput(Number(text));
            }}
            value={NumberInput.toString()}
            style={styles.input}
          />

          {productError && (
            <Text className="text-red-500 mt-3">{productError}</Text>
          )}
          <View className="flex justify-center items-center">
            <Button
              disabled={NumberInput === 0 || loading || !NumberInput}
              mode="contained"
              style={styles.orderButton}
              onPress={() => {
                handlesubmit();
              }}
            >
              Make order
            </Button>
          </View>
          {loading && <ActivityIndicator color={"green"} size={30} />}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: 100,
    height: 50,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    marginBottom: 8,
  },
  button: {
    width: 150,
    marginRight: 4,
  },
  input: {
    width: 150,
    marginBottom: 10,
  },
  orderButton: {
    width: 300,
  },
});
export default Cart;
