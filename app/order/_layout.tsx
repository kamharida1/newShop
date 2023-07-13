import { Stack } from "expo-router";

const OrderLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerBlurEffect: "systemMaterialLight",
        headerLargeTitle: true,
        headerBackVisible: true,
        headerBackTitleVisible: true,
      }}
    />
  );
};
export default OrderLayout;
