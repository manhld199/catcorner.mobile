import { forwardRef } from "react";
import RNPickerSelect from "react-native-picker-select";
import { cn } from "@/lib/utils";

// Define types for the Select component
interface SelectProps {
  items: { label: string; value: string }[];
  value: string | null;
  onValueChange: (value: string) => void;
  className?: string;
  placeholderClassName?: string;
  placeholder?: { label: string; value: string | null };
  disabled?: boolean;
}

const Select = forwardRef<RNPickerSelect, SelectProps>(
  (
    {
      items,
      value,
      onValueChange,
      className,
      placeholderClassName,
      placeholder = { label: "Chọn một mục", value: null },
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <RNPickerSelect
        ref={ref}
        placeholder={placeholder}
        items={items}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        style={{
          inputIOS: cn(
            "placeholder:font-c-regular web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-1 web:focus-visible:ring-ring web:focus-visible:ring-offset-0",
            disabled && "opacity-50 web:cursor-not-allowed",
            className
          ),
          inputAndroid: cn(
            "placeholder:font-c-regular web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-1 web:focus-visible:ring-ring web:focus-visible:ring-offset-0",
            disabled && "opacity-50 web:cursor-not-allowed",
            className
          ),
          placeholder: cn("text-muted-foreground", placeholderClassName),
        }}
        {...props}
      />
    );
  }
);

Select.displayName = "Select";

export default Select;
