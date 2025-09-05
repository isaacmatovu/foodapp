import { databases } from "@/lib/appwrite";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
interface Orders {
  id: string;
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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await databases.listDocuments(
          "68b96e8a000fd3222348",
          "orders_table"
        );
        setOrders(response.documents as unknown as Orders[]);
      } catch {
        setError("Failed to fetch orders check your internet connection");
      }
    };
    fetchOrders();
  }, []);

  return (
    <ScrollView className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Orders</Text>
      <View>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View>
            {orders.map((order) => {
              //pass the items  string back to an array of objects
              const orderItems: OrderItem[] = JSON.parse(order.items);
              return (
                <View key={order.id} style={styles.orderCard}>
                  <Text>Customer:{order.Username}</Text>
                  <Text>Table:{order.tableNumber}</Text>
                  <Text>Date:{new Date(order.createdAt).toLocaleString()}</Text>
                  <Text>Total amount:Ugsh.{order.total}</Text>
                  <Text>items</Text>
                  {orderItems.map((item) => (
                    <View key={item.id} className="ml-4 mt-2">
                      <Text>Name:{item.name}</Text>
                      <Text>Price:Ugsh.{item.price}</Text>
                      <Text>Quantity:{item.quantity}</Text>
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
