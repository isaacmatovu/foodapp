import { databases } from "@/lib/appwrite";
import { useAuthStore } from "@/store/AuthStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
interface Orders {
  $id: string;
  userId: string;
  Username: string;
  tableNumber: number;
  items: string;
  total: number;
  createdAt: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
const Admin = () => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuthStore();
  const [dater, setDate] = useState<Date>();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await databases.listDocuments(
          "68b96e8a000fd3222348",
          "orders_table"
        );
        setOrders(response.documents as unknown as Orders[]);
      } catch {
        setError("Failed to fetch orders check your internet connection");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <ScrollView className="flex-1 p-4">
      <View className="bg-gray-600 flex justify-center items-center mt-6 ml-4 mr-4 border-2 border-r-yellow-500 border-l-yellow-500 rounded-xl border-t-0 border-b-0">
        <View className="flex flex-row gap-5">
          <Text className="text-green-300 text-xl">Welcome Admin</Text>
          <Text className="text-white text-xl">{user?.name}</Text>
        </View>
      </View>
      <View>
        <Text className="font-bold text-xl text-white">Orders</Text>
      </View>
      <View>
        {loading ? (
          <ActivityIndicator size={30} color={"green"} />
        ) : error ? (
          <Text className="text-red-500 text-xl">{error}</Text>
        ) : (
          <View className="w-full h-full bg-[#1F1C2C]">
            {orders.map((order) => {
              //pass the items  string back to an array of objects
              const orderItems: OrderItem[] = JSON.parse(order.items);
              return (
                <View key={order.$id} style={styles.orderCard}>
                  <View className="bg-slate-700 flex flex-row gap-5">
                    <View>
                      <Text className="font-bold text-green-500">
                        Customer:
                      </Text>
                      <Text className="text-white">Table:</Text>
                      <Text className="text-white">Date:</Text>
                      <Text className="text-white">Total amount:</Text>

                      <View className="bg-black  h-16">
                        {new Date().toDateString() ===
                        new Date(order.createdAt).toDateString() ? (
                          <Text className="text-white text-xl">
                            Current Order
                          </Text>
                        ) : (
                          <Text className="text-white text-xl">
                            Order Finished
                          </Text>
                        )}
                      </View>
                    </View>
                    <View>
                      <Text className="text-white">{order.Username}</Text>
                      <Text className="text-white">{order.tableNumber}</Text>
                      <Text className="text-white">
                        {new Date(order.createdAt).toLocaleString()}
                      </Text>
                      <Text className="text-white">Ugsh.{order.total}</Text>
                    </View>
                  </View>
                  <Text>items</Text>
                  {orderItems.map((item) => (
                    <View key={item.id} className="ml-4 mt-2 bg-gray-800 p-6 ">
                      <View className="flex flex-row gap-10">
                        <View>
                          <Text className="text-white">Name:</Text>
                          <Text className="text-white">Price:</Text>
                          <Text className="text-white">Quantity:</Text>
                        </View>
                        <View>
                          <Text className="text-white">{item.name}</Text>
                          <Text className="text-white">Ugsh.{item.price}</Text>
                          <Text className="text-white">{item.quantity}</Text>
                        </View>
                      </View>
                      <View className="flex justify-end items-end">
                        {(item.price > 10 && (
                          <FontAwesome name="star" size={24} color="yellow" />
                        )) ||
                          (item.price <= 5 && (
                            <FontAwesome
                              name="star-half-empty"
                              size={24}
                              color="yellow"
                            />
                          )) ||
                          (item.price >= 5 && item.price < 10 && (
                            <FontAwesome
                              name="star-o"
                              size={24}
                              color="yellow"
                            />
                          ))}
                      </View>
                    </View>
                  ))}
                </View>
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: "#FCF7F8",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#06D6A0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default Admin;
