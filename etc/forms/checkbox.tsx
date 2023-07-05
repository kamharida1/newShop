import { StyleSheet } from "react-native";
import React from "react";
import { Feather as Icon } from "@expo/vector-icons";

import { BorderlessButton } from "react-native-gesture-handler";
import { Box, Text } from "../_Theme";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  return (
    <BorderlessButton
      onPress={() => onChange()}
      style={{ justifyContent: "center" }}
    >
      <Box flexDirection="row">
        <Box
          height={20}
          width={20}
          borderWidth={1}
          marginRight="s"
          alignItems="center"
          justifyContent="center"
          borderRadius="s"
          borderColor="buttonPrimary"
          backgroundColor={checked ? "buttonPrimary" : "buttonBackground"}
        >
          <Icon name="check" color="white" />
        </Box>
        <Text variant="button">{label}</Text>
      </Box>
    </BorderlessButton>
  );
};

export default Checkbox;

const styles = StyleSheet.create({});
