import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { RectButton, RectButtonProperties } from "react-native-gesture-handler";
import { Text, useTheme } from "../_Theme";

interface ButtonProps {
  variant: "default" | "primary";
  label?: string;
  onPress: () => void;
  style?: RectButtonProperties["style"];
}

const { width, height } = Dimensions.get("window");

const ReButton = ({ variant, label, onPress, style }: ButtonProps) => {

  const { colors } = useTheme();
  const backgroundColor =
    variant === "primary" ? colors.primary : colors.buttonBackground;
  const color =
    variant === "primary" ? colors.body : colors.mainBackground;

  return (
    <RectButton
      style={[styles.container,{ backgroundColor }, style, ]}
      {...{ onPress }}
    >
      <Text variant="button" style={{ color, alignSelf: 'center' }}>
        {label}
      </Text>
    </RectButton>
  );
};

ReButton.defaultProps = { variant: "default" };

export { ReButton };

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
