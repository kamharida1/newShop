import { Platform, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";

import {
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

interface Props {
  children: JSX.Element | JSX.Element[];
  style?: ViewStyle
}

const KeyboardAvoidingWrapper: React.FC<Props> = ({ children, style}) => {
  return (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.contentContainer}
        scrollEventThrottle={16}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export { KeyboardAvoidingWrapper };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    //alignItems: 'center',
    paddingHorizontal: 16,
  }
});
