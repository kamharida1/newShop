import { Stack } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc'
import { Screen } from "../../etc/views/screen";

export default function CheckOut() {
  return (
    <Screen style={tw`flex-1 bg-transparent`} scroll>
      <Stack.Screen
        options={{
          title: "Checkout",
        }}
      />
      <Text style={tw`text-3xl text-amber-900`}>Hello Checkout</Text>
    </Screen>
  );
}