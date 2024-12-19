import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { ChevronDown } from "lucide-react-native";

export default function CustomerHeaderCategories() {
  const [selectedCategory, setSelectedCategory] = useState("Hạt dinh dưỡng");

  const categories = [
    {
      id: 1,
      name: "Hạt dinh dưỡng",
      products: ["Product 1", "Product 2"],
      image: require("@/assets/images/test.jpg"), // Cách sử dụng hình ảnh cục bộ
    },
    {
      id: 2,
      name: "Pate",
      products: ["Product 3", "Product 4"],
      image: require("@/assets/images/test.jpg"),
    },
    {
      id: 3,
      name: "Cỏ mèo",
      products: ["Product 5", "Product 6"],
      image: require("@/assets/images/test.jpg"),
    },
    {
      id: 4,
      name: "Cát vệ sinh",
      products: ["Product 7", "Product 8"],
      image: require("@/assets/images/test.jpg"),
    },
    {
      id: 5,
      name: "Nhà vệ sinh",
      products: ["Product 9", "Product 10"],
      image: require("@/assets/images/test.jpg"),
    },
  ];

  const products = [
    {
      category: "Hạt dinh dưỡng",
      items: [
        {
          name: "Product 1",
          price: "₫100.000",
          image: require("@/assets/images/test.jpg"),
        },
        {
          name: "Product 2",
          price: "₫200.000",
          image: require("@/assets/images/test.jpg"),
        },
      ],
    },
    {
      category: "Pate",
      items: [
        {
          name: "Product 3",
          price: "₫150.000",
          image: require("@/assets/images/test.jpg"),
        },
        {
          name: "Product 4",
          price: "₫250.000",
          image: require("@/assets/images/test.jpg"),
        },
      ],
    },
  ];

  const filteredProducts = products.find(
    (p) => p.category === selectedCategory
  );

  return (
    <View className="relative group">
      {/* Trigger */}
      <TouchableOpacity className="hidden laptop:flex cursor-pointer relative text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 items-center">
        <Text className="ml-2 font-semibold tablet:block laptop:block desktop:block">
          Categories
        </Text>
        <ChevronDown />
      </TouchableOpacity>

      {/* Dropdown */}
      <View className="z-50 absolute left-1/2 transform laptop:-translate-x-[27%] desktop:-translate-x-[45%] mt-4 laptop:w-[90vw] desktop:w-[80vw] bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300">
        {/* Tam giác trên dropdown */}
        <View className="absolute top-[-6px] laptop:left-[26%] desktop:left-[45%] transform desktop:-translate-x-1/2 w-3 h-3 bg-white dark:bg-black rotate-45 transform border-t border-l border-gray-200 dark:border-gray-600" />

        <View className="flex flex-row">
          {/* Danh mục bên trái */}
          <View className="w-1/4 bg-teal-50 dark:bg-gray-800 py-4">
            <ScrollView>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  className={`px-4 py-2 hover:bg-teal-300/10 dark:hover:bg-gray-700 cursor-pointer flex items-center ${
                    selectedCategory === category.name
                      ? "bg-teal-300/10 dark:bg-gray-700"
                      : ""
                  }`}
                  onPress={() => setSelectedCategory(category.name)} // Chuyển đổi sự kiện onMouseEnter thành onPress
                >
                  <Image
                    source={category.image}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      marginRight: 10,
                    }}
                  />
                  <Text>
                    {category.name} ({category.products.length})
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Sản phẩm tương ứng bên phải */}
          <View className="w-2/3 p-4">
            <Text className="font-bold mb-4">
              Sản phẩm bán chạy nhất trong {selectedCategory}
            </Text>
            <View className="flex flex-wrap flex-row">
              {filteredProducts?.items.map((product, index) => (
                <View key={index} className="flex flex-col items-center mb-4">
                  <Image
                    source={product.image}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  />
                  <Text className="mt-2 text-sm font-medium">
                    {product.name}
                  </Text>
                  <Text className="text-red-500">{product.price}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
