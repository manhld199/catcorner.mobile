import React from "react";
import { View, Image } from "react-native";
import Swiper from "react-native-swiper";

interface CarouselProps {
  images: string[]; // Mảng các đường dẫn ảnh
}

export default function Carousel({ images }: CarouselProps) {
  return (
    <View className="flex-1">
      <Swiper
        showsPagination={true}
        autoplay={true}
        autoplayTimeout={5}
        activeDotColor="#0d9488" // Màu dot hiển thị active
        containerStyle={{ height: 200 }}
      >
        {images.map((image, index) => (
          <View key={index} className="flex justify-center items-center">
            <Image
              source={{ uri: image }}
              resizeMode="cover"
              className="h-full w-full"
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
}
