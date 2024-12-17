import React, { ReactNode, useState, useEffect } from "react";
import {
  Modal,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  PanResponder,
  Animated,
} from "react-native";
import { Text } from "@/components/Text";
import { X } from "lucide-react-native"; // Import X icon

const { height } = Dimensions.get("window");

interface BottomSheetModalProps {
  visible: boolean; // Trạng thái hiển thị modal
  onClose: () => void; // Hàm đóng modal
  title?: string; // Tiêu đề của modal (tuỳ chọn)
  children: ReactNode; // Nội dung của modal
}

export const ModalBottomSheet: React.FC<BottomSheetModalProps> = ({
  visible,
  onClose,
  title,
  children,
}) => {
  const [panY] = useState(new Animated.Value(0)); // Sử dụng Animated.Value cho mượt mà

  useEffect(() => {
    if (!visible) {
      Animated.timing(panY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dy > 5, // Chỉ bắt đầu nếu kéo xuống
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 0) {
        panY.setValue(gestureState.dy); // Theo dõi vị trí khi kéo xuống
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 100) {
        // Ngưỡng kéo xuống để đóng modal
        Animated.timing(panY, {
          toValue: height, // Trượt modal ra ngoài màn hình
          duration: 200,
          useNativeDriver: true,
        }).start(onClose); // Đóng modal
      } else {
        // Reset lại vị trí modal nếu không kéo đủ xa
        Animated.timing(panY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <Modal transparent animationType="none" visible={visible} onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/20">
        <Animated.View
          className="h-1/2 w-full bg-white rounded-t-xl pt-2.5 px-4"
          {...panResponder.panHandlers}
          style={{
            transform: [{ translateY: panY }],
          }}
        >
          {/* Thanh ngăn xếp (Drag handle) */}
          <View className="items-center mb-2">
            <View className="w-10 h-1.5 bg-gray-300 rounded-full" />
          </View>

          {/* Tiêu đề */}
          {title && (
            <View className="mb-3">
              <Text className="text-lg font-c-semibold">{title}</Text>
            </View>
          )}

          {/* Nút đóng (X icon) */}
          <TouchableOpacity onPress={onClose} className="absolute top-4 right-4 p-2 rounded-full">
            <X size={24} color="#4b5563" />
          </TouchableOpacity>

          {/* Nội dung của modal */}
          <ScrollView className="mt-4 flex-1">{children}</ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ModalBottomSheet;
