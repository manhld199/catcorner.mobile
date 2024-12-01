const { hairlineWidth } = require("nativewind/theme");
/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // primary color
        "pri-1": "#1E4646",
        "pri-2": "#B3E0E6",
        "pri-3": "#EAFBE4",
        "pri-4": "#F9DCC5",
        "pri-5": "#FFF6D8",
        "pri-6": "#315475",
        "pri-7": "#669E9E",
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        "c-thin": "JosefinSans_100Thin",
        "c-thin-italic": "JosefinSans_100Thin_Italic",
        "c-extralight": "JosefinSans_200ExtraLight",
        "c-extralight-italic": "JosefinSans_200ExtraLight_Italic",
        "c-light": "JosefinSans_300Light",
        "c-light-italic": "JosefinSans_300Light_Italic",
        "c-regular": "JosefinSans_400Regular",
        "c-regular-italic": "JosefinSans_400Regular_Italic",
        "c-medium": "JosefinSans_500Medium",
        "c-medium-italic": "JosefinSans_500Medium_Italic",
        "c-semibold": "JosefinSans_600SemiBold",
        "c-semibold-italic": "JosefinSans_600SemiBold_Italic",
        "c-bold": "JosefinSans_700Bold",
        "c-bold-italic": "JosefinSans_700Bold_Italic",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
