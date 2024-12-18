// import libs
import React, { ReactNode, useState, useEffect } from "react";
import { X } from "lucide-react-native";
import {
  Modal,
  View,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PanResponder,
  Animated,
  ScrollView,
} from "react-native";

// import components
import { Text } from "@/components/Text";

const { height } = Dimensions.get("window");

interface BottomSheetModalProps {
  visible: boolean; // Trạng thái hiển thị modal
  onClose: () => void; // Hàm đóng modal
  title?: string; // Tiêu đề của modal (tuỳ chọn)
  children: ReactNode; // Nội dung của modal
  useScrollView?: boolean;
  modalHeight?: string;
  customTitle?: ReactNode;
}

export const ModalBottomSheet: React.FC<BottomSheetModalProps> = ({
  visible,
  onClose,
  title,
  children,
  useScrollView = true,
  modalHeight,
  customTitle,
}) => {
  const [panY] = useState(new Animated.Value(height)); // Khởi tạo vị trí ngoài màn hình

  useEffect(() => {
    if (visible) {
      // Hiển thị modal: Trượt từ dưới lên
      Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const closeModal = () => {
    // Trượt modal xuống ngoài màn hình và gọi onClose sau khi hoạt ảnh hoàn tất
    Animated.timing(panY, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt) => {
      const { locationY } = evt.nativeEvent;
      if (locationY <= 40) {
        return true;
      }
      return false;
    },
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return gestureState.dy > 5;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 0) {
        panY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 100) {
        closeModal(); // Đóng modal khi kéo xuống đủ xa
      } else {
        // Reset modal về vị trí ban đầu nếu kéo không đủ xa
        Animated.timing(panY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <Modal transparent animationType="none" visible={visible} onRequestClose={closeModal}>
      <View className="flex-1 bg-black/20">
        {/* Nền xám bấm để đóng */}
        <TouchableWithoutFeedback onPress={closeModal}>
          <View className="flex-1" />
        </TouchableWithoutFeedback>

        {/* Nội dung modal */}
        <Animated.View
          className={`${modalHeight ? modalHeight : "h-1/2"} w-full bg-white ${
            modalHeight === "h-full" ? "pt-4" : "rounded-t-xl pt-2.5"
          } px-4`}
          {...panResponder.panHandlers}
          style={{
            transform: [{ translateY: panY }],
          }}
        >
          {/* Thanh ngăn xếp (Drag handle) */}
          <View className="items-center mb-2">
            <View className="w-10 h-1.5 bg-gray-300 rounded-full" />
          </View>

          {customTitle ? (
            customTitle
          ) : (
            <>
              {title && (
                <View className="mb-3">
                  <Text className="text-lg font-c-semibold">{title}</Text>
                </View>
              )}
            </>
          )}

          {/* Nút đóng (X icon) */}
          <TouchableOpacity
            onPress={closeModal}
            className="absolute top-4 right-4 p-2 rounded-full"
          >
            <X size={24} color="#4b5563" />
          </TouchableOpacity>

          {/* Nội dung của modal */}
          {useScrollView ? (
            <ScrollView className="w-full mt-4 flex-1 grow">{children}</ScrollView>
          ) : (
            <>{children}</>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ModalBottomSheet;
