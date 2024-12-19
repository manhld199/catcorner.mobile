// import libs
import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Plus, Minus } from "lucide-react-native";

// import compoents
import { Input } from "../../Input";

interface QuantityInputProps {
  value?: number; // Giá trị ban đầu
  min?: number; // Giá trị tối thiểu
  max?: number; // Giá trị tối đa
  step?: number; // Giá trị tăng/giảm mỗi lần nhấn
  onChange?: (value: number) => void; // Hàm gọi lại khi giá trị thay đổi
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  value = 1,
  min = 1,
  max = 100,
  step = 1,
  onChange,
}) => {
  const [quantity, setQuantity] = useState(value);

  // Hàm cập nhật giá trị
  const updateQuantity = (newValue: number) => {
    if (newValue < min) {
      setQuantity(min);
      onChange && onChange(min);
    } else if (newValue > max) {
      setQuantity(max);
      onChange && onChange(max);
    } else {
      setQuantity(newValue);
      onChange && onChange(newValue);
    }
  };

  // Xử lý nút giảm
  const handleDecrease = () => {
    updateQuantity(quantity - step);
  };

  // Xử lý nút tăng
  const handleIncrease = () => {
    updateQuantity(quantity + step);
  };

  // Xử lý khi nhập vào TextInput
  const handleInputChange = (text: string) => {
    const numericValue = parseInt(text, 10);
    if (!isNaN(numericValue)) {
      updateQuantity(numericValue);
    } else {
      setQuantity(min); // Nếu nhập không hợp lệ, đặt giá trị về min
    }
  };

  return (
    <View className="flex-row items-center h-[32px] ">
      {/* Nút giảm */}
      <TouchableOpacity
        onPress={handleDecrease}
        className={`w-10 h-full flex justify-center items-center rounded-l-md border-[1px] border-gray-200 ${
          quantity <= min ? "" : "bg-gray-100"
        }`}
        disabled={quantity <= min}
      >
        <Minus size={18} color={quantity > min ? "#000" : "#ccc"} />
      </TouchableOpacity>

      {/* Input */}
      <Input
        className="w-16 !h-full text-center text-lg border border-gray-200 rounded-none"
        value={quantity.toString()}
        keyboardType="numeric"
        onChangeText={handleInputChange}
        onEndEditing={() => updateQuantity(quantity)}
      />

      {/* Nút tăng */}
      <TouchableOpacity
        onPress={handleIncrease}
        className={`w-10 h-full flex justify-center items-center rounded-r-md border-[1px] border-gray-200 ${
          quantity >= max ? "" : "bg-gray-100"
        }`}
        disabled={quantity >= max}
      >
        <Plus size={18} color={quantity < max ? "#000" : "#ccc"} />
      </TouchableOpacity>
    </View>
  );
};

export default QuantityInput;
