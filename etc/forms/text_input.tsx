import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import React, { forwardRef } from "react";
import { useTheme, Box } from "../_Theme";
import { RoundIcon } from "../icons/round_icon";
import { Feather as Icon } from "@expo/vector-icons";

interface TextInputProps extends RNTextInputProps {
  icon?: string;
  error?: string;
  touched?: boolean;
  isPassword?: boolean;
  hidePassword?: boolean;
  setHidePassword?: () => void;
}

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      icon,
      error,
      touched,
      isPassword,
      setHidePassword,
      hidePassword,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const SIZE = theme.borderRadii.m * 2; // 10 x 2 = 20
    const color = !touched ? "body" : error ? "danger" : "success";
    const themeColor = theme.colors[color];

    return (
      <Box
        flexDirection="row"
        alignItems="center"
        height={48}
        borderWidth={StyleSheet.hairlineWidth}
        borderColor={color}
        padding="s"
        borderRadius="s"
      >
        <Box padding="s">
          <Icon name={icon} size={16} color={themeColor} />
        </Box>
        <Box flex={1}>
          <RNTextInput
            underlineColorAndroid="transparent"
            placeholderTextColor={themeColor}
            {...{ ref }}
            {...props}
          />
        </Box>
        {touched && (
          <RoundIcon
            name={!error ? "check" : "x"}
            size={SIZE}
            backgroundColor={!error ? "success" : "danger"}
            color="mainBackground"
          />
        )}
        {isPassword && (
          <RoundIcon
            name={!hidePassword ? "eye" : "eye-off"}
            size={SIZE}
            backgroundColor={!hidePassword ? "success" : "buttonPrimary"}
            color="mainBackground"
          />
        )}
      </Box>
    );
  }
);

export default TextInput;

