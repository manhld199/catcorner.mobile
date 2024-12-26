import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { Eye, EyeOff } from "lucide-react-native"; // Import icon từ Lucide
import { cn } from "@/lib/utils";

const Input = forwardRef<
  ElementRef<typeof TextInput>,
  ComponentPropsWithoutRef<typeof TextInput> & { containerClassName?: string }
>(({ className, placeholderClassName, secureTextEntry, containerClassName, ...props }, ref) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const isSecure = secureTextEntry && !isPasswordVisible;

  return (
    <View className={`relative ${containerClassName}`}>
      <TextInput
        ref={ref}
        secureTextEntry={isSecure}
        className={cn(
          "placeholder:font-c-regular web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 !text-lg lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-1 web:focus-visible:ring-ring web:focus-visible:ring-offset-0",
          props.editable === false && "opacity-50 web:cursor-not-allowed",
          className
        )}
        placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
        {...props}
      />

      {secureTextEntry && (
        <TouchableOpacity onPress={togglePasswordVisibility} className="absolute right-3 top-2.5">
          {isPasswordVisible ? (
            <Eye color="gray" size={20} /> // Icon hiển thị mật khẩu
          ) : (
            <EyeOff color="gray" size={20} /> // Icon ẩn mật khẩu
          )}
        </TouchableOpacity>
      )}
    </View>
  );
});

Input.displayName = "Input";

export { Input };
