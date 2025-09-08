import { databases, Query } from "@/lib/appwrite";
import { useAuthStore } from "@/store/AuthStore";
import UseCartStore from "@/store/CartStore";
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

const Orders = () => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuthStore();
  const { items } = UseCartStore();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Filter orders by the logged-in user's ID on the server side
        const response = await databases.listDocuments(
          "68b96e8a000fd3222348",
          "orders_table",
          [Query.equal("userId", user.id)] // Use user ID for more reliable filtering
        );

        setOrders(response.documents as unknown as Orders[]);
      } catch (err) {
        setError("Failed to fetch orders. Check your internet connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, items.length]); // Refetch when user changes

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#06D6A0" />
        <Text className="mt-4">Loading your orders...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 text-center">{error}</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-lg">Please sign in to view your orders</Text>
      </View>
    );
  }

  return (
    <ScrollView className="p-4 bg-gray-50">
      <Text className="text-2xl font-bold mb-6 text-center text-gray-800">
        Your Orders
      </Text>

      {orders.length === 0 ? (
        <View className="flex-1 justify-center items-center mt-10">
          <Text className="text-lg text-gray-500">
            You haven't placed any orders yet
          </Text>
        </View>
      ) : (
        <View>
          {orders.map((order) => {
            const orderItems: OrderItem[] = JSON.parse(order.items);
            return (
              <View key={order.$id} style={styles.orderCard}>
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-lg font-semibold text-gray-800">
                    Order #{order.$id.slice(-6)}
                  </Text>
                  <Text className="text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </Text>
                </View>

                <View className="flex-row justify-between mb-3">
                  <Text className="text-gray-600">
                    Table: {order.tableNumber}
                  </Text>
                  <Text className="text-green-600 font-bold">
                    Ugsh. {order.total.toLocaleString()}
                  </Text>
                </View>

                <Text className="text-gray-700 font-medium mb-2">Items:</Text>
                {orderItems.map((item) => (
                  <View
                    key={item.id}
                    className="ml-2 mb-3 p-2 bg-gray-100 rounded"
                  >
                    <Text className="text-gray-800 font-medium">
                      {item.name}
                    </Text>
                    <View className="flex-row justify-between mt-1">
                      <Text className="text-gray-600">
                        Qty: {item.quantity}
                      </Text>
                      <Text className="text-gray-600">
                        Ugsh. {(item.price * item.quantity).toLocaleString()}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: "#06D6A0",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
});

export default Orders;
