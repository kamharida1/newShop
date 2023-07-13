import { Stack } from "expo-router";

const CartLayout = () => {
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
export default CartLayout;
