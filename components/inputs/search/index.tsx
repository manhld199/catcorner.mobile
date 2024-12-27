// import libs
import { TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Mic, MicOff, Search } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";

// import components
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";

export default function InputSearch({
  transcript,
  setTranscript,
}: {
  transcript: string;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { colorScheme } = useColorScheme();
  const router = useRouter();

  const [searchColorState, setSearchColorState] = useState<string[]>(
    colorScheme == "light"
      ? ["rgb(234, 251, 228)", "rgb(153, 246, 228)"]
      : ["rgb(153, 246, 228)", "rgb(22, 101, 101)"]
  );
  const [micColorState, setMicColorState] = useState<string>(
    colorScheme == "light" ? "#4b5563" : "#fff"
  );
  const [recognizing, setRecognizing] = useState(false);

  useEffect(() => {
    if (colorScheme == "light") {
      setSearchColorState(["rgb(234, 251, 228)", "rgb(153, 246, 228)"]);
      setMicColorState("#4b5563");
    } else if (colorScheme == "dark") {
      setSearchColorState(["rgb(153, 246, 228)", "rgb(22, 101, 101)"]);
      setMicColorState("#fff");
    }
  }, [colorScheme]);

  // Đảm bảo sự kiện nhận dạng giọng nói được theo dõi
  useSpeechRecognitionEvent("start", () => setRecognizing(true));
  useSpeechRecognitionEvent("end", () => {
    setRecognizing(false);
    ExpoSpeechRecognitionModule.stop(); // Đảm bảo module thực sự dừng
  });
  useSpeechRecognitionEvent("result", (event) => {
    const finalTranscript = event.results[0]?.transcript;

    if (finalTranscript) {
      setTranscript(finalTranscript); // Lưu kết quả nhận diện giọng nói
      ExpoSpeechRecognitionModule.stop(); // Dừng ghi âm ngay lập tức
      setRecognizing(false); // Đặt trạng thái ghi âm về false
    }
  });

  // Chức năng bắt đầu ghi âm
  const handleStart = async () => {
    if (recognizing) return; // Ngăn việc ghi âm khi đã trong trạng thái nhận diện

    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }

    try {
      ExpoSpeechRecognitionModule.start({
        lang: "vi-VN",
        interimResults: true,
        maxAlternatives: 1,
        continuous: false,
      });
      setRecognizing(true); // Đặt trạng thái đang ghi âm
    } catch (error) {
      console.error("Speech Recognition Error:", error);
      setRecognizing(false); // Đặt lại trạng thái nếu xảy ra lỗi
    }
  };

  return (
    <LinearGradient className="w-full" colors={searchColorState as any}>
      <View className="w-full p-4 flex flex-row gap-2 items-center">
        <TouchableOpacity className="pr-2" onPress={() => router.back()}>
          <ArrowLeft color={colorScheme == "light" ? "#315475" : "rgb(234, 251, 228)"} size={24} />
        </TouchableOpacity>
        <View className="overflow-hidden flex-1 h-[44px] bg-white dark:bg-zinc-900 border-2 border-pri-7 dark:border-pri-2 rounded-lg flex flex-row gap-2">
          <Input
            containerClassName="flex-1"
            placeholder="Nhập từ khóa cần tìm..."
            className="!border-0 flex-1 dark:bg-zinc-900"
            value={transcript}
            onChangeText={(text) => setTranscript(text)} // Cập nhật input
          />
          <Button
            variant="none"
            className="p-1 w-[32px]"
            onPress={recognizing ? () => ExpoSpeechRecognitionModule.stop() : handleStart}
          >
            {recognizing ? (
              <MicOff color={micColorState} className="w-full h-full" />
            ) : (
              <Mic color={micColorState} className="w-full h-full" />
            )}
          </Button>
          <Button variant="none" className="w-[48px] h-full bg-pri-7 p-2 rounded-none">
            <Search color="#fff" className="w-full h-full" />
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
}
