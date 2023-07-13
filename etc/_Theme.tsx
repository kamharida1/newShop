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
  red: "rgb(255, 59, 48, 0.9)",
  orange: "rgb(255,149, 0)",
  yellow: "rgb(255,204,0)",
  green: "rgb(52,199,89)",
  mint: "rgb(0,199,190)",
  teal: "rgb(48,176,199)",
  cyan: "rgb(50,173,230)",
  blue: "rgb(0,122,255)",
  indigo: "rgb(88,86,214)",
  pink: "rgb(255,45,85)",
  purple: "rgb(175,82,222)",
  brown: "rgb(162,132,94)",
  gray: "rgb(142,142,147)",
  gray2: "rgb(174,174,178)",
  gray3: "rgb(199,199,204)",
  gray4: "rgb(209,209,214)",
  gray5: "rgb(229,229,234)",
  gray6: "rgb(242,242,247)",
  semiBlack: "rgb(100,100,100)",
  black: "rgb(0,0,0)",
  white: "rgb(255,255,255)"
};

export const theme = createTheme({
  colors: {
    mainBackground: palette.gray6,
    mainForeground: palette.black,
    cardPrimaryBackground: palette.white,
    buttonPrimary: palette.orange,
    primary: palette.red,
    buttonBackground: palette.gray2,
    buttonbackground2: palette.orange,
    danger: palette.pink,
    body: palette.black,
    subBody: palette.semiBlack,
    success: palette.green
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
      color: "subBody",
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
