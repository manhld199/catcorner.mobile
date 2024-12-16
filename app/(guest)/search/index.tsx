import React, { useState, useEffect } from "react";
import { ScrollView, View, TextInput } from "react-native";
import { ArrowLeft, Mic, Search } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";

// import components
import { CardCategory, CardSuggestedProduct } from "@/components";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";

export default function SearchPage() {
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");

  // Đảm bảo sự kiện của nhận dạng giọng nói được theo dõi
  useSpeechRecognitionEvent("start", () => setRecognizing(true));
  useSpeechRecognitionEvent("end", () => setRecognizing(false));
  useSpeechRecognitionEvent("result", (event) => {
    setTranscript(event.results[0]?.transcript);
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("error code:", event.error, "error message:", event.message);
  });

  // Chức năng bắt đầu ghi âm
  const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }

    // Bắt đầu nhận diện giọng nói
    ExpoSpeechRecognitionModule.start({
      lang: "en-US", // Ngôn ngữ (có thể thay đổi theo nhu cầu)
      interimResults: true, // Cho phép nhận diện kết quả tạm thời
      maxAlternatives: 1, // Chỉ lấy kết quả tốt nhất
      continuous: false, // Dừng khi ngừng nói
      requiresOnDeviceRecognition: false, // Nhận diện trên thiết bị
      addsPunctuation: false, // Không thêm dấu câu tự động
      contextualStrings: ["Carlsen", "Nepomniachtchi", "Praggnanandhaa"], // Tùy chỉnh văn bản ngữ cảnh
    });
  };

  return (
    <ScrollView className="flex flex-col">
      <View className="w-full flex flex-col">
        {/* Input Search */}
        <LinearGradient className="w-full" colors={["rgb(234, 251, 228)", "rgb(153, 246, 228)"]}>
          <View className="w-full px-2 py-4 flex flex-row gap-2 items-center">
            <ArrowLeft color="#315475" size={28} />
            <View className="flex-1 h-[42px] overflow-hidden bg-white dark:bg-zinc-900 border-2 border-pri-7 dark:border-pri-2 rounded-lg flex flex-row gap-2">
              <TextInput
                placeholder="Nhập từ khóa cần tìm..."
                className="!border-0 flex-1 dark:bg-zinc-900"
                value={transcript} // Hiển thị nội dung giọng nói đã chuyển thành text
                onChangeText={(text) => setTranscript(text)} // Cho phép chỉnh sửa
              />
              <Button
                variant="none"
                className="p-1 w-[32px]"
                onPress={recognizing ? () => ExpoSpeechRecognitionModule.stop() : handleStart}
              >
                <Mic color={recognizing ? "#fff" : "#4b5563"} className="w-full h-full" />
              </Button>
              <Button variant="none" className="w-[48px] h-full bg-pri-7 p-2 rounded-none">
                <Search color="#fff" className="w-full h-full" />
              </Button>
            </View>
          </View>
        </LinearGradient>

        {/* Suggested products */}
        <View className="w-full px-4 py-4 bg-white dark:bg-zinc-900">
          <Text className="w-full text-center font-c-semibold text-gray-600 dark:text-white">
            Sản phẩm gợi ý
          </Text>
          <View className="w-1/3 h-[1.5px] mx-auto my-2 bg-teal-300"></View>
          <View className="flex flex-col gap-2">
            <CardSuggestedProduct />
            <CardSuggestedProduct />
            <CardSuggestedProduct />
            <CardSuggestedProduct />
          </View>
        </View>
      </View>

      {/* Categories */}
      <View className="w-full px-4 py-4 bg-white dark:bg-zinc-900 flex flex-col gap-2">
        <Text className="w-full text-center font-c-semibold text-gray-600 dark:text-white">
          Sản phẩm theo danh mục
        </Text>
        <View className="w-1/3 h-[1.5px] mx-auto my-2 bg-teal-300"></View>
        <View className="w-full flex flex-row flex-wrap justify-between gap-y-8">
          {Array.from({ length: 9 }).map((_, index) => (
            <CardCategory key={index} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
