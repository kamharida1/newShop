import React, { Children, ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

interface Props {
  children: React.ReactNode;
  style?: undefined | { [k: string]: string };
}

export const ErrorText = ({ children, style }: Props) => {
  return <Text style={[styles.error, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: "#cc0000",
    paddingStart: 10,
  },
});
