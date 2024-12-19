// import React, { Suspense } from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import { ShoppingBag } from "lucide-react-native";
// import {
//   CustomerHeaderCategories,
//   CustomerHeaderNavigation,
//   CustomerHeaderLogo,
//   CustomerHeaderMenu,
//   // CustomerHeaderSearch,
//   CustomerHeaderCart,
//   // CustomerHeaderUser,
//   CustomerHeaderMore,
// } from "./components";

// export default function CustomerHeader() {
//   return (
//     <View className="fixed top-0 bg-white dark:bg-black shadow-sm w-screen z-50">
//       <View className="mx-auto flex flex-row justify-between items-center w-full">
//         <View className="px-4 py-1 bg-teal-700 dark:bg-teal-700 flex justify-between">
//           <CustomerHeaderLogo />
//           <CustomerHeaderMenu />
//         </View>

//         {/* <CustomerHeaderNavigation /> */}
//         {/* <CustomerHeaderCategories /> */}

//         <View className="phone:px-4 phone:py-3 tablet:px-9 laptop:px-0 flex flex-row justify-between">
//           {/* <Suspense fallback={<Text>Loading...</Text>}>
//             <CustomerHeaderSearch />
//           </Suspense> */}

//           {/* Cart-phone+tablet */}
//           <TouchableOpacity
//             style={{ display: "none" }} // Display based on platform
//             className="laptop:hidden relative flex text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 items-center"
//           >
//             <View className="relative flex">
//               <ShoppingBag />
//               <View className="absolute top-3 left-4 bg-orange-500 text-white text-[8px] font-medium w-4 h-4 flex items-center justify-center rounded-full">
//                 <Text className="text-xs text-white">12</Text>
//               </View>
//               <Text className="hidden ml-2 font-semibold tablet:block tablet:text-sm">
//                 Shopping bag
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         <View className="phone:hidden laptop:flex flex-row items-center space-x-4">
//           {/* <CustomerHeaderCart /> */}
//           {/* <CustomerHeaderUser /> */}
//           <CustomerHeaderMore />
//         </View>
//       </View>
//     </View>
//   );
// }

import React, { Suspense } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Search, ShoppingBag, Menu } from "lucide-react-native";
import {
  CustomerHeaderCart,
  CustomerHeaderLogo,
  CustomerHeaderMenu,
} from "./components";
import CustomerHeaderSearch from "./components/header-search";

export default function CustomerHeader() {
  return (
    <View className="flex flex-col">
      <View className="flex-row items-center justify-between bg-pri-1 dark:bg-teal-700 py-2 px-4">
        {/* Logo */}
        <CustomerHeaderLogo />
        {/* Menu Icon */}
        <View className="flex gap-6 flex-row">
          <CustomerHeaderCart />
          <TouchableOpacity>
            <Menu size={24} color="#fff" />
          </TouchableOpacity>
          {/* <CustomerHeaderMenu /> */}
        </View>
      </View>
    </View>
  );
}
