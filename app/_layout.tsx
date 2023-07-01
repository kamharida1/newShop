import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

export default function RootLayout() { 
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{
            title: "Welcome",
          }}
        />
      </Stack>
   </SafeAreaProvider>
  )
}
