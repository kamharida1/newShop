import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text } from "react-native";

interface SophisticatedTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: any;
  inputStyle?: any;
  showPasswordToggle?: boolean;
}

const SoftTextInput: React.FC<SophisticatedTextInputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  showPasswordToggle,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error ? styles.inputContainerError : null,
        ]}
      >
        <TextInput
          {...rest}
          style={[styles.input, inputStyle]}
          secureTextEntry={rest.secureTextEntry && !isPasswordVisible}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {showPasswordToggle && rest.secureTextEntry && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={togglePasswordVisibility}
          >
            <Feather
              name={isPasswordVisible ? "eye" : "eye-off"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  inputContainerFocused: {
    borderColor: "blue",
  },
  inputContainerError: {
    borderColor: "red",
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  iconContainer: {
    padding: 5,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});

export default SoftTextInput;
