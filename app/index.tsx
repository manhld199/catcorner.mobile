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

export default function HomeScreen() {
  const petCategories = ["All", "Cat", "Dog", "Turtle", "Bird", "Rabbit"]; // Danh mục
  const adoptPets = [
    {
      id: 1,
      name: "Luna",
      location: "California (2.5km)",
      image:
        "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-8.jpg", // Placeholder ảnh Luna
      genderIcon: "male",
    },
    {
      id: 2,
      name: "Lucy",
      location: "Frankfurt (1.2km)",
      image:
        "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-6.jpg", // Placeholder ảnh Lucy
      genderIcon: "female",
    },
    {
      id: 3,
      name: "Lucy",
      location: "Frankfurt (1.2km)",
      image:
        "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-6.jpg", // Placeholder ảnh Lucy
      genderIcon: "female",
    },
  ];

  return (
    <ScrollView className="bg-white flex-1">
      {/* Thanh tìm kiếm */}
      <View className="p-4 flex-row items-center">
        <Ionicons name="search" size={20} color="gray" className="mr-2" />
        <TextInput
          placeholder="Search"
          className="flex-1 bg-gray-100 p-2 rounded-lg"
        />
      </View>

      {/* Banner */}
      <View className="mx-4 bg-teal-200 rounded-lg p-4 flex-row justify-between items-center">
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
        <Text className="mx-4 font-c-bold text-lg">Pet Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-2 flex-row mx-4 space-x-3"
        >
          {petCategories.map((category, index) => (
            <TouchableOpacity
              key={index}
              className={`px-4 py-2 rounded-full ${
                category === "All" ? "bg-teal-500" : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-sm ${
                  category === "All" ? "text-white" : "text-gray-700"
                }`}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Adopt Pet */}
      <View className="mt-6">
        <View className="flex-row justify-between mx-4 mb-2">
          <Text className="font-c-bold text-lg">Adopt pet</Text>
          <TouchableOpacity>
            <Text className="text-teal-700">See all</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap gap-3 px-4">
          {adoptPets.map((pet) => (
            <View
              key={pet.id}
              className="bg-white rounded-lg shadow p-2 mb-2"
              style={{ width: "48%" }}
            >
              <Image
                source={{ uri: pet.image }}
                className="h-40 w-full rounded-lg"
                resizeMode="cover"
              />
              <TouchableOpacity className="absolute right-2 top-2 bg-white p-1 rounded-full shadow">
                <Ionicons name="heart-outline" size={20} color="red" />
              </TouchableOpacity>
              <Text className="mt-2 font-c-bold">{pet.name}</Text>
              <Text className="text-gray-500 text-xs">{pet.location}</Text>
              <Ionicons
                name={pet.genderIcon === "male" ? "male" : "female"}
                size={16}
                color={pet.genderIcon === "male" ? "blue" : "pink"}
                className="mt-1"
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
