// // import libs
// import { View } from "react-native";
// import { Link } from "expo-router";
// import { useContext } from "react";

// // import providers
// import { AuthContext } from "@/providers";

// // import utils
// import { AUTH_REGISTER_URL } from "@/utils/constants/urls";

// // import components
// import { Text } from "@/components/Text";
// import CustomerHeader from "@/partials/header";

// export default function Screen() {
//   const { user } = useContext(AuthContext) || { user: null };

//   return (
//     <>
//       <View className="flex-1 justify-center items-center gap-5 p-6">
//         <Text>ID: {user?.user_id}</Text>
//         <Text>Email: {user?.email}</Text>
//         <Text>Name: {user?.user_name}</Text>
//         <Text>Role: {user?.user_role}</Text>
//         <Text>Avatar: {user?.user_avt}</Text>

//         <Link
//           href="/verify-email?email=leducmanh123kt@gmail.com"
//           className="dark:text-white font-c-bold"
//         >
//           Go to auth verify
//         </Link>

//         <Link href="/register" className="dark:text-white font-c-bold">
//           Go to auth register
//         </Link>
//         <Link href="/login" className="dark:text-white font-c-bold-italic">
//           Go to auth login
//         </Link>

//         <Text>{AUTH_REGISTER_URL}</Text>

//         <Link href="/profile" className="dark:text-white font-c-bold-italic">
//           profile
//         </Link>
//       </View>
//     </>
//   );
// }

import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import ProductCard from "@/components/cards/product-card";
import { ProductCarousel, ProductCategories } from "@/components";
import { CustomerAppbar } from "@/partials";

export default function HomeScreen() {
  const petCategories = ["All", "Cat", "Dog", "Turtle", "Bird", "Rabbit"]; // Danh mục
  const images = [
    "https://i.pinimg.com/550x/94/7e/db/947edbbf6ced34863fc8702ed29ef79f.jpg",
    "https://www.thepoetmagazine.org/wp-content/uploads/2024/06/meo-kho-hieu-meme.jpg",
    "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_1280.jpg",
  ];
  const products = [
    {
      product_id_hashed: "p1",
      product_slug: "thuc-an-cho-meo-reflex-plus",
      product_imgs: [
        "https://res.cloudinary.com/dmjwq3ebx/image/upload/c_limit,w_640/f_auto/q_auto/v1/SEO_Images/Products/P003/Pate-cho-m%C3%A8o-Reflex-Plus-Lon-400gr-1?_a=BAVAZGDW0", // Link ảnh sản phẩm
      ],
      highest_discount: 10,
      category_name: "Hạt dinh dưỡng",
      product_name: "Thức ăn cho mèo Reflex Plus Thổ Nhĩ Kỳ",
      variant_name: ["Cá ngừ", "Thịt gà", "Thịt bò"],
      lowest_price: 233099,
      product_price: 258999,
      sold_quantity: 40,
    },
    {
      product_id_hashed: "p2",
      product_slug: "pate-cho-meo-reflex-plus",
      product_imgs: [
        "https://res.cloudinary.com/dmjwq3ebx/image/upload/c_limit,w_640/f_auto/q_auto/v1/SEO_Images/Products/P003/Pate-cho-m%C3%A8o-Reflex-Plus-Lon-400gr-1?_a=BAVAZGDW0", // Link ảnh sản phẩm
      ],
      highest_discount: 10,
      category_name: "Pate",
      product_name: "Pate cho mèo Reflex Plus",
      variant_name: ["Salmon", "Chicken", "Turkey"],
      lowest_price: 169739,
      product_price: 188599,
      sold_quantity: 133,
    },
  ];

  return (
    <>
      <ScrollView className="bg-white flex-1 dark:bg-zinc-900">
        <ProductCarousel images={images} />

        {/* Banner */}
        <View className="mx-4 bg-teal-200 rounded-lg p-4 flex-row justify-between items-center mt-6">
          <View>
            <Text className="text-white font-c-bold text-lg">
              Today's discount
            </Text>
            <TouchableOpacity className="mt-2 bg-white px-3 py-1 rounded-lg">
              <Text className="text-gray-800">More</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-12.jpg",
            }}
            className="w-24 h-24"
            resizeMode="contain"
          />
        </View>

        {/* Pet Categories */}
        <View className="mt-6">
          <Text className="mx-4 font-c-bold text-lg dark:text-white">
            Danh mục sản phẩm
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-2 flex-row mx-4 space-x-3"
          >
            <ProductCategories />
          </ScrollView>
        </View>

        <View className="mt-6">
          <View className="flex-row justify-between mx-4 mb-2">
            <Text className="font-c-bold text-lg dark:text-white">
              Sản phẩm HOT
            </Text>
            <TouchableOpacity>
              <Text className="text-teal-700 dark:text-teal-400">Xem thêm</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap gap-3 px-4 mb-6">
            {products.map((product) => (
              <ProductCard key={product.product_id_hashed} product={product} />
            ))}
          </View>
        </View>
      </ScrollView>
      <CustomerAppbar />
    </>
  );
}
