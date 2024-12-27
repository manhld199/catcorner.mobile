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

const { width } = Dimensions.get("window");

interface RightSheetModalProps {
  visible: boolean; // Trạng thái hiển thị modal
  onClose: () => void; // Hàm đóng modal
  title?: string; // Tiêu đề của modal (tuỳ chọn)
  children: ReactNode; // Nội dung của modal
  useScrollView?: boolean;
  modalWidth?: string; // Độ rộng của modal (mặc định là 1/2 màn hình)
  customTitle?: ReactNode;
}

export const RightSheetModal: React.FC<RightSheetModalProps> = ({
  visible,
  onClose,
  title,
  children,
  useScrollView = true,
  modalWidth = "w-1/2",
  customTitle,
}) => {
  const [panX] = useState(new Animated.Value(width)); // Khởi tạo vị trí ngoài màn hình

  useEffect(() => {
    if (visible) {
      // Hiển thị modal: Trượt từ phải sang trái
      Animated.timing(panX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const closeModal = () => {
    // Trượt modal sang phải ngoài màn hình và gọi onClose sau khi hoạt ảnh hoàn tất
    Animated.timing(panX, {
      toValue: width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return gestureState.dx > 5;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx > 0) {
        panX.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 100) {
        closeModal(); // Đóng modal khi kéo sang phải đủ xa
      } else {
        // Reset modal về vị trí ban đầu nếu kéo không đủ xa
        Animated.timing(panX, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <Modal transparent animationType="none" visible={visible} onRequestClose={closeModal}>
      <View className="flex-1 bg-black/20 dark:bg-black/60">
        {/* Nền xám bấm để đóng */}
        <TouchableWithoutFeedback onPress={closeModal}>
          <View className="flex-1" />
        </TouchableWithoutFeedback>

        {/* Nội dung modal */}
        <Animated.View
          className={`${modalWidth ? modalWidth : "w-2/3"} h-full bg-white dark:bg-zinc-900 px-4`}
          {...panResponder.panHandlers}
          style={{
            transform: [{ translateX: panX }],
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
          }}
        >
          {/* Nút đóng (X icon) */}
          <TouchableOpacity
            onPress={closeModal}
            className="absolute top-0 right-4 p-2 rounded-full"
          >
            <X size={24} color="#4b5563" />
          </TouchableOpacity>

          {customTitle ? (
            customTitle
          ) : (
            <>
              {title && (
                <View className="py-2">
                  <Text className="text-xl font-c-semibold">{title}</Text>
                </View>
              )}
            </>
          )}

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

export default RightSheetModal;
