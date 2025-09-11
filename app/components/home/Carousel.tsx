import images from "@/data/images";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClick();
    }, 10000);
  }, [currentIndex]);

  const handleClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  return (
    <View className="flex justify-center items-center">
      <Image source={images[currentIndex]} alt="images" style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 100,
  },
});

export default Carousel;
