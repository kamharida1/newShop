import { StyleSheet, } from "react-native";
import React, { memo } from "react";
import { Box } from "../_Theme";

interface SpaceT {
  height?: number;
  width?: number;
}

const Space = memo<SpaceT>(({ height, width }) => {
  return (
    <Box
      style={{
        height: height || 30,
        width: width || 20,
      }}
    />
  );
});

export { Space };
