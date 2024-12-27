import { View, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ICategory, IProductProps } from "@/types/interfaces";
import { RECOMMEND_CATEGORY_URL, SEARCH_URL } from "@/utils/constants/urls";
import { InputSearch, ModalRightSheet, StarGroup } from "@/components";
import { Text } from "@/components/Text";
import ProductCard from "@/components/cards/product-card";
import { Filter } from "lucide-react-native";
import { Input } from "@/components/Input";
import { getData } from "@/utils/functions/handle";
import { useColorScheme } from "nativewind";

interface IFiterState {
  category: string;
  rating: number | undefined;
  discount: boolean;
  minPrice: number | undefined;
  maxPrice: number | undefined;
}

export default function SearchResultPage() {
  const { searchKey, sortBy } = useLocalSearchParams();
  const { colorScheme } = useColorScheme();

  // sort
  const [searchKeyState, setSearchKeyState] = useState<string>((searchKey as string) || "");
  const [sortByState, setSortByState] = useState<string>((sortBy as string) || "");
  const [currentTab, setCurrentTab] = useState<"relevant" | "hot" | "new" | "sale">("relevant");

  // filter
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isFullCategories, setIsFullCategories] = useState<boolean>(false);
  const [filterState, setFilterState] = useState<IFiterState>({
    category: "",
    rating: undefined,
    discount: false,
    minPrice: undefined,
    maxPrice: undefined,
  });
  // console.log("searcccccccccccccccch", searchKey);

  const [products, setProducts] = useState<IProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Hàm gọi API lấy dữ liệu sản phẩm tìm kiếm
  const fetchSearchProducts = async ({
    searchKey,
    category = "",
    rating = undefined,
    minPrice = undefined,
    maxPrice = undefined,
    sortBy = "",
    discount = false,
    page = undefined,
  }: {
    searchKey: string;
    category?: string;
    rating?: number | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    sortBy?: string;
    discount?: boolean;
    page?: number | undefined;
  }) => {
    try {
      setIsLoading(true);

      const queryParams = [];
      if (searchKey && searchKey != "") queryParams.push(`searchKey=${searchKey}`);
      if (category && category != "") queryParams.push(`category=${category}`);
      if (rating) queryParams.push(`rating=${rating}`);
      if (minPrice) queryParams.push(`minPrice=${minPrice}`);
      if (maxPrice) queryParams.push(`maxPrice=${maxPrice}`);
      if (sortBy && sortBy != "") queryParams.push(`sortBy=${sortBy}`);
      if (discount) queryParams.push(`discount=${discount}`);

      // Thêm page vào queryParams
      queryParams.push(`page=${page || 1}`);

      const queryString = queryParams.join("&");

      // console.log("queryString", queryString);

      const res = await fetch(
        `${SEARCH_URL}?${queryString}`
        // {
        //   cache: "no-cache", // Không lưu cache để luôn lấy dữ liệu mới nhất
        // }
      );
      const data = await res.json();
      // console.log("dataaaaa", data);

      setProducts(data.data || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi khi gọi API tìm kiếm sản phẩm:", error);
    }
  };

  // useEffect để gọi API khi component được render
  useEffect(() => {
    fetchSearchProducts({ searchKey: searchKey as string, sortBy: sortByState });
  }, [searchKeyState, sortByState]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, message } = await getData(RECOMMEND_CATEGORY_URL);
        // console.log("ressssssss", data.data);
        setCategories(data.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View className="flex flex-col bg-white dark:bg-gray-800">
      <InputSearch transcript={searchKeyState} setTranscript={setSearchKeyState} />

      <View className="bg-white dark:bg-pri-6 flex flex-row justify-between items-center">
        <TouchableOpacity
          className={`p-4 ${
            currentTab == "relevant" ? "border-b-2 border-pri-6 dark:border-pri-2" : ""
          }`}
          onPress={() => {
            setCurrentTab("relevant");
          }}
        >
          <Text
            className={`${
              currentTab == "relevant" ? "text-pri-6 dark:text-pri-2 font-c-semibold" : ""
            }`}
          >
            Liên quan
          </Text>
        </TouchableOpacity>
        <View className="h-1/2 w-[2px] bg-slate-200"></View>

        <TouchableOpacity
          className={`p-4 ${
            currentTab == "hot" ? "border-b-2 border-pri-6 dark:border-pri-2" : ""
          }`}
          onPress={() => {
            setCurrentTab("hot");
            setSortByState("hot");
          }}
        >
          <Text
            className={`${currentTab == "hot" ? "text-pri-6 dark:text-pri-2 font-c-semibold" : ""}`}
          >
            HOT
          </Text>
        </TouchableOpacity>
        <View className="h-1/2 w-[2px] bg-slate-200"></View>

        <TouchableOpacity
          className={`p-4 ${
            currentTab == "new" ? "border-b-2 border-pri-6 dark:border-pri-2" : ""
          }`}
          onPress={() => {
            setCurrentTab("new");
            setSortByState("new");
          }}
        >
          <Text
            className={`${currentTab == "new" ? "text-pri-6 dark:text-pri-2 font-c-semibold" : ""}`}
          >
            Mới nhất
          </Text>
        </TouchableOpacity>
        <View className="h-1/2 w-[2px] bg-slate-200"></View>

        <TouchableOpacity
          className={`p-4 ${
            currentTab == "sale" ? "border-b-2 border-pri-6 dark:border-pri-2" : ""
          }`}
          onPress={() => {
            setCurrentTab("sale");
            setSortByState("sale");
          }}
        >
          <Text
            className={`${
              currentTab == "sale" ? "text-pri-6 dark:text-pri-2 font-c-semibold" : ""
            }`}
          >
            Bán chạy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="p-2" onPress={() => setShowFilterModal(true)}>
          <Filter color={colorScheme == "light" ? "black" : "white"} size={24} />
        </TouchableOpacity>

        <ModalRightSheet
          visible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          title="Bộ lọc tìm kiếm"
          modalWidth="w-4/5"
        >
          <View className="flex flex-col gap-4 ">
            <View className="flex flex-col gap-2">
              <Text className="text-lg font-c-semibold text-pri-6 dark:text-pri-2">Danh mục</Text>
              <View className="flex flex-row gap-2 flex-wrap justify-between">
                {(categories || []).length > 0 &&
                  (isFullCategories ? categories : categories.slice(0, 4)).map(
                    (category, index) => (
                      <TouchableOpacity
                        key={`filter category ${index}`}
                        className={`w-[48%] p-2 rounded-md ${
                          category.category_id_hashed == filterState.category
                            ? "bg-teal-100 dark:bg-teal-600"
                            : "bg-gray-100 dark:bg-gray-700"
                        }`}
                        onPress={() =>
                          setFilterState((prev) => ({
                            ...prev,
                            category: category.category_id_hashed,
                          }))
                        }
                      >
                        <Text className="text-center">{category.category_name}</Text>
                      </TouchableOpacity>
                    )
                  )}
              </View>
              <TouchableOpacity
                className="mx-auto"
                onPress={() => setIsFullCategories(!isFullCategories)}
              >
                <Text className="underline text-pri-6 dark:text-pri-2">
                  {isFullCategories ? "Thu gọn" : "Xem thêm"}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex flex-col gap-2">
              <Text className="text-lg font-c-semibold text-pri-6 dark:text-pri-2">Đánh giá</Text>
              <View className="flex flex-row gap-2 flex-wrap">
                <TouchableOpacity
                  className={`w-[48%] p-2 rounded-md ${
                    filterState.rating == 1
                      ? "bg-teal-100 dark:bg-teal-600"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                  onPress={() => setFilterState((prev) => ({ ...prev, rating: 1 }))}
                >
                  <Text className="text-center">
                    <StarGroup rating={1} starSize={20} />
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`w-[48%] p-2 rounded-md ${
                    filterState.rating == 2
                      ? "bg-teal-100 dark:bg-teal-600"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                  onPress={() => setFilterState((prev) => ({ ...prev, rating: 2 }))}
                >
                  <Text className="text-center">
                    <StarGroup rating={2} starSize={20} />
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`w-[48%] p-2 rounded-md ${
                    filterState.rating == 3
                      ? "bg-teal-100 dark:bg-teal-600"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                  onPress={() => setFilterState((prev) => ({ ...prev, rating: 3 }))}
                >
                  <Text className="text-center">
                    <StarGroup rating={3} starSize={20} />
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`w-[48%] p-2 rounded-md ${
                    filterState.rating == 4
                      ? "bg-teal-100 dark:bg-teal-600"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                  onPress={() => setFilterState((prev) => ({ ...prev, rating: 4 }))}
                >
                  <Text className="text-center">
                    <StarGroup rating={4} starSize={20} />
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`w-[48%] p-2 rounded-md ${
                    filterState.rating == 5
                      ? "bg-teal-100 dark:bg-teal-600"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                  onPress={() => setFilterState((prev) => ({ ...prev, rating: 5 }))}
                >
                  <Text className="text-center">
                    <StarGroup rating={5} starSize={20} />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex flex-col gap-2">
              <Text className="text-lg font-c-semibold text-pri-6 dark:text-pri-2">Giảm giá</Text>
              <View className="flex flex-row gap-2 flex-wrap justify-between">
                <TouchableOpacity
                  className={`w-[48%] p-2 rounded-md ${
                    filterState.discount == false
                      ? "bg-teal-100 dark:bg-teal-600"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                  onPress={() => setFilterState((prev) => ({ ...prev, discount: false }))}
                >
                  <Text className="text-center">Không</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`w-[48%] p-2 rounded-md ${
                    filterState.discount == true
                      ? "bg-teal-100 dark:bg-teal-600"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                  onPress={() => setFilterState((prev) => ({ ...prev, discount: true }))}
                >
                  <Text className="text-center">Có</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="w-full flex flex-col gap-2">
              <Text className="text-lg font-c-semibold text-pri-6 dark:text-pri-2">Giá tiền</Text>
              <View className="flex flex-col gap-2">
                <View className="w-full p-4 flex flex-row gap-2 justify-between items-center bg-gray-100 dark:bg-gray-700 rounded-md">
                  <Input
                    placeholder="TỐI THIỂU"
                    containerClassName="w-[45%]"
                    keyboardType="numeric"
                    value={String(filterState.minPrice || "")}
                    onChangeText={(v) =>
                      setFilterState((prev) => ({ ...prev, minPrice: Number(v) }))
                    }
                  />
                  <View className="w-[12px] h-[1px] bg-slate-600"></View>
                  <Input
                    placeholder="TỐI ĐA"
                    containerClassName="w-[45%]"
                    keyboardType="numeric"
                    value={String(filterState.maxPrice || "")}
                    onChangeText={(v) =>
                      setFilterState((prev) => ({ ...prev, maxPrice: Number(v) }))
                    }
                  />
                </View>

                <View className="flex flex-row gap-2 flex-wrap justify-between">
                  <TouchableOpacity
                    className="py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-md"
                    onPress={() =>
                      setFilterState((prev) => ({ ...prev, minPrice: 0, maxPrice: 100000 }))
                    }
                  >
                    <Text className="text-center text-base">0-100K</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md"
                    onPress={() =>
                      setFilterState((prev) => ({ ...prev, minPrice: 100000, maxPrice: 200000 }))
                    }
                  >
                    <Text className="text-center text-base">100-200K</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md"
                    onPress={() =>
                      setFilterState((prev) => ({ ...prev, minPrice: 200000, maxPrice: 500000 }))
                    }
                  >
                    <Text className="text-center text-base">200-500K</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md"
                    onPress={() =>
                      setFilterState((prev) => ({
                        ...prev,
                        minPrice: 1000000,
                        maxPrice: 5000000,
                      }))
                    }
                  >
                    <Text className="text-center text-base">{">"} 1M</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="flex flex-row justify-between gap-2">
              <TouchableOpacity
                className="w-[49%] p-2 border-2 border-gray-300 rounded-lg"
                onPress={async () => {
                  setFilterState({
                    category: "",
                    rating: undefined,
                    discount: false,
                    minPrice: undefined,
                    maxPrice: undefined,
                  });
                  setShowFilterModal(false);
                  await fetchSearchProducts({
                    searchKey: searchKey as string,
                    category: "",
                    rating: undefined,
                    discount: false,
                    minPrice: undefined,
                    maxPrice: undefined,
                  });
                }}
              >
                <Text className="text-center">Hủy bộ lọc</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[49%] p-2 bg-teal-400 rounded-lg"
                onPress={async () => {
                  setShowFilterModal(false);
                  await fetchSearchProducts({
                    searchKey: searchKey as string,
                    category: filterState.category,
                    rating: filterState.rating,
                    discount: filterState.discount,
                    minPrice: filterState.minPrice,
                    maxPrice: filterState.maxPrice,
                  });
                }}
              >
                <Text className="text-center text-white">Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ModalRightSheet>
      </View>

      <ScrollView>
        <View className="p-4">
          {/* Hiển thị trạng thái loading */}
          {isLoading ? (
            <View className="items-center justify-center py-6">
              <ActivityIndicator size="large" color="#00bfa5" />
            </View>
          ) : (
            <View className="w-full flex flex-row flex-wrap justify-between gap-y-4 gap-x-2">
              {(products || []).length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.product_id_hashed} product={product} />
                ))
              ) : (
                <Text className="text-center text-gray-600 dark:text-gray-400">
                  Không có sản phẩm nào.
                </Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
