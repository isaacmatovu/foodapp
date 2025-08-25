import { useAuthStore } from "@/store/AuthStore";
import UseCartStore from "@/store/CartStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
  const { isLoggedIn, isLoading } = useAuthStore();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { items } = UseCartStore();

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.replace("/form");
    }
  }, [isLoading, isLoggedIn]);

  if (!isLoggedIn || isLoading) {
    return <ActivityIndicator size={30} color={"green"} />;
  }

  return (
    <>
      {/* StatusBar configuration - this controls the time/battery area */}
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#102542" : "#fff"}
        translucent={false}
      />

      <SafeAreaView
        style={{ flex: 1, backgroundColor: isDarkMode ? "#000" : "#fff" }}
        edges={["left", "right", "top"]} // Remove bottom safe area
      >
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#F87060",
            tabBarStyle: {
              backgroundColor: isDarkMode ? "#102542" : "#e6e6e6",
              shadowOpacity: 0,
              borderTopWidth: 0,
              elevation: 0,
            },
            // Set header style based on theme
            headerStyle: {
              backgroundColor: isDarkMode ? "#102542" : "#fff",
            },
            headerTintColor: isDarkMode ? "#fff" : "#000",
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="food"
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color }) => (
                <View className="flex flex-row">
                  <Ionicons
                    name={focused ? "fast-food-sharp" : "fast-food-outline"}
                    size={24}
                    color={color}
                  />
                  <Text className="text-[#F87060]">{items.length}</Text>
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color }) => (
                <Ionicons
                  name={focused ? "man-sharp" : "man-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="notifications"
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color }) => (
                <Ionicons
                  name={
                    focused ? "notifications-sharp" : "notifications-outline"
                  }
                  size={24}
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </>
  );
}
