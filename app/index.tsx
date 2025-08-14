import { Link } from "expo-router";
import { ImageBackground, Text, View } from "react-native";
import { Button } from "react-native-paper";
const image = require("./components/images/food.jpg");
export default function Index() {
  return (
    <View className="flex-1">
      <ImageBackground source={image} className="flex-1" resizeMode="cover">
        <View className="flex-1 justify-between py-10 px-7">
          <Text className="text-white text-center text-8xl">Sushify</Text>
          <View>
            <View>
              <Text className="text-white text-4xl">Save every moment</Text>
              <Text className="font-bold text-7xl text-[#F87060] max-w-full">
                Order sushi today
              </Text>
            </View>
            <Link href={"/form"} asChild>
              <Button
                className="py-3"
                buttonColor="white"
                textColor="#F87060"
                mode="contained"
              >
                Get Started
              </Button>
            </Link>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
