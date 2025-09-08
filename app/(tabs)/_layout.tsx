import { useAuthStore } from "@/store/AuthStore";
import UseCartStore from "@/store/CartStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Tabs, useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if authentication state is determined
    if (!isLoading) {
      setIsCheckingAuth(false);
      if (!isLoggedIn) {
        router.replace("/form");
      }
    }
  }, [isLoading, isLoggedIn]);

  // Show loading indicator while checking auth status
  if (isCheckingAuth || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={30} color={"green"} />
      </View>
    );
  }

  // Don't render tabs if not logged in
  if (!isLoggedIn) {
    return <Redirect href="/form" />;
  }

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#102542" : "#fff"}
        translucent={false}
      />

      <SafeAreaView
        style={{ flex: 1, backgroundColor: isDarkMode ? "#000" : "#fff" }}
        edges={["left", "right", "top"]}
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
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name={focused ? "fast-food-sharp" : "fast-food-outline"}
                    size={24}
                    color={color}
                  />
                  {items.length > 0 && (
                    <View
                      style={{
                        backgroundColor: "#F87060",
                        borderRadius: 10,
                        minWidth: 20,
                        height: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 4,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        {items.length}
                      </Text>
                    </View>
                  )}
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
