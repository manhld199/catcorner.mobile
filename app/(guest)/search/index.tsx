import React, { useState, useEffect } from "react";
import { ScrollView, View, useColorScheme, ActivityIndicator, Image } from "react-native";
import { ArrowLeft, Mic, MicOff, Search } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";

// import components
import { CardCategory, CardSuggestedProduct } from "@/components";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { Input } from "@/components/Input";

// import interfaces
import { ICategory, IProductSuggest } from "@/types/interfaces";

// import utils
import { RECOMMEND_CATEGORY_URL, RECOMMEND_SEARCH_URL } from "@/utils/constants/urls";
import { getData } from "@/utils/functions/handle";

export default function SearchPage() {
  const colorScheme = useColorScheme();
  const [searchColorState, setSearchColorState] = useState<string[]>(
    colorScheme == "light"
      ? ["rgb(234, 251, 228)", "rgb(153, 246, 228)"]
      : ["rgb(153, 246, 228)", "rgb(22, 101, 101)"]
  );
  const [micColorState, setMicColorState] = useState<string>(
    colorScheme == "light" ? "#4b5563" : "#fff"
  );

  useEffect(() => {
    if (colorScheme == "light") {
      setSearchColorState(["rgb(234, 251, 228)", "rgb(153, 246, 228)"]);
      setMicColorState("#4b5563");
    } else if (colorScheme == "dark") {
      setSearchColorState(["rgb(153, 246, 228)", "rgb(22, 101, 101)"]);
      setMicColorState("#fff");
    }
  }, [colorScheme]);

  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [suggestedProducts, setSuggestedProducts] = useState<IProductSuggest[]>([]); // Dữ liệu sản phẩm
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false); // Loading state

  // Đảm bảo sự kiện nhận dạng giọng nói được theo dõi
  useSpeechRecognitionEvent("start", () => setRecognizing(true));
  useSpeechRecognitionEvent("end", () => {
    setRecognizing(false);
    ExpoSpeechRecognitionModule.stop(); // Đảm bảo module thực sự dừng
  });
  useSpeechRecognitionEvent("result", (event) => {
    const finalTranscript = event.results[0]?.transcript;

    if (finalTranscript) {
      setTranscript(finalTranscript); // Lưu kết quả nhận diện giọng nói
      ExpoSpeechRecognitionModule.stop(); // Dừng ghi âm ngay lập tức
      setRecognizing(false); // Đặt trạng thái ghi âm về false
    }
  });

  // Fetch data từ API khi input thay đổi
  useEffect(() => {
    if (transcript.trim()) {
      const timeoutId = setTimeout(() => {
        fetchSuggestedProducts(transcript);
      }, 800); // Debounce 800ms
      return () => clearTimeout(timeoutId);
    }
  }, [transcript]);

  // Hàm fetch API
  const fetchSuggestedProducts = async (query: string) => {
    try {
      setLoading(true);
      const { data, message } = await getData(
        `${RECOMMEND_SEARCH_URL}?searchKey=${encodeURIComponent(query)}`
      );
      // console.log("ressssssss", data.data.recommendedProducts[0]);
      setSuggestedProducts(data.data.recommendedProducts);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Chức năng bắt đầu ghi âm
  const handleStart = async () => {
    if (recognizing) return; // Ngăn việc ghi âm khi đã trong trạng thái nhận diện

    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }

    try {
      ExpoSpeechRecognitionModule.start({
        lang: "vi-VN",
        interimResults: true,
        maxAlternatives: 1,
        continuous: false,
      });
      setRecognizing(true); // Đặt trạng thái đang ghi âm
    } catch (error) {
      console.error("Speech Recognition Error:", error);
      setRecognizing(false); // Đặt lại trạng thái nếu xảy ra lỗi
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data, message } = await getData(RECOMMEND_CATEGORY_URL);
        // console.log("ressssssss", data.data);
        setCategories(data.data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <ScrollView className="flex flex-col">
      <View className="w-full flex flex-col">
        {/* Input Search */}
        <LinearGradient className="w-full" colors={searchColorState as any}>
          <View className="w-full px-2 py-4 flex flex-row gap-2 items-center">
            <ArrowLeft color="#315475" size={28} />
            <View className="overflow-hidden flex-1 h-[44px] bg-white dark:bg-zinc-900 border-2 border-pri-7 dark:border-pri-2 rounded-lg flex flex-row gap-2">
              <Input
                placeholder="Nhập từ khóa cần tìm..."
                className="!border-0 flex-1 dark:bg-zinc-900"
                value={transcript}
                onChangeText={(text) => setTranscript(text)} // Cập nhật input
              />
              <Button
                variant="none"
                className="p-1 w-[32px]"
                onPress={recognizing ? () => ExpoSpeechRecognitionModule.stop() : handleStart}
              >
                {recognizing ? (
                  <MicOff color={micColorState} className="w-full h-full" />
                ) : (
                  <Mic color={micColorState} className="w-full h-full" />
                )}
              </Button>
              <Button variant="none" className="w-[48px] h-full bg-pri-7 p-2 rounded-none">
                <Search color="#fff" className="w-full h-full" />
              </Button>
            </View>
          </View>
        </LinearGradient>

        {/* Suggested Products */}
        <View className="w-full px-4 py-4 bg-white dark:bg-zinc-900">
          <Text className="w-full text-center font-c-semibold text-gray-600 dark:text-white">
            Sản phẩm gợi ý
          </Text>
          <View className="w-1/3 h-[1.5px] mx-auto my-2 bg-teal-300"></View>
          {loading ? (
            <ActivityIndicator size="large" color="#00bcd4" />
          ) : (
            <View className="flex flex-col gap-2">
              {suggestedProducts.length > 0 ? (
                suggestedProducts.map((product, index) => (
                  <CardSuggestedProduct key={index} product={product} />
                ))
              ) : (
                <View className="w-full flex justify-center items-center">
                  <View className="w-[250px] h-[250px]">
                    <Image
                      source={require("@/assets/images/noti/not-found.png")}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                  <Text className="text-center text-gray-500 dark:text-white">
                    {transcript
                      ? `Không có sản phẩm gợi ý cho từ khóa '${transcript}'.`
                      : "Hãy nhập từ khóa cần tìm."}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>

      {/* Categories */}
      <View className="w-full px-4 py-4 bg-white dark:bg-zinc-900 flex flex-col gap-2">
        <Text className="w-full text-center font-c-semibold text-gray-600 dark:text-white">
          Sản phẩm theo danh mục
        </Text>
        <View className="w-1/3 h-[1.5px] mx-auto my-2 bg-teal-300"></View>
        <View className="w-full flex flex-row flex-wrap justify-between gap-x-2 gap-y-4">
          {categories.map((category, index) => (
            <CardCategory key={index} category={category} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
