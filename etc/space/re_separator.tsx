import { StyleProp, StyleSheet, View, Text, ViewStyle } from "react-native";
import React, { memo } from "react";

interface Props {
  viewStyle?: StyleProp<ViewStyle>;
}

const Separator = memo<Props>(({ viewStyle }) => {
  return <View style={[styles.separator, viewStyle]} />;
});

export { Separator };

const styles = StyleSheet.create({
  separator: {
    marginVertical: 10,
    height: StyleSheet.hairlineWidth,
    width: "100%",
  },
});
