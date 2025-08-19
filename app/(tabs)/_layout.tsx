import { useAuthStore } from "@/store/AuthStore";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

export default function TabsLayout() {
  const { isLoggedIn, isLoading } = useAuthStore();

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
    <Tabs>
      <Tabs.Screen name="home" options={{ headerShown: false }} />
    </Tabs>
  );
}
