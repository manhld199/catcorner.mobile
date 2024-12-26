import { ChevronRight, X } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, FlatList, TextInput } from "react-native";

interface SelectProps {
  items: { label: string; value: string }[];
  value: string | null;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  items,
  value,
  onValueChange,
  placeholder = "Chọn một mục",
  disabled = false,
}) => {
  const { colorScheme } = useColorScheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to remove diacritics
  const removeDiacritics = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Filter items based on the search query (ignore diacritics)
  const filteredItems = items.filter((item) =>
    removeDiacritics(item.label.toLowerCase()).includes(removeDiacritics(searchQuery.toLowerCase()))
  );

  const handleItemPress = (selectedValue: string) => {
    onValueChange(selectedValue);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        className={`h-12 border border-input rounded-md px-4 flex flex-row justify-between items-center gap-2 ${
          disabled ? "bg-gray-200 dark:bg-zinc-800" : "bg-white dark:bg-zinc-950"
        }`}
        onPress={() => !disabled && setModalVisible(true)}
        disabled={disabled}
      >
        <Text className="font-c-regular text-lg text-gray-700 dark:text-gray-400">
          {value ? items.find((item) => item.value === value)?.label : placeholder}
        </Text>
        <ChevronRight color={colorScheme == "light" ? "black" : "gray"} size={16} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black bg-opacity-50 justify-center items-center"
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View className="w-4/5 bg-white rounded-lg h-2/3 relative">
            {/* Close Button */}
            <TouchableOpacity
              className="z-10 absolute top-3 right-3"
              onPress={() => setModalVisible(false)}
            >
              <X color={"black"} size={20} />
            </TouchableOpacity>

            {/* Search Input */}
            <TextInput
              className="h-12 border-b border-gray-300 px-4 text-base text-gray-700"
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            {/* FlatList */}
            <FlatList
              data={filteredItems}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-4 border-b border-gray-200"
                  onPress={() => handleItemPress(item.value)}
                >
                  <Text className="text-base text-gray-700">{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Select;
