import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Search } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

export default function CustomerHeaderSearch() {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [totalSearchResults, setTotalSearchResults] = useState(0);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

  // Handle search input
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    if (term.length > 0) {
      fetchSearchResults(term);
    } else {
      setSuggestions([]);
      setIsSuggestionsVisible(false);
    }
  };

  // Mock fetch function
  const fetchSearchResults = async (inputValue) => {
    const mockData = {
      data: {
        searchKey: inputValue,
        recommendedProducts: [
          {
            product_id_hashed: "12345678uhvcxsdfg",
            product_slug: "product-1",
            product_name: "Sản phẩm 1",
            lowest_price: "100.000đ",
            product_price: "150.000đ",
            product_img: "https://via.placeholder.com/40", // Example image URL
          },
          {
            product_id_hashed: "2",
            product_slug: "product-2",
            product_name: "Sản phẩm 2",
            lowest_price: "200.000đ",
            product_img: "https://via.placeholder.com/40",
          },
        ],
        totalProducts: 10,
      },
    };

    setSuggestions(mockData.data.recommendedProducts.slice(0, 4));
    setTotalSearchResults(mockData.data.totalProducts);
    setIsSuggestionsVisible(true);
  };

  return (
    <View className="relative p-4 ">
      {/* Search Bar */}
      <View className="flex-row items-center dark:bg-gray-800/80 bg-gray-100 rounded-full p-2 outline outline-offset-0 outline-blue-500 bg-gray-100">
        <TextInput
          placeholder="Bạn tìm gì..."
          value={searchTerm}
          onChangeText={handleSearchChange}
          className="flex-1 px-4 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-white"
        />
        <TouchableOpacity
          //   onPress={() =>
          //     navigation.navigate("SearchResult", { searchKey: searchTerm })
          //   }
          className="p-2 bg-pri-1 dark:bg-teal-700 rounded-full"
        >
          <Search width={20} height={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Suggested Products */}
      {isSuggestionsVisible && suggestions.length > 0 && (
        <View className="absolute top-14 left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg">
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.product_id_hashed}
            renderItem={({ item }) => (
              <TouchableOpacity
                // onPress={() =>
                //   navigation.navigate("ProductDetail", {
                //     productSlug: item.product_slug,
                //     productId: item.product_id_hashed,
                //   })
                // }
                className="flex-row items-center p-3 border-b border-gray-200"
              >
                <View className="flex-1">
                  <Text className="font-bold text-gray-800">
                    {item.product_name}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Text className="text-red-500 mr-2">
                      {item.lowest_price}
                    </Text>
                    {item.product_price && (
                      <Text className="line-through text-gray-500">
                        {item.product_price}
                      </Text>
                    )}
                  </View>
                </View>
                <Image
                  source={{ uri: item.product_img }}
                  className="w-10 h-10 rounded-lg ml-2"
                />
              </TouchableOpacity>
            )}
          />
          {totalSearchResults > 4 && (
            <TouchableOpacity
              //   onPress={() =>
              //     navigation.navigate("SearchResult", { searchKey: searchTerm })
              //   }
              className="p-3 items-center"
            >
              <Text className="text-blue-600 font-bold">
                Xem thêm {totalSearchResults - 4} sản phẩm
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}
