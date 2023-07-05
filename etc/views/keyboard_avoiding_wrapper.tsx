import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";

import {
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const KeyboardAvoidingWrapper: React.FC<Props> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.contentContainer}
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
    justifyContent: 'center',
    paddingHorizontal: 16
  }
});
