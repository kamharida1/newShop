import { Text, View } from "@bacons/react-views";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CartProduct, User } from "../../../src/models";
import { Auth, DataStore } from "aws-amplify";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  

  return (
    <View style={styles.fullScreenContainer}>
      <Text>Hello WOrld</Text>
     </View>
 
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
