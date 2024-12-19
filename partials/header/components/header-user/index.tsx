// import React from "react";
// import { View, Text, TouchableOpacity, Image } from "react-native";
// import {
//   SquareUserRound,
//   ScrollText,
//   LogOut,
//   UserRound,
//   UserRoundPlus,
// } from "lucide-react-native";
// import { signOut } from "next-auth/react"; // Nếu không dùng next-auth, thay thế bằng cơ chế đăng xuất khác.
// import { useNavigation } from "@react-navigation/native";

// export default function CustomerHeaderUser({ session }: { session: any }) {
//   const navigation = useNavigation();

//   const handleSignOut = async () => {
//     try {
//       await signOut({
//         callbackUrl: "/login", // Thay thế nếu không dùng next-auth
//       });
//     } catch (error) {
//       console.error("Lỗi khi đăng xuất:", error);
//     }
//   };

//   const getLastName = (fullName: string | null | undefined) => {
//     if (!fullName) return "User";
//     const nameParts = fullName.trim().split(" ");
//     return nameParts[nameParts.length - 1];
//   };

//   if (!session) {
//     // Người dùng chưa đăng nhập
//     return (
//       <View className="relative group">
//         <TouchableOpacity
//           onPress={() => navigation.navigate("Login")}
//           className="tablet:hidden laptop:flex text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 flex-row items-center"
//         >
//           <UserRound />
//           <Text className="ml-1 font-semibold laptop:block desktop:block">Sign in</Text>
//         </TouchableOpacity>
//         <View className="absolute right-0 mt-3 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300">
//           <View className="absolute top-[-6px] right-3 w-3 h-3 bg-white dark:bg-black rotate-45 transform border-t border-l border-gray-200 dark:border-gray-600"></View>
//           <TouchableOpacity
//             onPress={() => navigation.navigate("Register")}
//             className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer font-medium text-pri hover:text-teal-600 flex flex-row items-center"
//           >
//             <UserRoundPlus />
//             <Text className="ml-2 font-medium">Sign up</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }

//   // Người dùng đã đăng nhập
//   return (
//     <View className="relative group">
//       <TouchableOpacity className="tablet:hidden laptop:flex text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 flex-row items-center">
//         <Image
//           source={{ uri: session.user?.image || "/imgs/test.jpg" }}
//           className="rounded-full mr-2 object-cover w-[30px] h-[30px]"
//         />
//         <Text className="font-semibold laptop:block desktop:block">
//           Hi, {getLastName(session.user?.name) || "User"}
//         </Text>
//       </TouchableOpacity>
//       <View className="absolute right-0 mt-3 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300">
//         <View className="absolute top-[-6px] right-3 w-3 h-3 bg-white dark:bg-black rotate-45 transform border-t border-l border-gray-200 dark:border-gray-600"></View>
//         <TouchableOpacity
//           onPress={() => navigation.navigate("MyAccount")}
//           className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer font-medium text-pri hover:text-teal-600 flex flex-row items-center"
//         >
//           <SquareUserRound />
//           <Text className="ml-2 font-medium">My Account</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => navigation.navigate("OrderHistory")}
//           className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer font-medium text-pri hover:text-teal-600 flex flex-row items-center"
//         >
//           <ScrollText />
//           <Text className="ml-2 font-medium">Orders</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={handleSignOut}
//           className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer font-medium text-pri hover:text-teal-600 flex flex-row items-center"
//         >
//           <LogOut />
//           <Text className="ml-2 font-medium">Sign out</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }
