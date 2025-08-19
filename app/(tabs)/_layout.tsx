import { Tabs } from "expo-router";
import "./global.css";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen
        name="form"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
