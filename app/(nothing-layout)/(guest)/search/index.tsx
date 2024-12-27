import React, { useState, useEffect, Fragment } from "react";
import { ScrollView, View, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { Mic, MicOff, Search } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import { useColorScheme } from "nativewind";
import { useRouter } from "expo-router";

// import components
import { CardCategory, CardSuggestedProduct, InputSearch } from "@/components";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { Input } from "@/components/Input";
import { CustomerAppbar } from "@/partials";

// import interfaces
import { ICategory, IProductSuggest } from "@/types/interfaces";

// import utils
import { RECOMMEND_CATEGORY_URL, RECOMMEND_SEARCH_URL } from "@/utils/constants/urls";
import { getData } from "@/utils/functions/handle";

export default function SearchPage() {
  const router = useRouter();

  const [transcript, setTranscript] = useState("");
  const [suggestedProducts, setSuggestedProducts] = useState<IProductSuggest[]>([]); // Dữ liệu sản phẩm
  const [isProductLoading, setIsProductLoading] = useState(false); // Loading state
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false); // Loading state

  // Hàm fetch API
  const fetchSuggestedProducts = async (query: string) => {
    try {
      setIsProductLoading(true);
      const { data, message } = await getData(
        `${RECOMMEND_SEARCH_URL}?searchKey=${encodeURIComponent(query)}`
      );
      // console.log("ressssssss", data.data.recommendedProducts[0]);
      if (!data) {
        Toast.show({
          type: "error",
          text1: "Oops!!!",
          text2: "Có sự cố đã xảy ra khi tìm kiếm, vui lòng thử lại sau!",
        });
        return;
      }

      setSuggestedProducts(data.data.recommendedProducts);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsProductLoading(false);
    }
  };

  // Fetch data từ API khi input thay đổi
  useEffect(() => {
    if (transcript.trim()) {
      const timeoutId = setTimeout(() => {
        fetchSuggestedProducts(transcript);
      }, 800); // Debounce 800ms
      return () => clearTimeout(timeoutId);
    }
  }, [transcript]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsCategoriesLoading(true);
        const { data, message } = await getData(RECOMMEND_CATEGORY_URL);
        // console.log("ressssssss", data.data);
        setCategories(data.data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Fragment>
      <InputSearch transcript={transcript} setTranscript={setTranscript} />
      <ScrollView className="flex flex-col mb-[58px]">
        <View className="w-full flex flex-col">
          {/* Suggested Products */}
          <View className="w-full px-4 py-4 bg-white dark:bg-gray-800">
            <Text className="w-full text-center text-xl font-c-semibold text-gray-600 dark:text-white">
              Kết quả tìm kiếm
            </Text>
            <View className="w-1/3 h-[1.5px] mx-auto my-2 bg-teal-300"></View>
            {isProductLoading ? (
              <ActivityIndicator size="large" color="#00bcd4" />
            ) : (
              <View className="flex flex-col items-center gap-2">
                {suggestedProducts.length > 0 ? (
                  <Fragment>
                    {suggestedProducts.map((product, index) => (
                      <CardSuggestedProduct key={index} product={product} />
                    ))}
                    <TouchableOpacity
                      className="p-2"
                      onPress={() =>
                        router.push({
                          pathname: "/search-result",
                          params: { searchKey: transcript },
                        })
                      }
                    >
                      <Text className="underline text-pri-6 dark:text-pri-2">Xem tất cả</Text>
                    </TouchableOpacity>
                  </Fragment>
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
        <View className="w-full px-4 py-4 bg-white dark:bg-gray-800 flex flex-col gap-2">
          <Text className="w-full text-center text-xl font-c-semibold text-gray-600 dark:text-white">
            Sản phẩm theo danh mục
          </Text>
          <View className="w-1/3 h-[1.5px] mx-auto my-2 bg-teal-300"></View>
          {isCategoriesLoading ? (
            <ActivityIndicator size="large" color="#00bcd4" />
          ) : (
            <View className="w-full flex flex-row flex-wrap justify-between gap-x-2 gap-y-4">
              {categories.map((category, index) => (
                <CardCategory key={index} category={category} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <CustomerAppbar />
    </Fragment>
  );
}
