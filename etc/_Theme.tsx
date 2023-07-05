import React, { ReactNode, useState } from "react";
import { Dimensions, ViewStyle, TextStyle, ImageStyle } from "react-native";

import {
  createBox,
  createText,
  createTheme,
  useTheme as useReTheme,
  ThemeProvider as ReStyleThemeProvider,
  createRestyleComponent,
  VariantProps,
  createVariant,
} from "@shopify/restyle";

const palette = {
  purpleLight: "#8C6FF7",
  purplePrimary: "#5A31F4",
  purpleDark: "#3F22AB",
  borderOnDark: "rgba(80,83,86, 1)",

  greenLight: "#56DCBA",
  greenPrimary: "#0ECD9D",
  greenDark: "#0A906E",

  black: "#0B0B0B",
  white: "#F0F2F3",
  white2: "#FFF",
  primary: "#FF0045",

  lightGray: "#2B1B17",
  darkPink: "#FF0058",
};

export const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,
    foregroundSubdued: palette.borderOnDark,
    cardPrimaryBackground: palette.purplePrimary,
    buttonPrimary: palette.purpleLight,
    primary: palette.primary,
    buttonBackground: palette.lightGray,
    buttonbackground2: palette.purplePrimary,
    danger: palette.darkPink,
    body: palette.black,
    subBody: "rgba(140, 145, 150, 1)",
    success: palette.greenPrimary
  },
  cardVariants: {
    defaults: {
      // We can define defaults for the variant here.
      // This will be applied after the defaults passed to createVariant and before the variant defined below.
    },
    regular: {
      // We can refer to other values in the theme here, and use responsive props
      padding: {
        phone: "s",
        tablet: "m",
      },
    },
    elevated: {
      padding: {
        phone: "s",
        tablet: "m",
      },
      margin: {
        phone: "s",
        tablet: "m",
      },
      borderWidth: 0.2,
      borderColor: "foregroundSubdued",
      borderRadius: "m",
      shadowColor: "mainBackground",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 15,
      elevation: 5,
      backgroundColor: "mainBackground",
    },
  },
  textVariants: {
    defaults: {
      // We can define defaults for the variant here.
      // This will be applied after the defaults passed to createVariant and before the variant defined below.
    },
    header: {
      //fontFamily: "ShopifySans-Bold",
      fontWeight: "bold",
      fontSize: 34,
      lineHeight: 42.5,
      color: "mainForeground",
    },
    button: {
      //fontWeight: "bold",
      fontSize: 16,
      lineHeight: 42.5,
      color: "mainBackground",
    },
    subheader: {
      //fontFamily: "ShopifySans-SemiBold",
      fontWeight: "600",
      fontSize: 28,
      lineHeight: 36,
      color: "foregroundSubdued",
    },
    body: {
      //fontFamily: "ShopifySans",
      fontSize: 16,
      lineHeight: 24,
      color: "body",
    },
    subBody: {
      //fontFamily: "ShopifySans",
      fontSize: 15,
      lineHeight: 24,
      color: "subBody",
    },
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
    xxl: 100,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 64,
  },
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <ReStyleThemeProvider {...{ theme }}>{children}</ReStyleThemeProvider>
);
export type Theme = typeof theme;
export const Box = createBox<Theme>();
export const Text = createText<Theme>();

export const Card = createRestyleComponent<
  VariantProps<Theme, "cardVariants"> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({ themeKey: "cardVariants" })], Box);

export const useTheme = () => useReTheme<Theme>();

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const makeStyles =
  <T extends NamedStyles<T>>(styles: (theme: Theme) => T) =>
  () => {
    const currentTheme = useTheme();
    return styles(currentTheme);
  };
