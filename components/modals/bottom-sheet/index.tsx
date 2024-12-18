import React, { ReactNode, useState, useEffect } from "react";
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
import { Text } from "@/components/Text";
import { X } from "lucide-react-native"; // Import X icon

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

  // State để kiểm tra xem thao tác kéo có bắt đầu ở vùng tiêu đề hay không
  const [isDraggingAllowed, setIsDraggingAllowed] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt) => {
      const { locationY } = evt.nativeEvent;
      if (locationY <= 40) {
        setIsDraggingAllowed(true);
        return true;
      }
      return false;
    },
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return isDraggingAllowed && gestureState.dy > 5;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (isDraggingAllowed && gestureState.dy > 0) {
        panY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      setIsDraggingAllowed(false);
      if (gestureState.dy > 100) {
        Animated.timing(panY, {
          toValue: height,
          duration: 200,
          useNativeDriver: true,
        }).start(onClose);
      } else {
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
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-end bg-black/20">
          <Animated.View
            className={`${modalHeight ? modalHeight : "h-1/2"} w-full bg-white ${
              modalHeight == "h-full" ? "pt-4" : "rounded-t-xl pt-2.5"
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
            <TouchableOpacity onPress={onClose} className="absolute top-4 right-4 p-2 rounded-full">
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
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalBottomSheet;
