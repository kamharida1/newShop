import { StyleSheet } from "@bacons/react-views";
import { memo } from "react";
import { ActivityIndicator } from "react-native";
import { Box } from "../_Theme";

const styles = StyleSheet.create({
  activityIndicator: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
  },
});

const Loading = memo(() => {
  const { activityIndicator } = styles;
  return (
    <Box style={activityIndicator}>
       <ActivityIndicator />
    </Box>
  );
});

export { Loading };
