import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

const ErrorScreen = (error: string) => {
  return (
    <BlurView style={styles.container} tint="light" intensity={60}>
      <Text style={styles.errorText}>{error}</Text>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default ErrorScreen;
