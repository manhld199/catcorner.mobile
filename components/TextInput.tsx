import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { TextInput } from "react-native";
import { cn } from "@/lib/utils";

const Input1 = forwardRef<ElementRef<typeof TextInput>, ComponentPropsWithoutRef<typeof TextInput>>(
  ({ className, placeholderClassName, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          "placeholder:font-c-regular placeholder:!text-lg font-c-regular !text-lg",
          props.editable === false && "opacity-50 web:cursor-not-allowed",
          className
        )}
        placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
        {...props}
      />
    );
  }
);

Input1.displayName = "Input1";

export { Input1 };
